/**
 * GET /api/order/$orderId — what the browser is allowed to know about an order.
 *
 * This is the gate the UI polls after the visitor comes back from Stripe. It
 * answers from the database, so a guessed or edited id simply reads `pending`
 * (or 404s) and unlocks nothing. Deliberately returns no payment details, no
 * amounts, and no Stripe ids — the client only needs to know whether it may
 * draw and how many draws are left.
 *
 * Response: { "status": "pending" | "paid", "kind": "single" | "extended" | "gift", "credits": 2 }
 */
import { createFileRoute } from "@tanstack/react-router";
import { getOrder, listReadings } from "~/lib/orders";

export const Route = createFileRoute("/api/order/$orderId")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        let order;
        try {
          order = await getOrder(params.orderId);
        } catch (err) {
          console.error("order lookup failed", err);
          return json({ error: "unavailable" }, 503);
        }
        if (!order) return json({ error: "not_found" }, 404);

        const body: Record<string, unknown> = {
          status: order.status,
          kind: order.kind,
          credits: order.credits,
        };

        // ?include=readings returns the saved readings for this order — the
        // bundle's "come back to it later" promise, and the seed of the journal.
        const include = new URL(request.url).searchParams.get("include");
        if (include === "readings" && order.status === "paid") {
          body.readings = await listReadings(order.id);
        }

        return json(body);
      },
    },
  },
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
