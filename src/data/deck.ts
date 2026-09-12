/**
 * The complete 78-card Divine Insight deck.
 *
 * Import `DECK` from here whenever a reading (or any feature) needs the full
 * deck. `TarotCard` is the shared shape: majors and minors carry the same
 * fields (id, name, symbol, meaning, keywords, element, astrology, numerology).
 */
import { MAJOR_ARCANA, type MajorArcanaCard } from "./major-arcana";
import { MINOR_ARCANA, type MinorArcanaCard } from "./minor-arcana";

export type TarotCard = MajorArcanaCard | MinorArcanaCard;

/** All 78 cards: the 22 Major Arcana followed by the 56 Minor Arcana. */
export const DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function getCardById(id: string): TarotCard | undefined {
  return DECK.find((card) => card.id === id);
}