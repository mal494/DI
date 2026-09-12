/**
 * Card artwork registry.
 *
 * Shipped artwork lives in /public/cards/<id>.webp. Cards that are not in
 * ART_IDS fall back to their glyph placeholder face — so a card face never
 * renders a broken image. All 78 cards are shipped; artUrlFor is the single
 * source of truth for which card has real artwork.
 */
import { MAJOR_ARCANA } from "./major-arcana";
import { MINOR_ARCANA } from "./minor-arcana";

export const ART_IDS: ReadonlySet<string> = new Set([
  ...MAJOR_ARCANA.map((card) => card.id),
  ...MINOR_ARCANA.map((card) => card.id),
]);

/** Returns the public URL of a card's artwork, or null if none is shipped. */
export function artUrlFor(cardId: string): string | null {
  return ART_IDS.has(cardId) ? `/cards/${cardId}.webp` : null;
}