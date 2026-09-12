/**
 * Pricing — the "Choose your reading" section on the Draw view.
 *
 * A responsive four-tier ladder: Single Insight ($2.99) as the entry rung,
 * Extended Reading ($9.99) as the signature, the Reading Bundle ($19.99) as
 * the per-unit best value, and the Gift Reading ($5.00). Each tier's CTA opens
 * the Stripe checkout link in a new tab (honor-based: payment is never
 * verified, and no draw is gated on the link).
 *
 * SSR-safe: this section renders static, deterministic content only — no
 * random draws, no clock-dependent output — so server and client always
 * match.
 */
import {
  EXTENDED_READING_PRICE,
  GIFT_READING_PRICE,
  PAYMENT_LINKS,
  READING_BUNDLE_PRICE,
  SINGLE_INSIGHT_PRICE,
  formatPrice,
} from "~/lib/payments";

/** Per-unit math for the bundle — $6.66 per reading, 33% off three singles. */
const BUNDLE_PER_READING = READING_BUNDLE_PRICE / 3; // 6.66333…
const BUNDLE_SAVE_PCT = Math.round(
  (1 - BUNDLE_PER_READING / EXTENDED_READING_PRICE) * 100,
); // 33

const CHECK_ICON = "✦";

type Tier = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  /** Visual emphasis: "default" | "signature" | "bundle". */
  emphasis: "default" | "signature" | "bundle";
  badge?: string;
};

const TIERS: Tier[] = [
  {
    name: "Single Insight",
    price: SINGLE_INSIGHT_PRICE,
    tagline: "One question. One card. One line to carry.",
    features: [
      "Full single-card draw",
      "Meaning and associations",
      "A line to keep",
    ],
    cta: `Draw yours · $${formatPrice(SINGLE_INSIGHT_PRICE)}`,
    href: PAYMENT_LINKS.singleInsight,
    emphasis: "default",
  },
  {
    name: "Extended Reading",
    price: EXTENDED_READING_PRICE,
    tagline: "Five cards, five positions, one woven reading.",
    features: [
      "Five-position spread",
      "Per-position interpretation",
      "Extended synthesized reading",
    ],
    cta: `Unlock · $${formatPrice(EXTENDED_READING_PRICE)}`,
    href: PAYMENT_LINKS.extendedReading,
    emphasis: "signature",
    badge: "Signature",
  },
  {
    name: "Reading Bundle",
    price: READING_BUNDLE_PRICE,
    tagline:
      "Three Extended Readings — draw one today, keep two for when it matters.",
    features: [
      "Three full Extended Readings",
      "Draw one now, two more whenever you return",
      "That's $6.66 per reading, not $9.99",
    ],
    cta: `Get the bundle · $${formatPrice(READING_BUNDLE_PRICE)}`,
    href: PAYMENT_LINKS.readingBundle,
    emphasis: "bundle",
    badge: "Best value",
  },
  {
    name: "Gift Reading",
    price: GIFT_READING_PRICE,
    tagline: "A single card, sent with your name.",
    features: [
      "Full card read",
      "A line to carry",
      "Yours to send or keep",
    ],
    cta: `Gift a reading · $${formatPrice(GIFT_READING_PRICE)}`,
    href: PAYMENT_LINKS.giftReading,
    emphasis: "default",
  },
];

const CARD_CLS: Record<Tier["emphasis"], string> = {
  default:
    "border-gold-500/25 bg-night-900/70 shadow-[0_25px_70px_rgba(0,0,0,0.35)]",
  signature:
    "border-gold-500/50 bg-night-900/70 shadow-[0_0_32px_rgba(198,160,85,0.22),0_25px_70px_rgba(0,0,0,0.35)] ring-1 ring-gold-500/20",
  bundle:
    "border-gold-300/70 bg-gradient-to-b from-night-800/95 to-night-900/70 shadow-[0_0_55px_rgba(198,160,85,0.35),0_25px_70px_rgba(0,0,0,0.4)] ring-1 ring-gold-400/30",
};

const CTA_CLS: Record<Tier["emphasis"], string> = {
  default:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-500/50 px-6 py-3 text-xs font-medium tracking-[0.14em] text-gold-300 uppercase transition hover:border-gold-400/80 hover:bg-gold-500/10 hover:text-gold-200 active:scale-[0.98]",
  signature:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 px-7 py-3.5 text-xs font-medium tracking-[0.14em] text-night-950 uppercase shadow-[0_8px_28px_rgba(198,160,85,0.35)] transition hover:shadow-[0_10px_40px_rgba(198,160,85,0.55)] hover:brightness-105 active:scale-[0.98]",
  bundle:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 px-8 py-4 text-sm font-medium tracking-[0.14em] text-night-950 uppercase shadow-[0_10px_40px_rgba(198,160,85,0.5)] transition hover:shadow-[0_14px_55px_rgba(198,160,85,0.7)] hover:brightness-105 active:scale-[0.98]",
};

export function Pricing() {
  return (
    <section
      aria-label="Choose your reading"
      className="scroll-mt-24 pb-16 sm:scroll-mt-28 sm:pb-24"
    >
      {/* Section header */}
      <div className="animate-fade-up text-center">
        <p className="text-[10px] tracking-[0.45em] text-gold-400 uppercase sm:text-xs">
          ✦ Choose your reading ✦
        </p>
        <h2 className="mt-4 font-display text-4xl font-medium tracking-[0.08em] text-cream-50 sm:text-5xl">
          Go deeper when you&rsquo;re ready
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-100/55">
          The free three-card reading above is always here for you. When you
          want a sharper focus or a longer look, the same deck draws for you —
          at your pace, on your terms.
        </p>
      </div>

      {/* The four tiers — stacked on mobile, 2×2 on sm, four-up on lg */}
      <div className="animate-fade-up mt-10 grid grid-cols-1 items-stretch gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className={`relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition sm:p-7 ${CARD_CLS[tier.emphasis]}`}
          >
            {tier.badge && (
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-[9px] font-semibold tracking-[0.18em] uppercase ${
                  tier.emphasis === "bundle"
                    ? "bg-gradient-to-b from-gold-300 to-gold-500 text-night-950 shadow-[0_4px_18px_rgba(198,160,85,0.45)]"
                    : "border border-gold-500/40 bg-night-800 text-gold-200"
                }`}
              >
                {tier.badge}
              </span>
            )}

            <h3 className="font-display text-xl font-medium tracking-[0.06em] text-cream-50">
              {tier.name}
            </h3>
            <p className="mt-1.5 text-[11px] leading-relaxed text-gold-300/90 italic">
              {tier.tagline}
            </p>

            <p className="mt-4 font-display text-4xl font-medium tracking-[0.04em] text-gold-200">
              <span aria-hidden>$</span>
              {formatPrice(tier.price)}
            </p>
            {tier.emphasis === "bundle" && (
              <p className="mt-1.5 text-[10px] tracking-[0.2em] text-gold-400/90 uppercase">
                ${formatPrice(BUNDLE_PER_READING)} per reading · save{" "}
                {BUNDLE_SAVE_PCT}%
              </p>
            )}

            <ul className="mt-5 flex flex-col gap-2.5">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-xs leading-snug text-cream-100/70"
                >
                  <span aria-hidden className="mt-px text-gold-400">
                    {CHECK_ICON}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_CLS[tier.emphasis]}
              >
                <span aria-hidden>✦</span>
                <span>{tier.cta}</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="animate-fade-up mt-6 text-center text-xs leading-relaxed text-cream-100/45 italic">
        Secure checkout via Stripe · Draw your reading right after
      </p>
    </section>
  );
}