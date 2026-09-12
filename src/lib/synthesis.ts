/**
 * synthesizeReading — pure, deterministic synthesis of a card reading.
 *
 * Given the drawn cards (3, 4 or 5 — spread order) it weaves one coherent
 * "Your reading" summary from five parts:
 *
 *   1. centralLine  — anchor-position line (the position carrying the most
 *                     weight colors everything else)
 *   2. arcanaLine   — Major vs Minor mix in the draw
 *   3. elementLine  — dominant element, scored as Σ(cardWeight × positionWeight)
 *   4. rootLine     — digital root of the summed numerology values, 0–9 lookup
 *   5. closing      — 1–2 sentences seeded by dominant element + root number
 *
 * Spreads (positions × weights):
 *   3 cards  Past 1.0 · Present 1.5 · Future 1.0            (the free reading)
 *   4 cards  Foundation 1.0 · Current path 1.2 · Hidden influence 1.5 · Outcome 1.2
 *   5 cards  Foundation 1.0 · Current path 1.2 · Hidden influence 1.5 ·
 *            Near future 1.2 · Outcome 0.8                  (the Extended Reading)
 *
 * Determinism: the function is pure — no Math.random / Date.now — so it is
 * safe to call during SSR. It returns null on malformed input (fewer than
 * three cards, or an unsupported count), which keeps the initial server render
 * (zero cards drawn) stable.
 *
 * Question hook: `question?` is the visitor's typed question. When present it
 * shapes wording only — the weights/arithmetic never change. It flows into:
 *   introLine  — a new optional opening that addresses the question
 *   centralLine — keeps the card-driven first two sentences; the final
 *                 sentence ties the anchor-card theme back to the question
 *   closing    — element seed + root seed stay verbatim; a question
 *                 sentence is appended
 * The five original slots are unchanged fields, and with no question the
 * three-card output is byte-identical to the pre-hook wording.
 */
import { MAJOR_ARCANA } from "../data/major-arcana";
import type { TarotCard } from "../data/deck";

export type ArcanaKind = "major" | "court" | "pip";
export type ElementName = "Fire" | "Water" | "Air" | "Earth";
export type PositionName =
  | "Past"
  | "Present"
  | "Future"
  | "Foundation"
  | "Current path"
  | "Hidden influence"
  | "Near future"
  | "Outcome";

export interface PositionedCard {
  card: TarotCard;
  position: PositionName;
  /** Spread weight of this position (see SPREAD_POSITIONS). */
  positionWeight: number;
  /** Major 2.0 · Court 1.5 · Pip 1.0. */
  cardWeight: number;
  arcana: ArcanaKind;
}

export interface ReadingSummary {
  /** The drawn cards with their weights, in spread order. */
  placed: PositionedCard[];
  /** Dominant element, or null on a tie / when no card carried an element. */
  dominantElement: ElementName | null;
  /**
   * Optional opening that addresses the visitor's typed question (best read
   * as the reading's intro). Absent when no question was given — the empty
   * input reading has no intro and matches the pre-question wording exactly.
   */
  introLine?: string;
  elementLine: string;
  arcanaLine: string;
  rootNumber: number;
  rootLine: string;
  centralLine: string;
  closing: string;
}

const MAJOR_IDS: ReadonlySet<string> = new Set(MAJOR_ARCANA.map((c) => c.id));

/** Past 1.0 · Present 1.5 · Future 1.0 — the three-card spread weights. */
export const POSITION_WEIGHT = {
  Past: 1.0,
  Present: 1.5,
  Future: 1.0,
} as const satisfies Partial<Record<PositionName, number>>;

/**
 * Position schemes by card count. The 3-card layout is fixed (and its output
 * must stay byte-identical to the original free reading); 4–5 cards use the
 * generalized five-position naming, with the middle "Hidden influence" slot
 * carrying the most weight.
 */
export const SPREAD_POSITIONS: Record<
  number,
  ReadonlyArray<{ position: PositionName; weight: number }>
> = {
  3: [
    { position: "Past", weight: 1.0 },
    { position: "Present", weight: 1.5 },
    { position: "Future", weight: 1.0 },
  ],
  4: [
    { position: "Foundation", weight: 1.0 },
    { position: "Current path", weight: 1.2 },
    { position: "Hidden influence", weight: 1.5 },
    { position: "Outcome", weight: 1.2 },
  ],
  5: [
    { position: "Foundation", weight: 1.0 },
    { position: "Current path", weight: 1.2 },
    { position: "Hidden influence", weight: 1.5 },
    { position: "Near future", weight: 1.2 },
    { position: "Outcome", weight: 0.8 },
  ],
};

