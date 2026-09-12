/**
 * payments.ts — the single source of truth for Divine Insight's paid readings.
 *
 * Fulfillment is honor-based and entirely client-side (no accounts/backend
 * yet): the unlock CTA opens the Stripe checkout link in a new tab, and the
 * visitor then draws/views the paid reading in-session. Nothing here verifies
 * payment, and no UI claims it does — the copy frames support, never a
 * verified purchase.
 *
 * To activate a real product, the lead pastes the Stripe checkout URL into
 * PAYMENT_LINKS. No component code changes.
 */
export const PAYMENT_LINKS = {
  /** Five-card Extended Reading — USD 9.99. */
  extendedReading: "https://buy.stripe.com/eVq14neX1ap8ac7bkBes000",
  /** Single-card Gift Reading — USD 5.00. */
  giftReading: "https://buy.stripe.com/eVqeVdcOTap80Bx60hes001",
} as const;

/** Display prices (USD) for the unlock CTAs. */
export const EXTENDED_READING_PRICE = 9.99;
export const GIFT_READING_PRICE = 5.0;

/** "9.99" / "5.00" — for on-page price display. */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}
