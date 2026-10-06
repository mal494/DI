/**
 * Card artwork registry.
 *
 * Shipped artwork lives in /public/cards/<id>.webp. Cards that are not in
 * ART_IDS fall back to their glyph placeholder face — so a card face never
 * renders a broken image. All 78 cards are shipped; artUrlFor is the single
 * source of truth for which card has real artwork.
 *
 * Card ids come from the generated deck, which is built from Divine Insight
 * Core, so an id here always matches the id a reading renders.
 */
import { DECK } from "./deck";

export const ART_IDS: ReadonlySet<string> = new Set(DECK.map((card) => card.id));

/** Returns the public URL of a card's artwork, or null if none is shipped. */
export function artUrlFor(cardId: string): string | null {
  return ART_IDS.has(cardId) ? `/cards/${cardId}.webp` : null;
}
