# 02 — Fragrance Selection Through Cleanup

## Run order

1. Titles confirmed (`../01-creation/`) → pick 15 fragrances (see Fragrance selection below) → `check-fragrances.js`
2. Fragrances verified → write copy + scripts.json (see Copy + registration below) → `add-batch.js`
3. Batch registered → ask for Pinterest URLs (see Assets below) → `process-images.js`
4. Assets downloaded → `generate.js` → say exactly: "All 3 carousels are in 03-checkpoint/ and ready to upload. Let me know when you're done posting and I'll clean everything up."
5. User asks to clean up the posts → `cleanup.js`

## Scripts

- **check-fragrances.js** — normalizes fragrance names (strips accents/case) and checks proposed picks against every fragrance ever used (any status). Catches flankers (e.g. "Layton Exclusif" vs "Layton") and accent variants (e.g. "Vetiver" vs "Vétiver"), not just exact matches.
  `node check-fragrances.js "Name 1" "Name 2" ...`

- **add-batch.js** — appends 3 carousels to `../01-creation/carousels.json` as `status: "pending"` entries (with their 15 tagged fragrances). Validates each carousel has a title + exactly 5 fragrances, and each fragrance a valid tier/gender.
  `node add-batch.js batch.json`

- **process-images.js** — downloads `cN-title.jpg` from Pinterest for photo-style carousels, and `cN-sN-bottle.jpg` + `cN-sN-card.jpg` from Fragrantica for every slide, using each slide's `fragranticaUrl` in `scripts.json`. Images land in this folder.
  `node process-images.js "url1" "url2" ...`

- **generate.js** — generates `c1-slides.jsx` / `c2-slides.jsx` / `c3-slides.jsx` from `scripts.json` and exports all 3 carousels to `../03-checkpoint/` via `export.js`. Aborts with a missing-files list if an image is absent.
  `node generate.js`

- **export.js** — screenshots one carousel's JSX to PNGs in `../03-checkpoint/`. Used directly when hand-fixing a wrapped headline.
  `node export.js cN`

- **cleanup.js** — deletes PNGs from `../03-checkpoint/1,2,3` (keeps the folders), downloaded image files in this folder, and `scripts.json`.
  `node cleanup.js`

## Fragrance selection

- Don't pre-load excluded names into context — propose from your own knowledge; `check-fragrances.js` catches conflicts.
- Brand saturation — heavily-used brands (Xerjoff, Amouage, Parfums de Marly, Nishane, Creed, Initio, ...) are likely tapped out after 50+ carousels. Check counts via `jq -r '.carousels[].fragrances[].fragrance' ../01-creation/carousels.json | grep -ci "Brand Name"`, lean toward lower-count or fresh brands.
- Tier mix — don't default to `1 mainstream, 2 mid-niche, 1 deep-niche, 1 ultra-niche`; it's been used on nearly every carousel, so that data is still collection, not optimization. Check history via `jq -r '.carousels[] | [.fragrances[].tier] | group_by(.) | map("\(length) \(.[0])") | join(", ")' ../01-creation/carousels.json | sort | uniq -c | sort -rn` and assign 3 under-represented mixes for this batch.
- Niche tiers: Mainstream (Dior, Chanel, YSL, Rabanne, Hugo Boss) → Mid-niche (Amouage, Xerjoff, Initio, Creed, MFK, PdM, Kilian, Maison Margiela Replica, Mancera, Montale) → Deep niche (Roja, Nishane, Nasomatto, Orto Parisi, Bogue Profumo) → Ultra niche/indie (Areej le Doré, Slumberhouse, Tauer, Ensar Oud) → Obscure (Sultan Pasha Attars, micro-batch/bespoke).
- Verify existence, one `WebSearch` per fragrance (`WebFetch` on fragrantica.com returns 403). Confirm exact name + brand before committing; don't invent or guess from memory. Capture the URL with its numeric ID suffix (e.g. `-46038.html`).
- If a name doesn't check out, swap in another fragrance from the same tier and re-verify.

## Copy + registration

- Write copy — 1–2 punchy lines of slide copy per fragrance, from your own knowledge.
- `scripts.json` — `{ "carousels": [{ "num", "title", "slides": [{ "num", "name", "brand", "gender", "copy", "fragranticaUrl" }] }] }`. `fragranticaUrl` needs its numeric ID suffix (e.g. `-46038.html`), never blank. Optional `"titleStyle": "minimal"` renders a centered black-on-white title slide instead of the default dark-photo-with-scrim. Default `"photo"`.
- Register — write a scratch `batch.json` (3 carousels × `{title, fragrances: [{fragrance, tier, gender}, ...]}`), then run `add-batch.js`.

## Assets

- Ask for one Pinterest title URL per carousel that isn't `titleStyle: "minimal"` (in order — a batch with one minimal carousel needs only 2 URLs). List the carousel titles in order alongside the request so the user knows which URL maps to which title: "Paste N Pinterest title URLs." followed by the numbered title list.

Column/type map of `carousels.json`: `../01-creation/schema.md`.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
