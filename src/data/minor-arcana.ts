/**
 * The 56 Minor Arcana — Divine Insight's deck data.
 *
 * Four suits × 14 cards (Ace–10 + Page, Knight, Queen, King). Meaning copy is
 * written as reflective, personal guidance — it invites contemplation and
 * never predicts outcomes. Pips carry a subtle numerology thread; astrology
 * uses the traditional Golden Dawn decan assignments, with elemental
 * attributions for the court cards and the element itself for the aces.
 */

export interface MinorArcanaCard {
  /** Stable, unique key (slug) — e.g. "two-of-cups". */
  id: string;
  /** Traditional name, e.g. "Two of Cups". */
  name: string;
  /** A glyph rendered as the card face placeholder until artwork lands. */
  symbol: string;
  /** 2–3 sentences of reflective interpretation, warm and specific. */
  meaning: string;
  /** 2–4 short association keywords. */
  keywords: string[];
  /** Suit element: Fire (wands), Water (cups), Air (swords), Earth (pentacles). */
  element: string;
  /** Traditional astrological association (decan, sign, or elemental court). */
  astrology: string;
  /** Numerology: rank value (Ace 1 → King 14) plus a suit-tuned essence note. */
  numerology: { value: number; note: string };
}

interface RankSpec {
  slug: string;
  name: string;
  meaning: string;
  keywords: string[];
  astrology: string;
}

interface SuitSpec {
  slug: string;
  name: string;
  element: string;
  glyph: string;
  aceAstrology: string;
  courtAstrology: (rank: string) => string;
  ranks: RankSpec[];
}

