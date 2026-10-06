/**
 * The complete 78-card Divine Insight deck.
 *
 * Import `DECK` from here whenever a reading (or any feature) needs the full
 * deck. The card data itself is generated from Divine Insight Core - see
 * `deck.generated.ts` and `scripts/generate-deck.mjs`. Do not hand-edit card
 * copy here or there; card changes land in Core first:
 * https://github.com/mal494/divine-insight-core
 */
export { DECK, type TarotCard } from "./deck.generated";

import { DECK } from "./deck.generated";

export function getCardById(id: string) {
  return DECK.find((card) => card.id === id);
}
