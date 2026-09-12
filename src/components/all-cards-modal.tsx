/**
 * AllCardsModal — the deck gallery.
 *
 * A modal that opens on top of the page and shows all 78 cards as a scrolling
 * grid (artwork via artUrlFor, glyph fallback if an image ever fails). Tapping
 * a tile opens a detail view inside the modal: larger art, name, meaning, and
 * the full metadata row (keywords · element · astrology · numerology chip).
 *
 * SSR-safe: the modal only mounts while `open`, which is always false during
 * SSR, so there is nothing non-deterministic on the server.
 *
 * Close paths: Esc, the × button, overlay click, and the "Draw" tab. Focus
 * moves to the close button on open and returns to the previously focused
 * element on close. Body scroll is locked while open.
 */
import { useEffect, useRef, useState } from "react";
import { artUrlFor } from "~/data/artwork";
import { DECK, type TarotCard } from "~/data/deck";

/** Glyph tint per suit element — same brand palette as the draw view. */
const GLYPH_COLOR: Record<string, string> = {
  Fire: "#a37f3e", // gold-600
  Water: "#3a2d72", // night-600
  Air: "#2b2157", // night-700
  Earth: "#c6a055", // gold-500
};

function CardThumb({ card }: { card: TarotCard }) {
  const [broken, setBroken] = useState(false);
  const url = artUrlFor(card.id);

  useEffect(() => {
    setBroken(false);
  }, [card.id]);

  return (
    <span className="relative block aspect-[3/5] w-full overflow-hidden rounded-lg border border-gold-500/25 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 shadow-[0_10px_26px_rgba(4,2,12,0.45)] transition duration-300 group-hover:border-gold-400/70 group-hover:shadow-[0_14px_34px_rgba(198,160,85,0.28)]">
      <span className="flex h-full w-full items-center justify-center">
        <span
          className="text-3xl leading-none sm:text-4xl"
          style={
            card.element
              ? { color: GLYPH_COLOR[card.element] ?? "#a37f3e" }
              : undefined
          }
        >
          {card.symbol}
        </span>
      </span>
      {url && !broken && (
        <img
          src={url}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      )}
    </span>
  );
}

const META_ROW_CLS =
  "mt-2 text-[10px] leading-relaxed tracking-[0.12em] text-gold-400/90 uppercase";

export function AllCardsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<TarotCard | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Wire up Esc + body scroll lock + focus management only while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Reset the detail view whenever the modal is (re)opened.
  useEffect(() => {
    if (open) setSelected(null);
  }, [open]);

  if (!open) return null;

  const detail = selected;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={detail ? detail.name : "All 78 cards"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-[88dvh] max-h-[54rem] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gold-500/25 bg-night-900/95 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            {detail && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-gold-500/40 px-3 py-1.5 text-[10px] tracking-[0.14em] text-gold-300 uppercase transition hover:border-gold-400/70 hover:bg-gold-500/10 hover:text-gold-200"
              >
                <span aria-hidden>←</span> All cards
              </button>
            )}
            <h2 className="truncate font-display text-xl font-medium tracking-[0.1em] text-cream-50 sm:text-2xl">
              {detail ? detail.name : "All 78 cards"}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 text-lg text-cream-100/70 transition hover:border-gold-400/60 hover:bg-gold-500/10 hover:text-gold-200"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {detail ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="w-full max-w-[11rem] shrink-0 sm:max-w-[13rem]">
                <CardThumb card={detail} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl text-gold-300 sm:text-3xl">
                  {detail.name}
                </p>
                <p className={META_ROW_CLS}>
                  {detail.keywords.join(" · ")} · {detail.element} ·{" "}
                  {detail.astrology}
                </p>
                <p className="mt-2">
                  <span className="inline-flex w-auto items-baseline gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-[10px] leading-snug tracking-[0.14em] text-gold-200 uppercase">
                    <span aria-hidden className="text-gold-400">
                      ✦
                    </span>
                    <span>
                      <span className="font-semibold text-gold-100">
                        {detail.numerology.value}
                      </span>
                      {" · "}
                      {detail.numerology.note}
                    </span>
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream-100/80 sm:mt-5 sm:text-[15px]">
                  {detail.meaning}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-center text-xs text-cream-100/45 italic sm:mb-5 sm:text-sm">
                The full deck — twenty-two great arcana and four suits of
                everyday life. Tap any card to read its meaning.
              </p>
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5 lg:gap-5">
                {DECK.map((card) => (
                  <li key={card.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(card)}
                      className="group flex w-full cursor-pointer flex-col items-center text-center"
                    >
                      <CardThumb card={card} />
                      <span className="mt-2 line-clamp-2 font-display text-[10px] leading-snug tracking-[0.12em] text-cream-100/85 uppercase transition group-hover:text-gold-200 sm:text-xs">
                        {card.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}