const SUITS: SuitSpec[] = [
  {
    slug: "wands",
    name: "Wands",
    element: "Fire",
    glyph: "♣",
    aceAstrology: "Root of the Powers of Fire",
    courtAstrology: (rank) => {
      const map: Record<string, string> = {
        Page: "Earth of Fire",
        Knight: "Fire of Fire",
        Queen: "Water of Fire",
        King: "Air of Fire",
      };
      return map[rank];
    },
    ranks: [
      {
        slug: "ace",
        name: "Ace",
        meaning:
          "A spark of creative energy has landed in your hands. This is the urge to begin, to build, to make something that did not exist a moment ago. Follow the excitement — it is telling you where your energy wants to flow.",
        keywords: ["inspiration", "spark", "beginnings"],
        astrology: "Root of the Powers of Fire",
      },
      {
        slug: "two",
        name: "Two",
        meaning:
          "A vision is taking shape and the world is opening before you. This card is about choosing your direction deliberately — looking beyond the horizon you have already mastered. What are you preparing to leave behind for the sake of what could be?",
        keywords: ["vision", "choice", "horizon"],
        astrology: "Mars in Aries",
      },
      {
        slug: "three",
        name: "Three",
        meaning:
          "Your early efforts are beginning to find their reach. What you started has momentum now, and this card encourages you to look far ahead with confidence rather than checking every detail. Let the work breathe, and keep your gaze on the horizon you chose.",
        keywords: ["expansion", "momentum", "foresight"],
        astrology: "The Sun in Aries",
      },
      {
        slug: "four",
        name: "Four",
        meaning:
          "A milestone worth celebrating has arrived or is close. This card honors the joy of completion — a homecoming, a shared success, a moment of belonging. Let yourself mark it; celebration is how we give the journey meaning.",
        keywords: ["celebration", "milestone", "belonging"],
        astrology: "Venus in Aries",
      },
      {
        slug: "five",
        name: "Five",
        meaning:
          "Energy is stirring — a friendly kind of friction as ideas, voices, and ambitions collide. This is not necessarily conflict to avoid; it is the heat of many wills finding their shape. Stay playful, stay clear, and let the sparks sharpen rather than scatter you.",
        keywords: ["friction", "ambition", "play"],
        astrology: "Saturn in Leo",
      },
      {
        slug: "six",
        name: "Six",
        meaning:
          "Recognition arrives for work you have already done. This card is a quiet victory lap — a moment to receive acknowledgment without shrinking. Let it land; you have earned the view from here.",
        keywords: ["recognition", "victory", "receiving"],
        astrology: "Jupiter in Leo",
      },
      {
        slug: "seven",
        name: "Seven",
        meaning:
          "You are being asked to hold your ground for something you believe in. A position you have built is worth defending, and this card honors the courage of standing firm without aggression. Name what you will not compromise, and stand lightly in it.",
        keywords: ["conviction", "defense", "boundaries"],
        astrology: "Mars in Leo",
      },
      {
        slug: "eight",
        name: "Eight",
        meaning:
          "Movement is quickening — messages, plans, and circumstances are accelerating toward resolution. This is a season of momentum rather than hesitation. Keep your aim clear, and let things travel fast without grasping at every spark.",
        keywords: ["speed", "movement", "momentum"],
        astrology: "Mercury in Sagittarius",
      },
      {
        slug: "nine",
        name: "Nine",
        meaning:
          "You have weathered more than most can see, and you are nearer the last watch than the first. This card honors resilience worn deep — the wisdom to keep guarding what matters without becoming hard. One more stretch, then rest by your own fire.",
        keywords: ["resilience", "perseverance", "vigilance"],
        astrology: "The Moon in Sagittarius",
      },
      {
        slug: "ten",
        name: "Ten",
        meaning:
          "You have been carrying a great deal — much of it valuable, some of it no longer yours to bear. This card invites you to look honestly at the load and set down what is simply habit now. Strength is also knowing when to lighten the pack.",
        keywords: ["burden", "responsibility", "release"],
        astrology: "Saturn in Sagittarius",
      },
      {
        slug: "page",
        name: "Page",
        meaning:
          "A bright, curious energy is knocking — part enthusiasm, part learning. This card is the messenger of beginnings: a new interest that asks you to play before you perfect. Say yes to the spark, even if you do not know where it leads.",
        keywords: ["curiosity", "enthusiasm", "learning"],
        astrology: "Earth of Fire",
      },
      {
        slug: "knight",
        name: "Knight",
        meaning:
          "Passion is on the move, restless and magnetic. This card carries the heat of adventure — the urge to act boldly and travel far. Channel the fire into a direction you can actually love, rather than chasing every spark.",
        keywords: ["adventure", "passion", "impulse"],
        astrology: "Fire of Fire",
      },
      {
        slug: "queen",
        name: "Queen",
        meaning:
          "Warmth, confidence, and magnetism that others can feel. This card is the grace of the sunlit self — someone (perhaps you) who draws others in by being fully alive. Lead with your warmth; it is a strength, not a softness.",
        keywords: ["confidence", "warmth", "charisma"],
        astrology: "Water of Fire",
      },
      {
        slug: "king",
        name: "King",
        meaning:
          "Vision tempered by will — this is leadership that creates room for others to burn bright too. This card asks you to lead from clarity and generosity rather than domination. What you inspire in others will outlast anything you command.",
        keywords: ["leadership", "vision", "generosity"],
        astrology: "Air of Fire",
      },
    ],
  },
  {
    slug: "cups",
    name: "Cups",
    element: "Water",
    glyph: "♥",
    aceAstrology: "Root of the Powers of Water",
    courtAstrology: (rank) => {
      const map: Record<string, string> = {
        Page: "Earth of Water",
        Knight: "Fire of Water",
        Queen: "Water of Water",
        King: "Air of Water",
      };
      return map[rank];
    },
    ranks: [
      {
        slug: "ace",
        name: "Ace",
        meaning:
          "An opening of the heart — a wave of feeling rising to meet you. This card is the invitation to receive: love, joy, or an emotional fresh start that asks nothing of you but presence. Let the water rise; you do not have to hold it all in your hands.",
        keywords: ["love", "feeling", "new beginnings"],
        astrology: "Root of the Powers of Water",
      },
      {
        slug: "two",
        name: "Two",
        meaning:
          "A meeting of hearts — a connection arriving or deepening into honest exchange. This card speaks of partnership in its truest sense: seeing one another clearly and choosing each other anyway. What would it look like to be fully met?",
        keywords: ["partnership", "connection", "exchange"],
        astrology: "Venus in Cancer",
      },
      {
        slug: "three",
        name: "Three",
        meaning:
          "Joy is meant to be shared, and this card finds you among friends. This is a season of celebration, kinship, and the quiet miracle of being understood. Let yourself be glad without waiting for a reason to be.",
        keywords: ["friendship", "celebration", "community"],
        astrology: "Mercury in Cancer",
      },
      {
        slug: "four",
        name: "Four",
        meaning:
          "Something is being offered — and something in you is looking away. This card names the restlessness of the heart that has stopped noticing its own gifts. Soften your gaze, and you may see the cup that has been waiting at your side all along.",
        keywords: ["apathy", "reflection", "gratitude"],
        astrology: "The Moon in Cancer",
      },
      {
        slug: "five",
        name: "Five",
        meaning:
          "Something has spilled, and you are standing at the edge of the river of it. Grief and disappointment deserve their place — this card does not rush you past them. But look up, briefly: the cups still standing are not empty.",
        keywords: ["grief", "loss", "looking up"],
        astrology: "Mars in Scorpio",
      },
      {
        slug: "six",
        name: "Six",
        meaning:
          "The past reaches toward you with something gentle — a memory, an old kindness, a simpler self. This card invites both nostalgia and repair: the innocence you revisit can be re-learned, not only missed. Let the sweetness in; it is a resource, not a trap.",
        keywords: ["nostalgia", "innocence", "healing"],
        astrology: "The Sun in Scorpio",
      },
      {
        slug: "seven",
        name: "Seven",
        meaning:
          "Many cups rise before you, each brimming with a possible life. This card is the daydream made visible — and the reminder that imagination is a tool, not a destination. Choose with your values, not your dazzle.",
        keywords: ["daydreams", "choices", "imagination"],
        astrology: "Venus in Scorpio",
      },
      {
        slug: "eight",
        name: "Eight",
        meaning:
          "Something is ending not because it broke, but because you have outgrown it. Leaving is an act of self-respect when the heart has already moved on. Honor what the old ground gave you; then walk, gently but surely.",
        keywords: ["leaving", "growth", "letting go"],
        astrology: "Saturn in Pisces",
      },
      {
        slug: "nine",
        name: "Nine",
        meaning:
          "A wish has been waiting to be let close. This card is the quiet satisfaction of having what you asked for and the grace to enjoy it. Let yourself want what you want without apology — and receive it fully when it comes.",
        keywords: ["satisfaction", "wishes", "contentment"],
        astrology: "Jupiter in Pisces",
      },
      {
        slug: "ten",
        name: "Ten",
        meaning:
          "A vision of wholeness — love that settles into belonging, a family of choice or blood held in common feeling. This card is not a promise of perfection but an invitation to value what is already whole in your life. Look around you; the cup overflows in ways you have begun to take for granted.",
        keywords: ["wholeness", "belonging", "fulfillment"],
        astrology: "Mars in Pisces",
      },
      {
        slug: "page",
        name: "Page",
        meaning:
          "A message carried in a cup — a feeling, a small creative seed, a tender idea. This card asks you to receive it with the openness of a child: curious, unguarded, not yet decided. What is your heart trying to hand you?",
        keywords: ["tenderness", "creativity", "messenger"],
        astrology: "Earth of Water",
      },
      {
        slug: "knight",
        name: "Knight",
        meaning:
          "A romantic, dream-lit energy is riding toward something it believes in. This card carries charm and devotion — and the gentle caution that feelings, however beautiful, still deserve a map. Follow the heart, but let it walk, not gallop.",
        keywords: ["romance", "devotion", "idealism"],
        astrology: "Fire of Water",
      },
      {
        slug: "queen",
        name: "Queen",
        meaning:
          "Deep feeling held with grace — this is the quiet power of empathy that knows its own tide. This card asks you to stay soft toward others without drowning yourself. Your sensitivity is a strength when its roots run in your own ground.",
        keywords: ["empathy", "intuition", "gentleness"],
        astrology: "Water of Water",
      },
      {
        slug: "king",
        name: "King",
        meaning:
          "Emotion governed with maturity — feeling everything and steering by it wisely. This card speaks of steadiness on the inside: the calm surface over the deep current. Let your compassion be a compass, not a weathervane.",
        keywords: ["compassion", "wisdom", "composure"],
        astrology: "Air of Water",
      },
    ],
  },
  {
    slug: "swords",
    name: "Swords",
    element: "Air",
    glyph: "♠",
    aceAstrology: "Root of the Powers of Air",
    courtAstrology: (rank) => {
      const map: Record<string, string> = {
        Page: "Earth of Air",
        Knight: "Fire of Air",
        Queen: "Water of Air",
        King: "Air of Air",
      };
      return map[rank];
    },
    ranks: [
      {
        slug: "ace",
        name: "Ace",
        meaning:
          "A thought cuts clean through the fog — a clarity that asks to be spoken or acted on. This card is the blade of truth: sharp, honest, and impartial. Ask yourself what you know to be true that fear has been muffling.",
        keywords: ["clarity", "truth", "insight"],
        astrology: "Root of the Powers of Air",
      },
      {
        slug: "two",
        name: "Two",
        meaning:
          "A decision waits, and you are holding both options at arm's length. This card honors the pause of discernment — not indecision, but the gathering of nerve. When the blindfold comes off, you already know which way the balance tips.",
        keywords: ["decision", "balance", "discernment"],
        astrology: "The Moon in Libra",
      },
      {
        slug: "three",
        name: "Three",
        meaning:
          "A heart has been pierced by something honest and painful — a truth, a loss, a hard word. This card does not ask you to hurry the healing; rain falls, then clears. Give the wound air and time; it is part of how you become more real.",
        keywords: ["heartache", "truth", "healing"],
        astrology: "Saturn in Libra",
      },
      {
        slug: "four",
        name: "Four",
        meaning:
          "The mind, exhausted, is asking for rest. This card is not defeat; it is the truce you grant yourself between battles. Build the quiet now — it is not time wasted, it is the ground where the next clarity grows.",
        keywords: ["rest", "retreat", "recovery"],
        astrology: "Jupiter in Libra",
      },
      {
        slug: "five",
        name: "Five",
        meaning:
          "A victory has been won at a cost the scoreboard does not show. This card asks an honest question: was winning worth the weight of how it was won? Choose, next time, the contest that leaves you whole.",
        keywords: ["conflict", "cost", "integrity"],
        astrology: "Venus in Aquarius",
      },
      {
        slug: "six",
        name: "Six",
        meaning:
          "The water is carrying you away from a shore you have known too long. This card is the journey of leaving — not escape, but the passage toward calmer water. Let the old shore recede; the direction of your boat has already changed.",
        keywords: ["transition", "passage", "calm"],
        astrology: "Mercury in Aquarius",
      },
      {
        slug: "seven",
        name: "Seven",
        meaning:
          "Something is being carried away quietly, and it may be yours to notice. This card asks for honest inventory — what are you hiding, from others or yourself? The truth, once named, has a way of dismantling the cleverest escape.",
        keywords: ["strategy", "deception", "honesty"],
        astrology: "The Moon in Aquarius",
      },
      {
        slug: "eight",
        name: "Eight",
        meaning:
          "The binds around you are tighter in your telling than in your flesh. This card mirrors the mind's habit of sentencing itself. Look once, with full honesty: which of these cords are real, and which are made of habit?",
        keywords: ["restriction", "self-doubt", "freedom"],
        astrology: "Jupiter in Gemini",
      },
      {
        slug: "nine",
        name: "Nine",
        meaning:
          "The mind paces in a room of its own making, rehearsing every worst thing. This card is the 3 a.m. hour — and it asks you not to reason with the noise but to put it down. The thoughts that keep you up are not the whole truth of you.",
        keywords: ["anxiety", "worry", "release"],
        astrology: "Mars in Gemini",
      },
      {
        slug: "ten",
        name: "Ten",
        meaning:
          "A story has reached its bitter end — the last stroke of a cycle that asked everything of you. This card is the surprising peace after the fall: the relief of no longer bracing. Dawn rises behind the fallen figure; endings of this size make room for firsts.",
        keywords: ["ending", "low point", "new dawn"],
        astrology: "The Sun in Gemini",
      },
      {
        slug: "page",
        name: "Page",
        meaning:
          "A quick mind with a question well sharpened. This card is the messenger of curiosity — watching, asking, learning before leaping. Keep the questions coming; they are the tools that will cut the path ahead.",
        keywords: ["curiosity", "questions", "vigilance"],
        astrology: "Earth of Air",
      },
      {
        slug: "knight",
        name: "Knight",
        meaning:
          "Thought takes flight at full speed — an idea, a charge, a stance arrived at with certainty. This card honors the rush of conviction and the need to aim it. Speed is a gift; just be sure your horse is pointed where your values live.",
        keywords: ["speed", "conviction", "ambition"],
        astrology: "Fire of Air",
      },
      {
        slug: "queen",
        name: "Queen",
        meaning:
          "Perception refined by honesty — this is the discernment that has passed through storms and kept its eyes open. This card asks you to speak true and clean, without cruelty and without flattery. Your clarity is a gift to those you love.",
        keywords: ["perception", "honesty", "independence"],
        astrology: "Water of Air",
      },
      {
        slug: "king",
        name: "King",
        meaning:
          "The mind at its most disciplined — fair, incisive, and unafraid of the truth. This card asks you to decide with integrity and to stand by the standard you set. A king of the air rules by the strength of his word, not his reach.",
        keywords: ["discipline", "justice", "authority"],
        astrology: "Air of Air",
      },
    ],
  },
  {
    slug: "pentacles",
    name: "Pentacles",
    element: "Earth",
    glyph: "♦",
    aceAstrology: "Root of the Powers of Earth",
    courtAstrology: (rank) => {
      const map: Record<string, string> = {
        Page: "Earth of Earth",
        Knight: "Fire of Earth",
        Queen: "Water of Earth",
        King: "Air of Earth",
      };
      return map[rank];
    },
    ranks: [
      {
        slug: "ace",
        name: "Ace",
        meaning:
          "Something solid is being offered — a seed of opportunity, a new foundation, a real resource arriving at your feet. This card is the beginning of tangible growth. Plant it with your hands, and it will answer your care.",
        keywords: ["opportunity", "foundation", "prosperity"],
        astrology: "Root of the Powers of Earth",
      },
      {
        slug: "two",
        name: "Two",
        meaning:
          "Two tasks, two purses, two rhythms — and one of you holding them all aloft. This card is the art of graceful juggling and the wisdom of rhythm. You can hold both, but not constantly; choose when to set one down with love.",
        keywords: ["balance", "juggling", "adaptability"],
        astrology: "Jupiter in Capricorn",
      },
      {
        slug: "three",
        name: "Three",
        meaning:
          "Collaboration is the craft this card names — the meeting of skill, vision, and trust. Something you are building is better because more than one pair of hands is on it. Ask for the help; it is not a sign of weakness but of mastery.",
        keywords: ["collaboration", "craft", "teamwork"],
        astrology: "Mars in Capricorn",
      },
      {
        slug: "four",
        name: "Four",
        meaning:
          "A hand closes around what has been hard-won — security, control, the comfort of holding on. This card honors the fear that guards the hoard and asks you to test its grip. What could loosen, safely, today?",
        keywords: ["security", "control", "letting go"],
        astrology: "The Sun in Capricorn",
      },
      {
        slug: "five",
        name: "Five",
        meaning:
          "A cold wind is blowing through the material world, and you have felt it. This card stands with the weary — it does not shame the struggle, it names it. Help may arrive in forms you have not yet noticed; keep your eyes open at the edge of the light.",
        keywords: ["hardship", "need", "openness"],
        astrology: "Mercury in Taurus",
      },
      {
        slug: "six",
        name: "Six",
        meaning:
          "Resources are moving — giving, receiving, and the balance between them. This card is the kindness of fair exchange, the grace of open hands. Whether you give or receive today, do it without shame either way.",
        keywords: ["generosity", "exchange", "fairness"],
        astrology: "The Moon in Taurus",
      },
      {
        slug: "seven",
        name: "Seven",
        meaning:
          "You have planted, and now you wait, hoe in hand, watching for green. This card is patience with a purpose — the honest pause that lets effort ripen. Not everything can be hurried; the wait is part of the yield.",
        keywords: ["patience", "assessment", "investment"],
        astrology: "Saturn in Taurus",
      },
      {
        slug: "eight",
        name: "Eight",
        meaning:
          "Hands at work, focus like a held breath — this card is the quiet devotion of craft. Mastery is being built in the small, patient repetitions most people will never see. Keep shaping your work; you are becoming its signature.",
        keywords: ["craft", "diligence", "mastery"],
        astrology: "The Sun in Virgo",
      },
      {
        slug: "nine",
        name: "Nine",
        meaning:
          "A garden of your own making — comfort, independence, and the pleasure of what you have grown. This card asks you to enjoy your own company and your own abundance. You have arrived somewhere your younger self worked hard to reach.",
        keywords: ["independence", "comfort", "self-worth"],
        astrology: "Venus in Virgo",
      },
      {
        slug: "ten",
        name: "Ten",
        meaning:
          "A lineage of effort settles into a lasting household — the inheritance of what has been built, passed on with care. This card is the long game paying out: family, legacy, roots. Look at what you are part of; some of what you stand on took generations.",
        keywords: ["legacy", "family", "longevity"],
        astrology: "Mercury in Virgo",
      },
      {
        slug: "page",
        name: "Page",
        meaning:
          "A seed has been placed in your hand, and you are being invited to study it. This card is the patience of apprenticeship — the willingness to begin at the beginning and learn the feel of real things. The small deliberate steps you take now are the foundation.",
        keywords: ["apprenticeship", "study", "beginnings"],
        astrology: "Earth of Earth",
      },
      {
        slug: "knight",
        name: "Knight",
        meaning:
          "Slow, steady, unshakeable — this is the pace that outlasts the sprint. This card honors diligence as a kind of devotion: showing up, again and again, until the ground notices. The journey is unglamorous and it is precisely where things get built.",
        keywords: ["diligence", "steadiness", "reliability"],
        astrology: "Fire of Earth",
      },
      {
        slug: "queen",
        name: "Queen",
        meaning:
          "Nurture made practical — the warmth that shows up as bread on the table and a hundred small provisions. This card is stewardship of body, home, and resource with real tenderness. What you tend well grows well; do not forget yourself in the tending.",
        keywords: ["nurture", "practicality", "stewardship"],
        astrology: "Water of Earth",
      },
      {
        slug: "king",
        name: "King",
        meaning:
          "Mastery of the material world worn lightly — abundance used as a tool for others' good. This card speaks of grounded vision, generous power, and the patience of a long-term game. Build what will outlast you; that is the truest wealth.",
        keywords: ["abundance", "stewardship", "vision"],
        astrology: "Air of Earth",
      },
    ],
  },
];