const COUNT_WORDS: Record<number, string> = {
  3: "three",
  4: "four",
  5: "five",
};

/** Card weight by arcana kind: Major 2.0, Court 1.5, Pip 1.0. */
export function cardWeight(card: TarotCard): number {
  if (MAJOR_IDS.has(card.id)) return 2.0;
  if (/^(page|knight|queen|king)-of-/.test(card.id)) return 1.5;
  return 1.0;
}

export function arcanaKind(card: TarotCard): ArcanaKind {
  if (MAJOR_IDS.has(card.id)) return "major";
  if (/^(page|knight|queen|king)-of-/.test(card.id)) return "court";
  return "pip";
}

/** Digital root (1–9); 0 itself stays 0 — the Fool's own number. */
export function digitalRoot(n: number): number {
  if (n === 0) return 0;
  return ((n - 1) % 9) + 1;
}

const ELEMENT_LINES: Record<ElementName, string> = {
  Fire: "Fire is the dominant element in your draw — a current of passion, will, and creative momentum. The thread that wants your attention is energy: what excites you, what you are ready to defend, and what you long to set into motion.",
  Water:
    "Water is the dominant element in your draw — a current of feeling, intuition, and connection. The thread that wants your attention is emotional truth: what you sense beneath the surface and what your heart already knows.",
  Air: "Air is the dominant element in your draw — a current of thought, clarity, and honest words. The thread that wants your attention is the mind: the questions worth asking, the truths worth speaking, and the ideas ready to take shape.",
  Earth:
    "Earth is the dominant element in your draw — a current of patience, practice, and tangible care. The thread that wants your attention is the material: the steady work, the real resources, and the foundations you can actually build on.",
};

const BALANCED_ELEMENT_LINE =
  "No single element rises above the others in your draw — there is a spacious, balanced quality here. Feeling, thinking, will, and steadiness all have a place at the table, and each one is asking to be heard in turn.";

const ROOT_LINES: Record<number, string> = {
  0: "Zero is the Fool's own number — pure potential before the first step. This reading begins from an open, unmarked space, and the direction you choose is genuinely yours to make.",
  1: "One is the number of beginning. This reading asks what you are ready to start — simply, courageously, without needing every step mapped in advance.",
  2: "Two is the number of balance and partnership. This reading asks where you are learning to meet another — or another side of yourself — as an equal.",
  3: "Three is the number of expression. This reading asks what you are ready to create or say — the words, the craft, the offering that has been waiting for your voice.",
  4: "Four is the number of stability. This reading asks what you are called to steady or build — a foundation firm enough to hold what comes next.",
  5: "Five is the number of change. This reading asks what is shifting beneath you, and how you might move with the change rather than against it.",
  6: "Six is the number of harmony and healing. This reading asks what is ready to be mended, reconciled, or made whole again.",
  7: "Seven is the number of inner work. This reading asks what is worth your patient effort — the depth-work that will not be rushed and should not be skipped.",
  8: "Eight is the number of momentum and mastery. This reading asks where your steady practice is beginning to pay off — keep the rhythm, and the repetition is its own reward.",
  9: "Nine is the number of near-completion. This reading asks what is almost finished — the last honest stretch before a cycle closes and a new one begins.",
};

function arcanaLineFor(placed: PositionedCard[]): string {
  const count = placed.length;
  const majors = placed.filter((p) => p.arcana === "major").length;
  const countWord = COUNT_WORDS[count] ?? String(count);

  // — The three-card spread keeps its original wording verbatim.
  if (count === 3) {
    if (majors === 3) {
      return "All three cards are Major Arcana — a rare and weighty draw. The forces at work here are the great themes of life: identity, purpose, transformation, and homecoming. This is one of those quiet hinge-moments that deserve your full attention.";
    }
    if (majors === 0) {
      return "All three cards are Minor Arcana — this reading lives in the texture of everyday life: your choices, your feelings, your small and steady steps. The extraordinary is showing up in the ordinary, which is exactly where most of life actually happens.";
    }
    return `With ${majors} Major card${majors > 1 ? "s" : ""} among the Minor ones, a thread of the extraordinary runs through ordinary life. Something deeper is stirring beneath your daily surface — a larger story is quietly woven into your everyday steps.`;
  }

  // — Generalized wording for the 4/5-card spreads.
  if (majors === count) {
    return `All ${countWord} cards are Major Arcana — a rare and weighty draw. The forces at work here are the great themes of life — identity, purpose, transformation, and homecoming — alive across the whole table before you. This is one of those quiet hinge-moments that deserve your full attention.`;
  }
  if (majors === 0) {
    return `All ${countWord} cards are Minor Arcana — this reading lives in the texture of everyday life: your choices, your feelings, your small and steady steps. The extraordinary is showing up in the ordinary, woven through every position of this spread.`;
  }
  return `With ${majors} Major card${majors > 1 ? "s" : ""} among the Minor ones, a thread of the extraordinary runs through this reading. Something deeper is stirring beneath the daily surface — a larger story is quietly woven between the ${countWord} positions of this spread.`;
}

