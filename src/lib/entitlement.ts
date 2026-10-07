/**
 * entitlement.ts — the client half of the paywall.
 *
 * Deliberately dumb: it holds an order id, asks the server what that order is
 * worth, and believes the answer. It never decides entitlement itself, so
 * editing anything in the browser (or in localStorage) buys nothing — the id
 * is just a lookup key, and an id for an unpaid order reads back `pending`.
 *
 * Flow:
 *   1. startCheckout() POSTs the SKU to /api/checkout, stores the returned
 *      order id, and opens Stripe in a new tab.
 *   2. While the visitor is paying, we poll /api/order/<id>. Stripe's webhook
 *      flips the order to paid, usually within a second or two of the receipt.
 *   3. Once `paid`, the draw unlocks. The id persists in localStorage, so a
 *      bundle's remaining credits survive a refresh and a closed tab.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { Sku } from "~/lib/payments";

const STORAGE_PREFIX = "di.order.";
const POLL_INTERVAL_MS = 3000;
/** Stop polling after 20 minutes of a tab left open on the Stripe step. */
const POLL_TIMEOUT_MS = 20 * 60 * 1000;

export type EntitlementState =
  | { status: "locked" }
  | { status: "awaiting-payment" }
  | { status: "unlocked"; credits: number }
  | { status: "spent" }
  | { status: "unavailable" };

export type Entitlement = EntitlementState & {
  /** Open Stripe for this SKU and begin watching for the payment. */
  startCheckout: (gift?: GiftDetails) => Promise<void>;
  /** Spend a credit and store the reading. Call once the cards are down. */
  recordReading: (reading: unknown) => Promise<void>;
  busy: boolean;
};

export type GiftDetails = {
  recipientEmail?: string;
  senderName?: string;
  note?: string;
};

export function useEntitlement(sku: Sku): Entitlement {
  const [state, setState] = useState<EntitlementState>({ status: "locked" });
  const [busy, setBusy] = useState(false);
  const orderId = useRef<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAt = useRef<number>(0);

  const stopPolling = useCallback(() => {
    if (pollTimer.current !== null) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  }, []);

  const applyOrder = useCallback(
    (order: { status: string; credits: number }) => {
      if (order.status !== "paid") {
        setState({ status: "awaiting-payment" });
        return false;
      }
      setState(
        order.credits > 0
          ? { status: "unlocked", credits: order.credits }
          : { status: "spent" },
      );
      return true;
    },
    [],
  );

  const refresh = useCallback(async () => {
    const id = orderId.current;
    if (!id) return false;
    try {
      const res = await fetch(`/api/order/${id}`, { cache: "no-store" });
      if (res.status === 404) {
        // The order no longer exists (database reset, stale id). Forget it
        // rather than polling a ghost forever.
        window.localStorage.removeItem(STORAGE_PREFIX + sku);
        orderId.current = null;
        setState({ status: "locked" });
        return true;
      }
      if (!res.ok) return false;
      return applyOrder((await res.json()) as { status: string; credits: number });
    } catch {
      return false;
    }
  }, [applyOrder, sku]);

  const beginPolling = useCallback(() => {
    stopPolling();
    pollStartedAt.current = Date.now();
    pollTimer.current = setInterval(() => {
      if (Date.now() - pollStartedAt.current > POLL_TIMEOUT_MS) {
        stopPolling();
        return;
      }
      void refresh().then((settled) => {
        if (settled) stopPolling();
      });
    }, POLL_INTERVAL_MS);
  }, [refresh, stopPolling]);

  // Pick up an order from a previous visit, and re-check whenever the tab
  // regains focus — that is exactly when someone comes back from paying.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_PREFIX + sku);
    if (stored) {
      orderId.current = stored;
      void refresh();
    }
    const onFocus = () => {
      if (orderId.current) void refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      stopPolling();
    };
  }, [refresh, sku, stopPolling]);

  const startCheckout = useCallback(
    async (gift?: GiftDetails) => {
      setBusy(true);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sku, ...gift }),
        });
        if (!res.ok) {
          setState({ status: "unavailable" });
          return;
        }
        const { orderId: id, url } = (await res.json()) as {
          orderId: string;
          url: string;
        };
        orderId.current = id;
        window.localStorage.setItem(STORAGE_PREFIX + sku, id);
        setState({ status: "awaiting-payment" });
        // Open before polling starts so the click stays inside the user
        // gesture and the popup blocker leaves it alone.
        window.open(url, "_blank", "noopener,noreferrer");
        beginPolling();
      } catch {
        setState({ status: "unavailable" });
      } finally {
        setBusy(false);
      }
    },
    [beginPolling, sku],
  );

  const recordReading = useCallback(
    async (reading: unknown) => {
      const id = orderId.current;
      if (!id) return;
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ orderId: id, reading }),
        });
        if (res.ok) {
          const { creditsLeft } = (await res.json()) as { creditsLeft: number };
          setState(
            creditsLeft > 0
              ? { status: "unlocked", credits: creditsLeft }
              : { status: "spent" },
          );
        } else if (res.status === 402) {
          await refresh();
        }
      } catch {
        // A failed save must never swallow a reading the visitor is looking
        // at. Leave the UI as it is; the next refresh reconciles the credit.
      }
    },
    [refresh],
  );

  return { ...state, startCheckout, recordReading, busy };
}