const RANK_ORDER = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "page",
  "knight",
  "queen",
  "king",
];

const COURT_RANKS = new Set(["page", "knight", "queen", "king"]);

/**
 * Classic numerical essences for the minor arcana ranks. Pips carry the
 * number's traditional meaning; courts extend the sequence 11–14. Each note
 * is tuned to its suit with a short elemental qualifier (see below).
 */
const NUMEROLOGY_BY_VALUE: Record<number, string> = {
  1: "new beginnings",
  2: "balance & partnership",
  3: "expression & growth",
  4: "stability",
  5: "change & tension",
  6: "harmony & healing",
  7: "effort & inner work",
  8: "momentum & mastery",
  9: "near-completion",
  10: "culmination",
  11: "curious exploration",
  12: "urgent action",
  13: "nurturing mastery",
  14: "authority & command",
};

/** Suit qualifier that tunes each rank's essence to its element. */
const SUIT_NUMEROLOGY_FLAVOR: Record<string, string> = {
  wands: "through will",
  cups: "through feeling",
  swords: "through thought",
  pentacles: "through practice",
};

export const MINOR_ARCANA: MinorArcanaCard[] = SUITS.flatMap((suit) =>
  RANK_ORDER.map((rankSlug) => {
    const rank = suit.ranks.find((r) => r.slug === rankSlug)!;
    const numerologyValue = RANK_ORDER.indexOf(rankSlug) + 1;
    return {
      id: `${rank.slug}-of-${suit.slug}`,
      name: `${rank.name} of ${suit.name}`,
      symbol: suit.glyph,
      meaning: rank.meaning,
      keywords: rank.keywords,
      element: suit.element,
      astrology: rank.slug === "ace" ? suit.aceAstrology
        : COURT_RANKS.has(rank.slug) ? suit.courtAstrology(rank.name)
        : rank.astrology,
      numerology: {
        value: numerologyValue,
        note: `${NUMEROLOGY_BY_VALUE[numerologyValue]}, ${SUIT_NUMEROLOGY_FLAVOR[suit.slug]}`,
      },
    };
  }),
);