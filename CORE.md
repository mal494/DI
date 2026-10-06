# Core dependency

This repo is the **Web** branch of the Divine Insight platform. It does not own
the tarot card data.

The canonical dataset lives in **Divine Insight Core**:

https://github.com/mal494/divine-insight-core

## Pinned version

```
core.version = v1.5
```

`data/tarot_data_v1.5.json` is a vendored copy of `data/tarot_data_v1.5.json`
from the Core v1.5 release.

## Generated deck

`src/data/deck.generated.ts` is built from that dataset by
`scripts/generate-deck.mjs`. Regenerate with:

```
node scripts/generate-deck.mjs
```

The generator takes meaning, keywords, element and astrology from Core. The two
things Core does not carry - the glyph shown on a card face and the short
numerology note - live in `scripts/deck-presentation.json`, which is hand-maintained.

## Rules

1. Never edit card copy in this repo. Card changes land in Core first.
2. Never hand-edit `src/data/deck.generated.ts`. Regenerate it.
3. To take a new dataset: bump `core.version`, copy the file from that Core
   release into `data/`, update the `DATA` path in the generator, rerun it, and
   commit the regenerated deck in the same PR.

## Superseded files

`src/data/major-arcana.ts` and `src/data/minor-arcana.ts` held the previous
hand-written deck. They are no longer imported by `deck.ts` and are kept only
until the generated copy has been reviewed in production.
