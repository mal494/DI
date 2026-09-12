/**
 * payments.ts — the single source of truth for Divine Insight's paid readings.
 *
 * The paid lineup is a four-SKU ladder:
 *   - Single Insight ($2.99)      — one question, one card, a line to carry (entry rung)
 *   - Extended Reading ($9.99)    — the signature five-card reading
 *   - Reading Bundle ($19.99)     — three Extended Readings, $6.66 each (per-unit value)
 *   - Gift Reading ($5.00)        — a single card, read and sent with your name
 *
 * Fulfillment is honor-based and entirely client-side (no accounts/backend
 * yet): the unlock CTA opens the Stripe checkout link in a new tab, and the
 * visitor then draws/views the paid reading in-session. Nothing here verifies
 * payment, and no UI claims it does — the copy frames the value of the
 * reading, never a verified purchase.
 *
 * To activate a real product, the lead pastes the Stripe checkout URL into
 * PAYMENT_LINKS. No component code changes.
 */
export const PAYMENT_LINKS = {
  /** Single-card Single Insight — USD 2.99. */
  singleInsight: "https://buy.stripe.com/aFa5kD8yD0Oyfwr9ctes002",
  /** Five-card Extended Reading — USD 9.99. */
  extendedReading: "https://buy.stripe.com/eVq14neX1ap8ac7bkBes000",
  /** Three Extended Readings bundle — USD 19.99. */
  readingBundle: "https://buy.stripe.com/5kQ00j6qvap85VRagxes003",
  /** Single-card Gift Reading — USD 5.00. */
  giftReading: "https://buy.stripe.com/eVqeVdcOTap80Bx60hes001",
} as const;

/** Display prices (USD) for the unlock CTAs. */
export const SINGLE_INSIGHT_PRICE = 2.99;
export const EXTENDED_READING_PRICE = 9.99;
export const READING_BUNDLE_PRICE = 19.99;
export const GIFT_READING_PRICE = 5.0;

/** "9.99" / "5.00" — for on-page price display. */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}