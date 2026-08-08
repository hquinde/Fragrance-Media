# Run order

1. Titles confirmed (`../01-creation/`) → pick 15 fragrances (see [workflow.md](workflow.md)) → `check-fragrances.js`
2. Fragrances verified → write copy + scripts.json (see [workflow.md](workflow.md)) → `add-batch.js`
3. Batch registered → ask for Pinterest URLs (see [workflow.md](workflow.md)) → `process-images.js`
4. Assets downloaded → `generate.js` → say exactly: "All 3 carousels are in checkpoint/ and ready to upload. Let me know when you're done posting and I'll clean everything up."
5. User asks to clean up the posts → `cleanup.js`

# Scripts

- **check-fragrances.js** — normalizes fragrance names (strips accents/case) and checks proposed picks against every fragrance ever used (any status). Catches flankers (e.g. "Layton Exclusif" vs "Layton") and accent variants (e.g. "Vetiver" vs "Vétiver"), not just exact matches.
  `node check-fragrances.js "Name 1" "Name 2" ...`

- **add-batch.js** — appends 3 carousels to `../01-creation/carousels.json` as `status: "pending"` entries (with their 15 tagged fragrances). Validates each carousel has a title + exactly 5 fragrances, and each fragrance a valid tier/gender.
  `node add-batch.js batch.json`

- **process-images.js** — downloads `cN-title.jpg` from Pinterest for photo-style carousels, and `cN-sN-bottle.jpg` + `cN-sN-card.jpg` from Fragrantica for every slide, using each slide's `fragranticaUrl` in `scripts.json`. Images land in this folder.
  `node process-images.js "url1" "url2" ...`

- **generate.js** — generates `c1-slides.jsx` / `c2-slides.jsx` / `c3-slides.jsx` from `scripts.json` and exports all 3 carousels to `../checkpoint/` via `export.js`. Aborts with a missing-files list if an image is absent.
  `node generate.js`

- **export.js** — screenshots one carousel's JSX to PNGs in `../checkpoint/`. Used directly when hand-fixing a wrapped headline.
  `node export.js cN`

- **cleanup.js** — deletes PNGs from `../checkpoint/1,2,3` (keeps the folders), downloaded image files in this folder, and `scripts.json`.
  `node cleanup.js`

# Last Updated

- 2026-08-08 — update this date whenever this file is edited.
