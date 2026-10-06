# Core dependency

This repo is the **Web** branch of the Divine Insight platform. It does not own
the tarot card data.

The canonical dataset lives in **Divine Insight Core**:

https://github.com/mal494/divine-insight-core

## Pinned version

```
core.version = v1.6.1
```

That is deck 4.6.1, schema 1.6.1. Core v1.6 added a `short_description` field
to every card; the generator does not read it yet, so the site's `TarotCard`
type is unchanged.

This repo keeps no copy of the dataset. `scripts/generate-deck.mjs` fetches it
from the public Core repo at the tag in `core.version`:

```
https://raw.githubusercontent.com/mal494/divine-insight-core/<tag>/data/tarot_data_v1.6.1.json
```

## Generated deck

`src/data/deck.generated.ts` is built by that script and committed, so the app
build itself needs no network. Regenerate with:

```
node scripts/generate-deck.mjs
```

The generator takes meaning, keywords, element, astrology, arcana and suit from
Core. The two things Core does not carry - the glyph shown on a card face and
the short numerology note - live in `scripts/deck-presentation.json`, which is
hand-maintained.

It fails loudly on a wrong card count, a duplicate id, or a card missing
meaning, keywords, glyph or numerology note.

## Rules

1. Never edit card copy in this repo. Card changes land in Core first.
2. Never hand-edit `src/data/deck.generated.ts`. Regenerate it.
3. To take a new dataset: cut the Core release, bump `core.version`, update
   `DATASET` in the generator if the filename changed, rerun it, and commit the
   regenerated deck in the same PR.
