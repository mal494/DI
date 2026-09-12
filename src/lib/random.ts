/**
 * random.ts — small shared random helpers.
 *
 * `shuffle` runs at draw time (event handler), never during render, so the
 * server render stays deterministic.
 */

/** Fisher–Yates shuffle — returns a new array, leaves the input untouched. */
export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