const CLOSING_ELEMENT_SEEDS: Record<ElementName, string> = {
  Fire: "Keep the spark lit — your energy is a compass, and it already knows the way. ",
  Water:
    "Keep your heart open — feeling your way is not weakness; it is how the truest current is found. ",
  Air: "Keep thinking clearly and speaking honestly — your clarity is a gift, to yourself first. ",
  Earth:
    "Keep tending the small, steady things — patience builds something real beneath your feet. ",
};

const BALANCED_CLOSING_SEED =
  "Keep the space you have made — gentle attention to all sides of yourself is its own quiet power. ";

const ROOT_CLOSING_SEEDS: Record<number, string> = {
  0: "A beginning is always open to you, from any point on the road.",
  1: "Begin where you are, with what you already hold.",
  2: "Meet what comes with open hands — balance is a practice, not a pose.",
  3: "Say the thing, make the thing; the act of creating teaches what the planning could not.",
  4: "Build with patience — foundations are laid one firm stone at a time.",
  5: "Let the current move you; the river knows bends you cannot see yet.",
  6: "Healing moves at its own pace — the gentleness you offer yourself now is the truest medicine.",
  7: "The work you are doing in the quiet is the work that matters most.",
  8: "Keep the rhythm going; momentum is simply practice you refused to drop.",
  9: "If something feels close to completion, honor it — the sense of nearing is itself the wisdom of this number.",
};

/**
 * Turn the visitor's typed question into a short quoted topic for the reading
 * copy ("In answer to your question — “topic” — …"). Deterministic; wording
 * only. Leading question/auxiliary fillers are dropped so a question like
 * "What should I do about my career?" reads as "about my career" rather than
 * being echoed verbatim. Long questions are capped at 8 words.
 */
const QUESTION_LEAD_DROP = new Set([
  "what",
  "why",
  "how",
  "when",
  "where",
  "who",
  "whom",
  "whose",
  "which",
  "will",
  "would",
  "can",
  "could",
  "should",
  "shall",
  "may",
  "might",
  "do",
  "does",
  "did",
  "am",
  "is",
  "are",
  "was",
  "were",
  "have",
  "has",
  "had",
  "be",
  "that",
  "if",
  "im",
  "i'm",
  "its",
  "it's",
  "i",
  "you",
  "my",
  "our",
  "we",
  "us",
  "me",
  "there",
  "this",
  "it",
  "the",
  "a",
  "an",
]);

const QUESTION_TOPIC_MAX_WORDS = 8;

export function questionTopic(question: string): string {
  const normalized = question
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[?!.]+$/, "");
  if (!normalized) return "";
  let words = normalized.split(" ");
  while (words.length > 1 && QUESTION_LEAD_DROP.has(words[0].toLowerCase())) {
    words = words.slice(1);
  }
  return words.slice(0, QUESTION_TOPIC_MAX_WORDS).join(" ");
}

