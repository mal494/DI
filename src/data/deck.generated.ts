/**
 * GENERATED FILE - DO NOT EDIT BY HAND.
 *
 * Built from Divine Insight Core 4.5 (schema 1.5)
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
  {
    id: "the-fool",
    name: "The Fool",
    symbol: "🃏",
    meaning:
      "Numbered zero, the Fool steps toward a cliff edge with a white rose and a small bundle, trusting the open air of Uranus to carry him. A leap of faith into the unknown asks you to begin before you feel ready.",
    keywords: ["beginnings", "spontaneity", "faith"],
    element: "Air",
    astrology: "Uranus",
    numerology: { value: 0, note: "beginnings & boundless potential" },
  },
  {
    id: "the-magician",
    name: "The Magician",
    symbol: "🪄",
    meaning:
      "One hand raised to the heavens and one pointed to the earth, the Magician channels Mercury's quickness through the four suit tools on his table. The alignment of will and tools means your intention, skill, and timing finally point the same direction.",
    keywords: ["manifestation", "power", "resourcefulness"],
    element: "Air",
    astrology: "Mercury",
    numerology: { value: 1, note: "manifestation & focused will" },
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    symbol: "🌙",
    meaning:
      "Seated between the black and white pillars with a crescent moon at her feet, she guards a scroll only stillness can read. Silence reveals what is hidden, and her lunar water asks you to trust impressions that arrive before evidence does.",
    keywords: ["intuition", "mystery", "inner voice"],
    element: "Water",
    astrology: "Moon",
    numerology: { value: 2, note: "intuition & hidden wisdom" },
  },
  {
    id: "the-empress",
    name: "The Empress",
    symbol: "🌹",
    meaning:
      "Reclining among ripening wheat in a Venus-crowned robe, the Empress makes growth look unhurried. The peak of creative fertility asks you to tend what you have planted with warmth, comfort, and earthy patience rather than force it to bloom early.",
    keywords: ["abundance", "nurturing", "creation"],
    element: "Earth",
    astrology: "Venus",
    numerology: { value: 3, note: "creation & abundance" },
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    symbol: "👑",
    meaning:
      "Enthroned in stone with ram-headed arms and Aries fire behind him, the Emperor builds frameworks that outlast moods. Implementation of order means boundaries, routines, and clear responsibility turn scattered ambition into something durable you can actually stand on.",
    keywords: ["structure", "establishment", "control"],
    element: "Fire",
    astrology: "Aries",
    numerology: { value: 4, note: "structure & steady command" },
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    symbol: "📜",
    meaning:
      "Raised in blessing between two pillars with keys crossed at his feet, the Hierophant keeps the Taurean long memory of a tradition. Seeking counsel in established systems means a teacher, institution, or inherited practice has something tested to offer you now.",
    keywords: ["tradition", "beliefs", "conformity"],
    element: "Earth",
    astrology: "Taurus",
    numerology: { value: 5, note: "tradition & learned guidance" },
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    symbol: "💞",
    meaning:
      "Two figures stand bare beneath an angel, flanked by the trees of knowledge and life, with airy Gemini making this a meeting of minds. A choice based on deep core values asks you to unite what you want with who you are.",
    keywords: ["harmony", "values", "partnership"],
    element: "Air",
    astrology: "Gemini",
    numerology: { value: 6, note: "alignment & heartfelt choice" },
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    symbol: "🏇",
    meaning:
      "Armored and canopied with stars, the charioteer drives a black and a white sphinx with reins of will alone, Cancer's shell protecting a soft interior. Steering opposing forces toward success means your contradictions pull together once you choose a single direction.",
    keywords: ["victory", "willpower", "control"],
    element: "Water",
    astrology: "Cancer",
    numerology: { value: 7, note: "momentum & chosen direction" },
  },
  {
    id: "strength",
    name: "Strength",
    symbol: "🦁",
    meaning:
      "A woman crowned with the infinity symbol closes a lion's jaws with her hands and not a weapon, Leo's fire warmed rather than smothered. Mastery of the self through gentleness means patience and compassion accomplish what intimidation never could manage.",
    keywords: ["courage", "influence", "compassion"],
    element: "Fire",
    astrology: "Leo",
    numerology: { value: 8, note: "quiet resolve & courage" },
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    symbol: "🏮",
    meaning:
      "Alone on a grey summit, the Hermit lifts a lantern holding a single star and leans on a staff of experience, Virgo's patience in every step. Withdrawal to seek inner truth means stepping back is how your next instruction arrives.",
    keywords: ["introspection", "solitude", "guidance"],
    element: "Earth",
    astrology: "Virgo",
    numerology: { value: 9, note: "solitude & inner wisdom" },
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    symbol: "🎡",
    meaning:
      "Four winged creatures hold the corners while the great wheel turns with Jupiter's expansive sweep, lifting what was low and lowering what was high. Accepting the inevitable motion of the universe means change is arriving and your relationship to it matters most.",
    keywords: ["cycles", "luck", "destiny"],
    element: "Fire",
    astrology: "Jupiter",
    numerology: { value: 10, note: "cycles & turning fortune" },
  },
  {
    id: "justice",
    name: "Justice",
    symbol: "⚖️",
    meaning:
      "Upright sword in one hand and level scales in the other, Justice sits between airy Libra's pillars and weighs without flattery. Objective evaluation and balance means facts, agreements, and consequences are being measured, and your own honesty tips the scale.",
    keywords: ["fairness", "truth", "cause and effect"],
    element: "Air",
    astrology: "Libra",
    numerology: { value: 11, note: "truth & fair balance" },
  },
  {
    id: "the-hanged-man",
    name: "The Hanged Man",
    symbol: "⏳",
    meaning:
      "Suspended by one ankle from a living tree, haloed and oddly serene, the Hanged Man trades motion for Neptune's watery insight. Finding clarity through stillness means the whole view changes once you stop struggling to right yourself again.",
    keywords: ["pause", "surrender", "new perspective"],
    element: "Water",
    astrology: "Neptune",
    numerology: { value: 12, note: "surrender & new sight" },
  },
  {
    id: "death",
    name: "Death",
    symbol: "🦋",
    meaning:
      "The skeletal rider in black armor moves steadily forward, and the thirteenth key of the Major Arcana asks you to let one chapter truly end. Under Scorpio's watery depths, release clears ground for genuine rebirth.",
    keywords: ["endings", "transition", "rebirth"],
    element: "Water",
    astrology: "Scorpio",
    numerology: { value: 13, note: "transformation & release" },
  },
  {
    id: "temperance",
    name: "Temperance",
    symbol: "⚗️",
    meaning:
      "The angel pours water between two cups without spilling a drop, one foot on land and one in the stream. Sagittarian fire aimed with patience turns opposing needs into a single workable purpose.",
    keywords: ["balance", "moderation", "purpose"],
    element: "Fire",
    astrology: "Sagittarius",
    numerology: { value: 14, note: "balance & gentle blending" },
  },
  {
    id: "the-devil",
    name: "The Devil",
    symbol: "⛓️",
    meaning:
      "Two figures stand chained beneath a horned Baphomet, yet the chains hang loose around their necks. Capricorn's earthy ambition curdles into attachment here, showing how comfort, craving, or fear can bind you with your own quiet consent.",
    keywords: ["shadow", "attachment", "restriction"],
    element: "Earth",
    astrology: "Capricorn",
    numerology: { value: 15, note: "attachment & liberation" },
  },
  {
    id: "the-tower",
    name: "The Tower",
    symbol: "⚡",
    meaning:
      "Lightning strikes the crown from a tall tower and two figures fall into open air. Martial fire arrives without warning to bring down what was built on a flawed foundation, and the shock carries a hard revelation with it.",
    keywords: ["upheaval", "revelation", "sudden change"],
    element: "Fire",
    astrology: "Mars",
    numerology: { value: 16, note: "sudden release" },
  },
  {
    id: "the-star",
    name: "The Star",
    symbol: "🌟",
    meaning:
      "A figure kneels by a pool pouring water onto land and back into the stream beneath eight shining stars. Aquarian air brings calm clarity after upheaval, restoring faith through gentle, unhurried healing rather than dramatic rescue.",
    keywords: ["hope", "faith", "renewal"],
    element: "Air",
    astrology: "Aquarius",
    numerology: { value: 17, note: "hope & quiet renewal" },
  },
  {
    id: "the-moon",
    name: "The Moon",
    symbol: "🌕",
    meaning:
      "A path winds between two towers under a moon with a human face, while a dog and a wolf howl and a crayfish leaves the pool. Piscean water blurs outlines, so what you feel may outrun what you can verify.",
    keywords: ["illusion", "fear", "subconscious"],
    element: "Water",
    astrology: "Pisces",
    numerology: { value: 18, note: "dreams & hidden depths" },
  },
  {
    id: "the-sun",
    name: "The Sun",
    symbol: "☀️",
    meaning:
      "A child rides a white horse beneath a great radiant sun, banner lifted, sunflowers tall behind the wall. Solar fire brings plain visibility, vitality, and the kind of success that needs no explaining or defending.",
    keywords: ["success", "vitality", "joy"],
    element: "Fire",
    astrology: "Sun",
    numerology: { value: 19, note: "vitality & radiant joy" },
  },
  {
    id: "judgement",
    name: "Judgement",
    symbol: "🎺",
    meaning:
      "An angel's trumpet sounds and figures rise from open coffins with arms lifted. Plutonian fire calls for an honest reckoning with your own history, and the forgiveness that follows lets you answer a deeper purpose.",
    keywords: ["rebirth", "absolution", "inner calling"],
    element: "Fire",
    astrology: "Pluto",
    numerology: { value: 20, note: "awakening & higher calling" },
  },
  {
    id: "the-world",
    name: "The World",
    symbol: "🌍",
    meaning:
      "A dancer moves inside a laurel wreath while four living creatures watch from the corners. Saturn's long discipline pays out here as completion, the moment separate efforts integrate into something whole enough to stand on its own.",
    keywords: ["completion", "integration", "accomplishment"],
    element: "Earth",
    astrology: "Saturn",
    numerology: { value: 21, note: "completion & wholeness" },
  },
  {
    id: "ace-of-wands",
    name: "Ace of Wands",
    symbol: "♣",
    meaning:
      "A hand emerges from a cloud holding a sprouting wand above a distant castle and open hills. As the suit's first card, it offers raw fiery potential, an idea alive enough to leaf out if you take hold of it.",
    keywords: ["inspiration", "potential", "spark"],
    element: "Fire",
    astrology: "Fire Signs",
    numerology: { value: 1, note: "new beginnings, through will" },
  },
  {
    id: "two-of-wands",
    name: "Two of Wands",
    symbol: "♣",
    meaning:
      "A figure stands on a battlement holding a small globe, one wand fixed and one in hand, gazing past a safe harbor. Mars in Aries lends the restless drive to plan a bigger life than the one currently in view.",
    keywords: ["planning", "discovery", "vision"],
    element: "Fire",
    astrology: "Mars in Aries",
    numerology: { value: 2, note: "balance & partnership, through will" },
  },
  {
    id: "three-of-wands",
    name: "Three of Wands",
    symbol: "♣",
    meaning:
      "A figure stands on a cliff between three planted wands, watching ships move across open water. Solar Aries energy marks the point where plans have launched and foresight replaces effort, with results traveling toward you from a distance.",
    keywords: ["expansion", "foresight", "progress"],
    element: "Fire",
    astrology: "Sun in Aries",
    numerology: { value: 3, note: "expression & growth, through will" },
  },
  {
    id: "four-of-wands",
    name: "Four of Wands",
    symbol: "♣",
    meaning:
      "Four wands hold a flowered canopy while figures raise bouquets before a sunlit castle. Venus in Aries makes this a warm, social pause, a structure built just sturdily enough to gather people under and celebrate together.",
    keywords: ["celebration", "stability", "homecoming"],
    element: "Fire",
    astrology: "Venus in Aries",
    numerology: { value: 4, note: "stability, through will" },
  },
  {
    id: "five-of-wands",
    name: "Five of Wands",
    symbol: "♣",
    meaning:
      "Five youths brandish staves in a scramble that looks fiercer than it is, Saturn's discipline wrestling Leo's pride. The struggle of wills sharpens your position, testing whether you can compete without losing sight of why you entered the ring.",
    keywords: ["conflict", "competition", "rivalry"],
    element: "Fire",
    astrology: "Saturn in Leo",
    numerology: { value: 5, note: "change & tension, through will" },
  },
  {
    id: "six-of-wands",
    name: "Six of Wands",
    symbol: "♣",
    meaning:
      "A rider crowned with laurel moves through a cheering crowd, Jupiter expanding Leo's warmth into public acclaim. External validation arrives and it is earned, confirming that the work you did quietly has been seen by others.",
    keywords: ["victory", "recognition", "public success"],
    element: "Fire",
    astrology: "Jupiter in Leo",
    numerology: { value: 6, note: "harmony & healing, through will" },
  },
  {
    id: "seven-of-wands",
    name: "Seven of Wands",
    symbol: "♣",
    meaning:
      "One figure stands on a hillock, six staves pushing up from below while Mars lends Leo the nerve to hold position. You are defending something you built, and the high ground is yours as long as you remember why it matters.",
    keywords: ["defensiveness", "challenge", "perseverance"],
    element: "Fire",
    astrology: "Mars in Leo",
    numerology: { value: 7, note: "effort & inner work, through will" },
  },
  {
    id: "eight-of-wands",
    name: "Eight of Wands",
    symbol: "♣",
    meaning:
      "Eight staves fly through open sky with nothing blocking their path, Mercury's quickness carried on Sagittarian aim. Events accelerate, messages land, and plans that felt stuck suddenly move all at once in the direction you pointed them.",
    keywords: ["speed", "action", "momentum"],
    element: "Fire",
    astrology: "Mercury in Sagittarius",
    numerology: { value: 8, note: "momentum & mastery, through will" },
  },
  {
    id: "nine-of-wands",
    name: "Nine of Wands",
    symbol: "♣",
    meaning:
      "A bandaged figure leans on one staff with eight more standing behind, Moon in Sagittarius keeping watch through tiredness. You have been through enough to be wary and strong enough to stand anyway; this is the final stretch, not the beginning.",
    keywords: ["resilience", "grit", "persistence"],
    element: "Fire",
    astrology: "Moon in Sagittarius",
    numerology: { value: 9, note: "near-completion, through will" },
  },
  {
    id: "ten-of-wands",
    name: "Ten of Wands",
    symbol: "♣",
    meaning:
      "A figure hauls ten staves bundled awkwardly against the chest, town in sight but view obscured, Saturn weighing down Sagittarian ambition. You are carrying more than one person should, and the load is proof of commitment rather than capability.",
    keywords: ["burden", "hard work", "responsibility"],
    element: "Fire",
    astrology: "Saturn in Sagittarius",
    numerology: { value: 10, note: "culmination, through will" },
  },
  {
    id: "page-of-wands",
    name: "Page of Wands",
    symbol: "♣",
    meaning:
      "A young figure in a patterned tunic of salamanders studies a sprouting staff, desert open ahead. Earth grounds Fire just enough to begin: fresh enthusiasm, surprising news, and the honest beginner's willingness to explore before mastering.",
    keywords: ["inspiration", "messages", "curiosity"],
    element: "Fire",
    astrology: "Earth/Fire",
    numerology: { value: 11, note: "curious exploration, through will" },
  },
  {
    id: "knight-of-wands",
    name: "Knight of Wands",
    symbol: "♣",
    meaning:
      "Armored and plumed, this knight sits a rearing horse mid-charge, Air fanning Fire into pure forward motion. Courage outruns caution here, and that is sometimes exactly right: adventure, travel, and bold commitments favor whoever actually moves.",
    keywords: ["action", "fearlessness", "adventure"],
    element: "Fire",
    astrology: "Air/Fire",
    numerology: { value: 12, note: "urgent action, through will" },
  },
  {
    id: "queen-of-wands",
    name: "Queen of Wands",
    symbol: "♣",
    meaning:
      "Sunflowers, carved lions, and a black cat at her feet: this queen holds Fire with Water's steadiness, warm and entirely self-possessed. Your presence draws people without effort because it rests on self-knowledge rather than performance.",
    keywords: ["confidence", "independence", "charisma"],
    element: "Fire",
    astrology: "Water/Fire",
    numerology: { value: 13, note: "nurturing mastery, through will" },
  },
  {
    id: "king-of-wands",
    name: "King of Wands",
    symbol: "♣",
    meaning:
      "Salamanders circle this throne and the staff in his hand is flowering, pure Fire of Fire. Vision plus the authority to build it: you can see the whole structure and hold other people's confidence long enough to make it real.",
    keywords: ["leader", "visionary", "authority"],
    element: "Fire",
    astrology: "Fire/Fire",
    numerology: { value: 14, note: "authority & command, through will" },
  },
  {
    id: "ace-of-cups",
    name: "Ace of Cups",
    symbol: "♥",
    meaning:
      "A hand offers a chalice overflowing in five streams while a dove descends with a wafer, Water at its purest beginning. Feeling opens: new love, renewed compassion, or an intuitive sense that something tender in you is coming back online.",
    keywords: ["love", "spirituality", "new feeling"],
    element: "Water",
    astrology: "Water Signs",
    numerology: { value: 1, note: "new beginnings, through feeling" },
  },
  {
    id: "two-of-cups",
    name: "Two of Cups",
    symbol: "♥",
    meaning:
      "Two figures exchange cups beneath a winged lion and caduceus, Venus in Cancer blessing a meeting of equals. Attraction here is mutual and balanced, whether romantic or collaborative, and it works because both people bring a full cup.",
    keywords: ["partnership", "attraction", "mutual respect"],
    element: "Water",
    astrology: "Venus in Cancer",
    numerology: { value: 2, note: "balance & partnership, through feeling" },
  },
  {
    id: "three-of-cups",
    name: "Three of Cups",
    symbol: "♥",
    meaning:
      "Three figures raise their cups in a circle amid harvest fruit, Mercury in Cancer carrying warmth between them. Joy multiplies when it is shared, and this card marks the friendships, collaborations, and milestones worth gathering people to mark.",
    keywords: ["celebration", "friendship", "community"],
    element: "Water",
    astrology: "Mercury in Cancer",
    numerology: { value: 3, note: "expression & growth, through feeling" },
  },
  {
    id: "four-of-cups",
    name: "Four of Cups",
    symbol: "♥",
    meaning:
      "Seated beneath a tree with three cups ignored at your feet, you have turned inward and stopped tasting what life offers. A fourth cup arrives from a cloud, lunar and Cancerian, asking whether this quiet is rest or avoidance.",
    keywords: ["contemplation", "apathy", "boredom"],
    element: "Water",
    astrology: "Moon in Cancer",
    numerology: { value: 4, note: "stability, through feeling" },
  },
  {
    id: "five-of-cups",
    name: "Five of Cups",
    symbol: "♥",
    meaning:
      "Cloaked in black, you stare at three spilled cups and cannot yet turn toward the two still standing behind you. Mars in Scorpio makes the ache sharp and private, insisting the wound be felt before the bridge home is crossed.",
    keywords: ["loss", "grief", "regret"],
    element: "Water",
    astrology: "Mars in Scorpio",
    numerology: { value: 5, note: "change & tension, through feeling" },
  },
  {
    id: "six-of-cups",
    name: "Six of Cups",
    symbol: "♥",
    meaning:
      "Two children exchange cups filled with white flowers in a sunlit garden, and sweetness arrives without any price attached. Sun in Scorpio warms the deep past, returning memory, familiar faces, and an uncomplicated generosity you had almost forgotten.",
    keywords: ["nostalgia", "innocence", "childhood"],
    element: "Water",
    astrology: "Sun in Scorpio",
    numerology: { value: 6, note: "harmony & healing, through feeling" },
  },
  {
    id: "seven-of-cups",
    name: "Seven of Cups",
    symbol: "♥",
    meaning:
      "Seven cups rise in cloud, holding a castle, jewels, a wreath, a serpent, and a shrouded figure, each promising something different. Venus in Scorpio makes the imagining seductive, yet none of these shapes becomes real until one is chosen.",
    keywords: ["choices", "illusion", "fantasy"],
    element: "Water",
    astrology: "Venus in Scorpio",
    numerology: { value: 7, note: "effort & inner work, through feeling" },
  },
  {
    id: "eight-of-cups",
    name: "Eight of Cups",
    symbol: "♥",
    meaning:
      "Under an eclipsed moon a figure turns from eight carefully stacked cups and climbs toward the mountains, leaving a visible gap behind. Saturn in Pisces gives this departure weight: something adequate is being released in search of something true.",
    keywords: ["withdrawal", "escapism", "walking away"],
    element: "Water",
    astrology: "Saturn in Pisces",
    numerology: { value: 8, note: "momentum & mastery, through feeling" },
  },
  {
    id: "nine-of-cups",
    name: "Nine of Cups",
    symbol: "♥",
    meaning:
      "Nine cups arc behind a seated figure whose arms are folded in frank satisfaction, the classic wish card. Jupiter in Pisces expands feeling into fullness, marking a moment where what you wanted and what you have finally overlap.",
    keywords: ["contentment", "wish come true", "satisfaction"],
    element: "Water",
    astrology: "Jupiter in Pisces",
    numerology: { value: 9, note: "near-completion, through feeling" },
  },
  {
    id: "ten-of-cups",
    name: "Ten of Cups",
    symbol: "♥",
    meaning:
      "A rainbow of ten cups arches over a couple with arms raised and children dancing beside them, happiness shared rather than hoarded. Mars in Pisces drives the devotion that builds such a home, turning love into something actively protected.",
    keywords: ["divine love", "harmony", "belonging"],
    element: "Water",
    astrology: "Mars in Pisces",
    numerology: { value: 10, note: "culmination, through feeling" },
  },
  {
    id: "page-of-cups",
    name: "Page of Cups",
    symbol: "♥",
    meaning:
      "A young page lifts a cup and finds a fish gazing back, absurd and delightful, with the sea rolling behind. Earth steadies water here, letting an unexpected message, feeling, or creative impulse be received without immediate judgment.",
    keywords: ["intuition", "messages", "creativity"],
    element: "Water",
    astrology: "Earth/Water",
    numerology: { value: 11, note: "curious exploration, through feeling" },
  },
  {
    id: "knight-of-cups",
    name: "Knight of Cups",
    symbol: "♥",
    meaning:
      "Helmet winged like Mercury, a knight rides a white horse at a walk, offering his cup toward a stream ahead. Air carries water here, turning deep feeling into movement: an invitation, a confession, a creative quest followed on purpose.",
    keywords: ["romance", "imagination", "invitation"],
    element: "Water",
    astrology: "Air/Water",
    numerology: { value: 12, note: "urgent action, through feeling" },
  },
  {
    id: "queen-of-cups",
    name: "Queen of Cups",
    symbol: "♥",
    meaning:
      "Throned at the water's edge, she gazes into an ornate covered cup, holding feeling without being swept away by it. Pure water doubled gives unusual empathy, the ability to sit with someone's pain and remain entirely steady.",
    keywords: ["compassion", "comfort", "intuition"],
    element: "Water",
    astrology: "Water/Water",
    numerology: { value: 13, note: "nurturing mastery, through feeling" },
  },
  {
    id: "king-of-cups",
    name: "King of Cups",
    symbol: "♥",
    meaning:
      "His throne floats on a restless sea while a ship rides the swell and a fish amulet hangs at his chest, calm amid motion. Fire directs water here, producing composure that feels deeply rather than numbly.",
    keywords: ["emotional balance", "diplomacy", "composure"],
    element: "Water",
    astrology: "Fire/Water",
    numerology: { value: 14, note: "authority & command, through feeling" },
  },
  {
    id: "ace-of-swords",
    name: "Ace of Swords",
    symbol: "♠",
    meaning:
      "A hand emerges from cloud gripping an upright blade crowned with laurel and palm, the first pure spark of Air. Confusion parts, a truth announces itself plainly, and you finally have language for what you already sensed.",
    keywords: ["breakthrough", "clarity", "truth"],
    element: "Air",
    astrology: "Air Signs",
    numerology: { value: 1, note: "new beginnings, through thought" },
  },
  {
    id: "two-of-swords",
    name: "Two of Swords",
    symbol: "♠",
    meaning:
      "Blindfolded before a moonlit sea, she balances two crossed blades and refuses to lower either one. Moon in Libra seeks fairness so earnestly that choosing feels like betrayal, so the standoff is held in place by sheer effort.",
    keywords: ["choices", "stalemate", "indecision"],
    element: "Air",
    astrology: "Moon in Libra",
    numerology: { value: 2, note: "balance & partnership, through thought" },
  },
  {
    id: "three-of-swords",
    name: "Three of Swords",
    symbol: "♠",
    meaning:
      "Three blades pierce a single heart beneath grey rain, and the truth you suspected finally lands. Saturn in Libra asks you to feel the loss honestly, because naming the wound is the first real act of repair.",
    keywords: ["heartbreak", "sorrow", "painful truth"],
    element: "Air",
    astrology: "Saturn in Libra",
    numerology: { value: 3, note: "expression & growth, through thought" },
  },
  {
    id: "four-of-swords",
    name: "Four of Swords",
    symbol: "♠",
    meaning:
      "A figure lies still in a quiet chapel, three swords hung above and one laid beneath in truce. Jupiter in Libra blesses the pause, suggesting that stepping back from the fight is not surrender but deliberate restoration.",
    keywords: ["rest", "recovery", "stillness"],
    element: "Air",
    astrology: "Jupiter in Libra",
    numerology: { value: 4, note: "stability, through thought" },
  },
  {
    id: "five-of-swords",
    name: "Five of Swords",
    symbol: "♠",
    meaning:
      "One figure gathers the fallen swords while two walk away beneath a ragged sky, and the win tastes like nothing. Venus in Aquarius exposes the cost of principle without warmth, asking what the argument actually bought you.",
    keywords: ["conflict", "self-interest", "hollow victory"],
    element: "Air",
    astrology: "Venus in Aquarius",
    numerology: { value: 5, note: "change & tension, through thought" },
  },
  {
    id: "six-of-swords",
    name: "Six of Swords",
    symbol: "♠",
    meaning:
      "A ferryman poles a small boat from choppy water toward a smoother shore, six swords standing upright in the hull. Mercury in Aquarius makes this a mental crossing, carrying your lessons along while the turbulence is left behind.",
    keywords: ["transition", "departure", "passage"],
    element: "Air",
    astrology: "Mercury in Aquarius",
    numerology: { value: 6, note: "harmony & healing, through thought" },
  },
  {
    id: "seven-of-swords",
    name: "Seven of Swords",
    symbol: "♠",
    meaning:
      "A figure slips away from camp with five swords, leaving two planted behind and glancing over one shoulder. Moon in Aquarius colors the scene with cleverness and concealment, and whatever is being carried off was not fully earned.",
    keywords: ["deception", "strategy", "stealth"],
    element: "Air",
    astrology: "Moon in Aquarius",
    numerology: { value: 7, note: "effort & inner work, through thought" },
  },
  {
    id: "eight-of-swords",
    name: "Eight of Swords",
    symbol: "♠",
    meaning:
      "A blindfolded figure stands loosely bound among eight planted swords, feet free and the cage merely implied. Jupiter in Gemini enlarges the stories you tell yourself, until the limitation feels total even though the path out stays open.",
    keywords: ["imprisonment", "self-victimization", "restriction"],
    element: "Air",
    astrology: "Jupiter in Gemini",
    numerology: { value: 8, note: "momentum & mastery, through thought" },
  },
  {
    id: "nine-of-swords",
    name: "Nine of Swords",
    symbol: "♠",
    meaning:
      "Someone sits upright in the dark with their face in their hands while nine swords hang on the wall behind. Mars in Gemini drives thought into overdrive, so this dread belongs to the small hours rather than the daylight facts.",
    keywords: ["anxiety", "fear", "sleepless nights"],
    element: "Air",
    astrology: "Mars in Gemini",
    numerology: { value: 9, note: "near-completion, through thought" },
  },
  {
    id: "ten-of-swords",
    name: "Ten of Swords",
    symbol: "♠",
    meaning:
      "A figure lies face down beneath ten swords while black sky gives way to a thin band of gold. The pain is not subtle and the ending is real, yet Sun in Gemini places first light in this frame deliberately.",
    keywords: ["betrayal", "rock bottom", "painful ending"],
    element: "Air",
    astrology: "Sun in Gemini",
    numerology: { value: 10, note: "culmination, through thought" },
  },
  {
    id: "page-of-swords",
    name: "Page of Swords",
    symbol: "♠",
    meaning:
      "A young figure holds a sword aloft on windy ground, hair and clouds in motion, eager to test every idea. Earth steadies this airy page just enough, giving you an appetite for learning and the nerve to ask uncomfortable questions.",
    keywords: ["curiosity", "restlessness", "mental energy"],
    element: "Air",
    astrology: "Earth/Air",
    numerology: { value: 11, note: "curious exploration, through thought" },
  },
  {
    id: "knight-of-swords",
    name: "Knight of Swords",
    symbol: "♠",
    meaning:
      "An armored rider charges into the wind with sword raised, horse at full gallop and clouds torn behind him. This is pure air in motion, decisive and fearless, acting on conviction rather than waiting for perfect conditions to arrive.",
    keywords: ["action", "directness", "momentum"],
    element: "Air",
    astrology: "Air/Air",
    numerology: { value: 12, note: "urgent action, through thought" },
  },
  {
    id: "queen-of-swords",
    name: "Queen of Swords",
    symbol: "♠",
    meaning:
      "She sits above the clouds with her sword upright and one hand open, a butterfly carved at her crown. Experience has taught her fairness without flattery, and her kindness takes the form of telling you the truth plainly.",
    keywords: ["clarity", "independence", "boundaries"],
    element: "Air",
    astrology: "Water/Air",
    numerology: { value: 13, note: "nurturing mastery, through thought" },
  },
  {
    id: "king-of-swords",
    name: "King of Swords",
    symbol: "♠",
    meaning:
      "A king sits upright on a stone throne, sword held at a slight angle, butterflies carved behind his head. Fire moves this airy suit into decision, and his power rests on reasoning well and applying principle without playing favorites.",
    keywords: ["clarity", "authority", "intellect"],
    element: "Air",
    astrology: "Fire/Air",
    numerology: { value: 14, note: "authority & command, through thought" },
  },
  {
    id: "ace-of-pentacles",
    name: "Ace of Pentacles",
    symbol: "♦",
    meaning:
      "A hand offers a single golden coin above a walled garden where lilies bloom and a hedged arch opens onto mountains. Earth makes this beginning tangible, a real seed in real soil rather than only a bright idea.",
    keywords: ["abundance", "opportunity", "new foundation"],
    element: "Earth",
    astrology: "Earth Signs",
    numerology: { value: 1, note: "new beginnings, through practice" },
  },
  {
    id: "two-of-pentacles",
    name: "Two of Pentacles",
    symbol: "♦",
    meaning:
      "A young figure dances while juggling two pentacles bound in a lemniscate, ships rocking on the waves behind him. You are holding several commitments at once, and Jupiter in Capricorn rewards flexible, lighthearted handling of all of them.",
    keywords: ["balance", "adaptability", "juggling priorities"],
    element: "Earth",
    astrology: "Jupiter in Capricorn",
    numerology: { value: 2, note: "balance & partnership, through practice" },
  },
  {
    id: "three-of-pentacles",
    name: "Three of Pentacles",
    symbol: "♦",
    meaning:
      "A sculptor stands on a bench in the cathedral while a monk and an architect study the plans with him. Mars in Capricorn drives disciplined craft here, and your specialized skill earns recognition because others can finally see what you build.",
    keywords: ["teamwork", "skill", "collaboration"],
    element: "Earth",
    astrology: "Mars in Capricorn",
    numerology: { value: 3, note: "expression & growth, through practice" },
  },
  {
    id: "four-of-pentacles",
    name: "Four of Pentacles",
    symbol: "♦",
    meaning:
      "A seated figure clutches one pentacle, balances another on the crown, and pins two beneath the feet while the city stays shut out behind. Under the Capricorn Sun you guard what you earned, and that caution is both shelter and cage.",
    keywords: ["security", "conservation", "boundaries"],
    element: "Earth",
    astrology: "Sun in Capricorn",
    numerology: { value: 4, note: "stability, through practice" },
  },
  {
    id: "five-of-pentacles",
    name: "Five of Pentacles",
    symbol: "♦",
    meaning:
      "Two ragged figures trudge through snow past a glowing stained glass window they never once look up at. This five marks a lean season where loss and loneliness feel total, though warmth sits closer than the cold convinces you to believe.",
    keywords: ["loss", "isolation", "hardship"],
    element: "Earth",
    astrology: "Mercury in Taurus",
    numerology: { value: 5, note: "change & tension, through practice" },
  },
  {
    id: "six-of-pentacles",
    name: "Six of Pentacles",
    symbol: "♦",
    meaning:
      "A merchant holds balanced scales in one hand while placing coins into an outstretched palm. Under the Taurean Moon, giving and receiving find their proportion, and the card asks which side of that exchange you genuinely occupy now.",
    keywords: ["generosity", "charity", "fair exchange"],
    element: "Earth",
    astrology: "Moon in Taurus",
    numerology: { value: 6, note: "harmony & healing, through practice" },
  },
  {
    id: "seven-of-pentacles",
    name: "Seven of Pentacles",
    symbol: "♦",
    meaning:
      "Leaning on a staff, a gardener studies seven pentacles ripening on the vine he planted himself. Saturn in Taurus slows the clock here, asking you to assess progress honestly rather than harvest a crop that is still quietly filling out.",
    keywords: ["investment", "patience", "evaluation"],
    element: "Earth",
    astrology: "Saturn in Taurus",
    numerology: { value: 7, note: "effort & inner work, through practice" },
  },
  {
    id: "eight-of-pentacles",
    name: "Eight of Pentacles",
    symbol: "♦",
    meaning:
      "A craftsman sits carving one pentacle after another, finished work hung carefully on the beam beside him. The Virgo Sun blesses this quiet repetition, where attention to small and unglamorous detail turns ordinary effort into real, dependable skill.",
    keywords: ["apprenticeship", "mastery", "diligence"],
    element: "Earth",
    astrology: "Sun in Virgo",
    numerology: { value: 8, note: "momentum & mastery, through practice" },
  },
  {
    id: "nine-of-pentacles",
    name: "Nine of Pentacles",
    symbol: "♦",
    meaning:
      "A woman stands alone in her walled vineyard with a hooded falcon resting on her glove. Venus in Virgo savors refined pleasure here, the earned ease of someone who built her own garden and can finally walk through it slowly.",
    keywords: ["independence", "luxury", "self-sufficiency"],
    element: "Earth",
    astrology: "Venus in Virgo",
    numerology: { value: 9, note: "near-completion, through practice" },
  },
  {
    id: "ten-of-pentacles",
    name: "Ten of Pentacles",
    symbol: "♦",
    meaning:
      "An elder sits beneath an archway with family, dogs, and ten pentacles arranged like a tree of life. This card speaks of structures that outlive you, where wealth means continuity, belonging, and something steady handed forward to others.",
    keywords: ["legacy", "tradition", "family wealth"],
    element: "Earth",
    astrology: "Mercury in Virgo",
    numerology: { value: 10, note: "culmination, through practice" },
  },
  {
    id: "page-of-pentacles",
    name: "Page of Pentacles",
    symbol: "♦",
    meaning:
      "A young figure stands in a green field, holding a single pentacle up and studying it with complete absorption. Earth of Earth, this page carries a practical idea in its earliest form, curious, grounded, and genuinely ready to learn.",
    keywords: ["manifestation", "skill", "new opportunity"],
    element: "Earth",
    astrology: "Earth/Earth",
    numerology: { value: 11, note: "curious exploration, through practice" },
  },
  {
    id: "knight-of-pentacles",
    name: "Knight of Pentacles",
    symbol: "♦",
    meaning:
      "Still on a heavy black horse at the edge of plowed fields, this knight holds his pentacle without any flourish. Air of Earth moves slowly and finishes what it starts, proving unremarkable consistency outpaces inspiration over any real distance.",
    keywords: ["hard work", "routine", "reliability"],
    element: "Earth",
    astrology: "Air/Earth",
    numerology: { value: 12, note: "urgent action, through practice" },
  },
  {
    id: "queen-of-pentacles",
    name: "Queen of Pentacles",
    symbol: "♦",
    meaning:
      "Seated among flowering vines with a pentacle cradled in her lap and a rabbit at her feet, this queen tends garden and ledger alike. Water of Earth nurtures practically, making comfort out of attention and steady, ordinary competence.",
    keywords: ["nurturing", "security", "practicality"],
    element: "Earth",
    astrology: "Water/Earth",
    numerology: { value: 13, note: "nurturing mastery, through practice" },
  },
  {
    id: "king-of-pentacles",
    name: "King of Pentacles",
    symbol: "♦",
    meaning:
      "Robed in grapevines on a throne carved with bulls, this king rests one hand on his pentacle with the castle he built behind him. Fire of Earth turns ambition into tangible provision and governs resources with calm, practiced authority.",
    keywords: ["abundance", "mastery", "stewardship"],
    element: "Earth",
    astrology: "Fire/Earth",
    numerology: { value: 14, note: "authority & command, through practice" },
  },
];
