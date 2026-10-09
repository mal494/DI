/**
 * generate-deck.mjs - builds src/data/deck.generated.ts from the pinned
 * Divine Insight Core release.
 *
 * The dataset is fetched from the public Core repo at the tag in core.version,
 * so this repo keeps no copy of the card data. Needs network access.
 *
 * Card meanings, keywords, element and astrology come from Core. Presentation
 * details the dataset does not carry - the glyph shown on a card face and the
 * short numerology note - live in scripts/deck-presentation.json.
 *
 * Run:  node scripts/generate-deck.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const CORE_REPO = "mal494/divine-insight-core";
const DATASET = "tarot_data_v1.6.1.json";
const PRESENTATION = "scripts/deck-presentation.json";
const OUT = "src/data/deck.generated.ts";

// The Core release tag to build against. Bump core.version and DATASET
// together when taking a new dataset.
const tag = readFileSync("core.version", "utf8").trim();
const url = `https://raw.githubusercontent.com/${CORE_REPO}/${tag}/data/${DATASET}`;

const response = await fetch(url);
if (response.ok === false) {
  throw new Error(`could not fetch Core ${tag} from ${url} (HTTP ${response.status})`);
}
const core = await response.json();

const pres = JSON.parse(readFileSync(PRESENTATION, "utf8"));

const SUIT_ELEMENT = { Wands: "Fire", Cups: "Water", Swords: "Air", Pentacles: "Earth" };
const SUIT_SLUG = { Wands: "wands", Cups: "cups", Swords: "swords", Pentacles: "pentacles" };

const q = (s) => JSON.stringify(s);

function toCard(c) {
  const isMajor = c.arcana === "Major";
  const suitSlug = isMajor ? null : SUIT_SLUG[c.suit];

  const symbol = isMajor
    ? pres.majors[c.slug]?.symbol ?? "?"
    : pres.suitGlyphs[suitSlug];

  const note = isMajor
    ? pres.majors[c.slug]?.numerologyNote ?? ""
    : `${pres.numerologyByValue[String(c.number)]}, ${pres.suitNumerologyFlavor[suitSlug]}`;

  return {
    id: c.slug,
    name: c.name,
    arcana: isMajor ? "major" : "minor",
    suit: isMajor ? null : c.suit,
    symbol,
    meaning: c.meanings.upright.description,
    keywords: c.meanings.upright.keywords.slice(0, 3).map((k) => k.toLowerCase()),
    element: isMajor ? c.element : SUIT_ELEMENT[c.suit],
    astrology: c.astrology,
    numerology: { value: c.number, note },
  };
}

const cards = core.cards.map(toCard);
if (cards.length === 78) {
  // expected deck size
} else {
  throw new Error(`expected 78 cards, got ${cards.length}`);
}

const seen = new Set();
for (const c of cards) {
  if (seen.has(c.id)) throw new Error(`duplicate card id: ${c.id}`);
  seen.add(c.id);
  if (c.meaning === "" || c.keywords.length === 0) {
    throw new Error(`card ${c.id} is missing meaning or keywords`);
  }
  if (c.symbol === "" || c.numerology.note === "") {
    throw new Error(`card ${c.id} is missing presentation data`);
  }
}

const body = cards
  .map(
    (c) => `  {
    id: ${q(c.id)},
    name: ${q(c.name)},
    arcana: ${q(c.arcana)},
    suit: ${c.suit === null ? "null" : q(c.suit)},
    symbol: ${q(c.symbol)},
    meaning:
      ${q(c.meaning)},
    keywords: [${c.keywords.map(q).join(", ")}],
    element: ${q(c.element)},
    astrology: ${q(c.astrology)},
    numerology: { value: ${c.numerology.value}, note: ${q(c.numerology.note)} },
  },`
  )
  .join("\n");

const out = `/**
 * GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Built from Divine Insight Core ${core.deck_metadata.version} (schema ${core.deck_metadata.schema_version})
 * by scripts/generate-deck.mjs. Card copy changes land in Core first:
 * https://github.com/mal494/divine-insight-core
 *
 * Regenerate with:  node scripts/generate-deck.mjs
 */

export interface TarotCard {
  /** Stable, unique key (slug) - used to attach artwork. */
  id: string;
  /** The card's traditional name. */
  name: string;
  /** Which half of the deck the card belongs to. */
  arcana: "major" | "minor";
  /** Suit name for minors ("Wands", "Cups", "Swords", "Pentacles"); null for majors. */
  suit: string | null;
  /** A glyph rendered as the card face placeholder when no artwork exists. */
  symbol: string;
  /** Reflective interpretation, warm and specific. */
  meaning: string;
  /** Short association keywords. */
  keywords: string[];
  /** Element association. */
  element: string;
  /** Traditional astrological association. */
  astrology: string;
  /** Numerology: value plus a short essence note. */
  numerology: { value: number; note: string };
}

/** All 78 cards: the 22 Major Arcana followed by the 56 Minor Arcana. */
export const DECK: TarotCard[] = [
${body}
];

/** The 22 Major Arcana, in order. */
export const MAJOR_ARCANA: TarotCard[] = DECK.filter((card) => card.arcana === "major");

/** The 56 Minor Arcana, grouped by suit in Wands, Cups, Swords, Pentacles order. */
export const MINOR_ARCANA: TarotCard[] = DECK.filter((card) => card.arcana === "minor");
`;

writeFileSync(OUT, out);
console.log(`wrote ${OUT}: ${cards.length} cards from Core ${core.deck_metadata.version}`);