/** Non-empty trimmed question, or undefined. */
export function normalizeQuestion(
  question: string | undefined,
): string | undefined {
  const trimmed = typeof question === "string" ? question.trim() : "";
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Weave the drawn cards into one reading.
 *
 * @param cards    The drawn cards in spread order (3, 4 or 5 cards).
 *                 For the three-card spread this is Past · Present · Future.
 * @param question The visitor's typed question, trimmed (or undefined).
 *                 Shapes wording only — weights, element scores and root
 *                 number are card-driven and never change.
 */
export function synthesizeReading(
  cards: TarotCard[],
  question?: string,
): ReadingSummary | null {
  if (cards.length < 3) return null;
  const spread = SPREAD_POSITIONS[cards.length];
  if (!spread) return null;

  const q = normalizeQuestion(question);
  const topic = q ? questionTopic(q) : "";
  const count = spread.length;
  const countWord = COUNT_WORDS[count] ?? String(count);

  const placed: PositionedCard[] = cards.slice(0, count).map((card, i) => ({
    card,
    position: spread[i].position,
    positionWeight: spread[i].weight,
    cardWeight: cardWeight(card),
    arcana: arcanaKind(card),
  }));

  // — Element dominance: Σ(cardWeight × positionWeight) per element.
  const scores: Record<ElementName, number> = {
    Fire: 0,
    Water: 0,
    Air: 0,
    Earth: 0,
  };
  for (const p of placed) {
    const el = p.card.element as ElementName | null | undefined;
    if (el && el in scores)
      scores[el as ElementName] += p.cardWeight * p.positionWeight;
  }
  const entries = Object.entries(scores) as [ElementName, number][];
  const max = Math.max(...entries.map(([, s]) => s));
  const leaders = max > 0 ? entries.filter(([, s]) => s === max) : [];
  const dominant = leaders.length === 1 ? leaders[0][0] : null;
  const elementLine = dominant
    ? ELEMENT_LINES[dominant]
    : BALANCED_ELEMENT_LINE;

  // — Arcana mix.
  const arcanaLine = arcanaLineFor(placed);

  // — Root number: digital root of the summed numerology values across ALL
  //   cards in the spread.
  const rootNumber = digitalRoot(
    placed.reduce((sum, p) => sum + p.card.numerology.value, 0),
  );
  const rootLine = ROOT_LINES[rootNumber];

  // — Central line: the anchor is the position carrying the most weight
  //   (Present in the three-card spread; Hidden influence in the extended
  //   spreads). The first two (card-driven) sentences stay verbatim; with a
  //   question, the final sentence ties the theme back to it.
  const anchor = placed.reduce((a, b) =>
    b.positionWeight > a.positionWeight ? b : a,
  );
  const present = placed[1];
  let centralLine: string;
  if (count === 3) {
    centralLine = q
      ? `At the heart of this reading is ${present.card.name}, holding the present. Because the present carries more weight than the past or the future in this spread, its theme — ${present.card.keywords.join(", ")} — quietly colors everything else. When you hold “${topic}” in mind, let that be the first thread you follow.`
      : `At the heart of this reading is ${present.card.name}, holding the present. Because the present carries more weight than the past or the future in this spread, its theme — ${present.card.keywords.join(", ")} — quietly colors everything else. Let that be the first thread you follow.`;
  } else {
    centralLine = q
      ? `At the heart of this reading is ${anchor.card.name}, in the position of ${anchor.position}. Because this position carries more weight than the others in this spread, its theme — ${anchor.card.keywords.join(", ")} — quietly colors everything else. When you hold “${topic}” in mind, let that be the first thread you follow.`
      : `At the heart of this reading is ${anchor.card.name}, in the position of ${anchor.position}. Because this position carries more weight than the others in this spread, its theme — ${anchor.card.keywords.join(", ")} — quietly colors everything else. Let that be the first thread you follow.`;
  }

  // — Closing: seeded by dominant element + root number; a question tie-back
  //   sentence is appended when a question was asked.
  const closing = `${dominant ? CLOSING_ELEMENT_SEEDS[dominant] : BALANCED_CLOSING_SEED}${ROOT_CLOSING_SEEDS[rootNumber]}${q ? ` And when you return to “${topic}”, carry these ${countWord} cards with you — a clearer sense of where you stand, not a verdict.` : ""}`;

  // — Intro: only when a question was asked; absent means the reading opens
  //   exactly as it did before the question hook.
  const introLine = q
    ? `In answer to your question — “${topic}” — these ${countWord} cards offer a mirror rather than a verdict: a chance to see where you are more clearly, and from there, what you might choose.`
    : undefined;

  return {
    placed,
    dominantElement: dominant,
    introLine,
    elementLine,
    arcanaLine,
    rootNumber,
    rootLine,
    centralLine,
    closing,
  };
}

/**
 * singleCardLine — a short, deterministic one-card reading for the Gift
 * Reading: the card's keyword essence plus its numerology, closed with an
 * honest reflective line. Deliberately separate from synthesizeReading (which
 * needs ≥3 cards). Pure, SSR-safe. The question is optional; when given, it
 * only shapes the wording.
 */
export function singleCardLine(card: TarotCard, question?: string): string {
  const q = normalizeQuestion(question);
  const topic = q ? questionTopic(q) : "";
  const essence = card.keywords.join(", ");
  if (q) {
    return `In answer to your question — “${topic}” — your card is ${card.name}: ${essence}. Rooted in the number ${card.numerology.value} — ${card.numerology.note} — it offers one clear note to reflect on: a mirror rather than a verdict.`;
  }
  return `${card.name} speaks in the key of ${essence}. Rooted in the number ${card.numerology.value} — ${card.numerology.note} — it asks you to carry a little of that energy gently with you: a mirror for reflection, never a verdict on what must come.`;
}
