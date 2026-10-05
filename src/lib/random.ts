/**
 * random.ts — small shared random helpers.
 *
 * `shuffle` runs at draw time (event handler), never during render, so the
 * server render stays deterministic.
 *
 * Ported from the Divine Insight Unity DeckManager (cryptographic
 * Fisher–Yates): uses crypto.getRandomValues with rejection sampling so
 * every ordering of the deck is equally likely. Falls back to Math.random
 * only where Web Crypto is unavailable.
 */

/** Unbiased random integer in [0, max). */
function randomInt(max: number): number {
  const c = globalThis.crypto;
  if (!c?.getRandomValues) return Math.floor(Math.random() * max);
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    c.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

/** Fisher–Yates shuffle — returns a new array, leaves the input untouched. */
export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
