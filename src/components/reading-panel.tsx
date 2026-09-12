/**
 * ReadingPanel — the synthesized "Your reading" panel.
 *
 * Renders a ReadingSummary (from synthesizeReading) as the five labelled
 * sections: The heart of it · Arcana · Elements · Root number · To carry with
 * you, plus the optional question intro. Used by both the free three-card
 * reading and the Extended Reading.
 */
import type { ReadingSummary } from "~/lib/synthesis";

export function ReadingPanel({
  summary,
  kicker = "Woven from your cards",
  title = "Your reading",
}: {
  summary: ReadingSummary;
  kicker?: string;
  title?: string;
}) {
  return (
    <div className="animate-fade-up mx-auto mt-12 max-w-2xl sm:mt-16">
      <div className="rounded-2xl border border-gold-500/25 bg-night-900/70 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
        <p className="text-center text-[10px] tracking-[0.45em] text-gold-400 uppercase">
          {kicker}
        </p>
        <h3 className="mt-3 text-center font-display text-3xl font-medium tracking-[0.08em] text-cream-50 sm:text-4xl">
          {title}
        </h3>
        {summary.introLine && (
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-cream-100/85 italic sm:mt-6 sm:text-[15px]">
            {summary.introLine}
          </p>
        )}
        <div className="mt-8 divide-y divide-white/[0.07] sm:mt-10">
          {(
            [
              { caption: "The heart of it", text: summary.centralLine },
              { caption: "Arcana", text: summary.arcanaLine },
              { caption: "Elements", text: summary.elementLine },
              {
                caption: `Root number · ${summary.rootNumber}`,
                text: summary.rootLine,
              },
              {
                caption: "To carry with you",
                text: summary.closing,
              },
            ] as const
          ).map((part) => (
            <div
              key={part.caption}
              className="py-4 first:pt-0 last:pb-0 sm:py-5"
            >
              <p className="text-[10px] tracking-[0.3em] text-gold-400/90 uppercase">
                {part.caption}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/85 sm:text-[15px]">
                {part.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
