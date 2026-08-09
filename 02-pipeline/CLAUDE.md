# 02-pipeline/

# Purpose

- Everything after titles are confirmed: picking fragrances, copy, assets, render, cleanup. No phase-per-folder here — one folder of scripts plus a single context doc.

# Context

- [CONTEXT.md](CONTEXT.md) — run order, the judgment calls with no script (fragrance selection, copy + registration, assets), and what each script does. Start here.

# Scripts

- [check-fragrances.js](check-fragrances.js) — normalizes fragrance names and checks proposed picks against every fragrance ever used, catching flankers and accent variants.
- [add-batch.js](add-batch.js) — appends 3 carousels to `../01-creation/carousels.json` as pending entries.
- [process-images.js](process-images.js) — downloads Pinterest title backgrounds + Fragrantica bottle/card images.
- [generate.js](generate.js) — generates the 3 carousels' JSX from `scripts.json` and exports all of them to `../03-checkpoint/`.
- [export.js](export.js) — screenshots one carousel's JSX to PNGs; used directly for hand-fixing a single wrapped headline.
- [cleanup.js](cleanup.js) — deletes exported PNGs, downloaded images, and `scripts.json` after a batch is posted.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
