/**
 * The 22 Major Arcana — Divine Insight's deck data.
 *
 * Meanings are written as reflective, personal guidance: they invite
 * contemplation, they never predict outcomes. Artwork is keyed to `id`
 * (see src/data/artwork.ts) without touching this shape.
 */
export interface MajorArcanaCard {
  /** Stable, unique key (slug) — used to attach artwork. */
  id: string;
  /** The card's traditional name. */
  name: string;
  /** A glyph rendered as the card face placeholder when no artwork exists. */
  symbol: string;
  /** 2–3 sentences of reflective interpretation, warm and specific. */
  meaning: string;
  /** 2–4 short association keywords. */
  keywords: string[];
  /** Traditional element association. */
  element: string;
  /** Traditional astrological association (planet, sign, or decan). */
  astrology: string;
  /** Numerology: traditional numeral (0–21) and a short essence note. */
  numerology: { value: number; note: string };
}

export const MAJOR_ARCANA: MajorArcanaCard[] = [
  {
    id: "the-fool",
    name: "The Fool",
    symbol: "🃏",
    meaning:
      "The Fool invites you to begin. This card honors the courage of a first step — the fresh start you have been quietly circling. You do not need every answer yet; the path reveals itself as you walk it.",
    keywords: ["beginning", "courage", "trust"],
    element: "Air",
    astrology: "Uranus",
    numerology: { value: 0, note: "beginnings & boundless potential" },
  },
  {
    id: "the-magician",
    name: "The Magician",
    symbol: "🪄",
    meaning:
      "The Magician reminds you that you already hold the tools you need. Your focus, skill, and intention are enough to shape what is in front of you. Ask yourself which single clear action you have been postponing.",
    keywords: ["focus", "will", "manifestation"],
    element: "Air",
    astrology: "Mercury",
    numerology: { value: 1, note: "manifestation & focused will" },
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    symbol: "🌙",
    meaning:
      "The High Priestess asks you to listen beneath the surface. There is wisdom in your intuition that logic has not caught up to yet. Make space for stillness, and let what you already know rise.",
    keywords: ["intuition", "mystery", "stillness"],
    element: "Water",
    astrology: "The Moon",
    numerology: { value: 2, note: "intuition & hidden wisdom" },
  },
  {
    id: "the-empress",
    name: "The Empress",
    symbol: "🌹",
    meaning:
      "The Empress speaks of growth, care, and creativity. Something you have been nurturing is ready to blossom — and so are you, when you tend to yourself with the same warmth you offer others.",
    keywords: ["nurture", "creativity", "abundance"],
    element: "Earth",
    astrology: "Venus",
    numerology: { value: 3, note: "creation & abundance" },
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    symbol: "👑",
    meaning:
      "The Emperor invites you to bring structure to your vision. Stability comes from choices made with intention, not from waiting for certainty. Build your foundation one firm decision at a time.",
    keywords: ["structure", "authority", "stability"],
    element: "Fire",
    astrology: "Aries",
    numerology: { value: 4, note: "structure & steady command" },
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    symbol: "📜",
    meaning:
      "The Hierophant signals a season of learning — from mentors, tradition, or the wisdom of those who came before. You do not have to figure everything out alone; guidance is there when you reach for it.",
    keywords: ["tradition", "guidance", "learning"],
    element: "Earth",
    astrology: "Taurus",
    numerology: { value: 5, note: "tradition & learned guidance" },
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    symbol: "💞",
    meaning:
      "The Lovers asks you to consider what you truly value — in relationships and in the choices before you. Alignment, not perfection, is the invitation here. Choose in the direction of your heart, honestly and gently.",
    keywords: ["alignment", "values", "connection"],
    element: "Air",
    astrology: "Gemini",
    numerology: { value: 6, note: "alignment & heartfelt choice" },
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    symbol: "🏇",
    meaning:
      "The Chariot is momentum gathering beneath you. You have been steering through difficulty, and this card honors your resolve. Commit to the direction you have chosen and keep going — the road steadies ahead.",
    keywords: ["momentum", "will", "direction"],
    element: "Water",
    astrology: "Cancer",
    numerology: { value: 7, note: "momentum & chosen direction" },
  },
  {
    id: "strength",
    name: "Strength",
    symbol: "🦁",
    meaning:
      "Strength is not force but quiet, steady resolve. This card speaks of your resilience — the courage to face what is difficult with an open heart. Patience with yourself is its own victory.",
    keywords: ["courage", "patience", "compassion"],
    element: "Fire",
    astrology: "Leo",
    numerology: { value: 8, note: "quiet resolve & courage" },
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    symbol: "🏮",
    meaning:
      "The Hermit invites you inward for a while. Solitude is not isolation when it is chosen; it is where clarity is found. Give yourself permission to step back and reflect before your next move.",
    keywords: ["solitude", "reflection", "inner light"],
    element: "Earth",
    astrology: "Virgo",
    numerology: { value: 9, note: "solitude & inner wisdom" },
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    symbol: "🎡",
    meaning:
      "The Wheel of Fortune reminds you that change is the only constant — and that cycles turn in your favor as well. What feels stuck is part of a larger rhythm. Stay open; the turn is coming.",
    keywords: ["cycles", "change", "timing"],
    element: "Fire",
    astrology: "Jupiter",
    numerology: { value: 10, note: "cycles & turning fortune" },
  },
  {
    id: "justice",
    name: "Justice",
    symbol: "⚖️",
    meaning:
      "Justice asks you to look at your situation with fairness and honesty. Cause and effect are at work, and truth will serve your next steps better than wishful thinking. Weigh your options and act with integrity.",
    keywords: ["truth", "fairness", "consequence"],
    element: "Air",
    astrology: "Libra",
    numerology: { value: 11, note: "truth & fair balance" },
  },
  {
    id: "the-hanged-man",
    name: "The Hanged Man",
    symbol: "⏳",
    meaning:
      "The Hanged Man invites a shift in perspective, not a surrender. Sometimes the most productive thing is to pause and see the situation from a new angle. What looks like waiting may hold the insight you need.",
    keywords: ["perspective", "pause", "surrender"],
    element: "Water",
    astrology: "Neptune",
    numerology: { value: 12, note: "surrender & new sight" },
  },
  {
    id: "death",
    name: "Death",
    symbol: "🦋",
    meaning:
      "Death rarely marks an ending to fear — it marks transformation. Something in your life is completing its season so that something truer can grow. Release it with gratitude, and make room for what is next.",
    keywords: ["transformation", "release", "renewal"],
    element: "Water",
    astrology: "Scorpio",
    numerology: { value: 13, note: "transformation & release" },
  },
  {
    id: "temperance",
    name: "Temperance",
    symbol: "⚗️",
    meaning:
      "Temperance is the art of balance and gentle blending. You are being asked to find the middle path — between effort and rest, giving and receiving. Patience and moderation will carry you further than force right now.",
    keywords: ["balance", "patience", "blending"],
    element: "Fire",
    astrology: "Sagittarius",
    numerology: { value: 14, note: "balance & gentle blending" },
  },
  {
    id: "the-devil",
    name: "The Devil",
    symbol: "⛓️",
    meaning:
      "The Devil names the habits, fears, or attachments that hold us — often ones chosen long ago. Naming them is the first act of freedom. Consider what you might loosen your grip on, if you believed you could.",
    keywords: ["attachment", "shadow", "freedom"],
    element: "Earth",
    astrology: "Capricorn",
    numerology: { value: 15, note: "attachment & liberation" },
  },
  {
    id: "the-tower",
    name: "The Tower",
    symbol: "⚡",
    meaning:
      "The Tower can feel sudden, but it clears what was built on shaky ground. What is breaking down may be making way for something far more honest. Trust that you can rebuild, this time on a truer foundation.",
    keywords: ["upheaval", "truth", "rebuilding"],
    element: "Fire",
    astrology: "Mars",
    numerology: { value: 16, note: "sudden release" },
  },
  {
    id: "the-star",
    name: "The Star",
    symbol: "🌟",
    meaning:
      "The Star is hope after the storm — quiet, steady, and available. This card invites you to trust in renewal and to follow the small glimmers of what you long for. You are guided by your own deepest wishes.",
    keywords: ["hope", "renewal", "guidance"],
    element: "Air",
    astrology: "Aquarius",
    numerology: { value: 17, note: "hope & quiet renewal" },
  },
  {
    id: "the-moon",
    name: "The Moon",
    symbol: "🌕",
    meaning:
      "The Moon asks you to sit with the uncertain and the half-lit. Not everything is meant to be clear yet; your imagination is working things out beneath the surface. Be gentle with what you cannot yet see.",
    keywords: ["uncertainty", "dreams", "intuition"],
    element: "Water",
    astrology: "Pisces",
    numerology: { value: 18, note: "dreams & hidden depths" },
  },
  {
    id: "the-sun",
    name: "The Sun",
    symbol: "☀️",
    meaning:
      "The Sun is warmth, vitality, and honest joy. This card speaks of a lightening — a season of feeling more yourself, more seen, more alive. Let yourself receive good things without overthinking them.",
    keywords: ["vitality", "joy", "clarity"],
    element: "Fire",
    astrology: "The Sun",
    numerology: { value: 19, note: "vitality & radiant joy" },
  },
  {
    id: "judgement",
    name: "Judgement",
    symbol: "🎺",
    meaning:
      "Judgement calls you to rise to a deeper understanding of yourself. Something you have learned is asking to be lived — a forgiveness, a new beginning, an honest yes. Answer the call in your own time; it will wait.",
    keywords: ["awakening", "calling", "forgiveness"],
    element: "Fire",
    astrology: "Pluto",
    numerology: { value: 20, note: "awakening & higher calling" },
  },
  {
    id: "the-world",
    name: "The World",
    symbol: "🌍",
    meaning:
      "The World speaks of completion and wholeness — a cycle rounding into fulfillment. You have grown more than you realize, and the finish feels close. Celebrate how far you have come; a new chapter begins where this one closes.",
    keywords: ["completion", "wholeness", "integration"],
    element: "Earth",
    astrology: "Saturn",
    numerology: { value: 21, note: "completion & wholeness" },
  },
];