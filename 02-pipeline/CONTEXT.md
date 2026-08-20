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

- **add-batch.js** — appends 3 carousels to `../01-creation/carousels.json` as `status: "pending"` entries (with their tagged fragrances). Validates each carousel has a title + exactly 5 fragrances (10 for a comparison carousel — 5 pairs), and each fragrance a valid tier/gender.
  `node add-batch.js batch.json`

- **process-images.js** — downloads `cN-title.jpg` from Pinterest for every carousel, and `cN-sN-bottle.jpg` + `cN-sN-card.jpg` from Fragrantica for every slide, using each slide's `fragranticaUrl` in `scripts.json`. For a `"contentType": "double"` carousel, downloads both sides of each pair as `cN-sNa-*`/`cN-sNb-*`. Images land in this folder.
  `node process-images.js "url1" "url2" ...`

- **generate.js** — generates `c1-slides.jsx` / `c2-slides.jsx` / `c3-slides.jsx` from `scripts.json` and exports all 3 carousels to `../03-checkpoint/` via `export.js`. Aborts with a missing-files list if an image is absent. Renders a `"contentType": "double"` carousel's slides as price-comparison pairs instead of single fragrances.
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
- `scripts.json` — `{ "carousels": [{ "num", "title", "slides": [{ "num", "name", "brand", "gender", "copy", "fragranticaUrl" }] }] }`. `fragranticaUrl` needs its numeric ID suffix (e.g. `-46038.html`), never blank. Every carousel's title slide is the dark-photo-with-scrim style — there's no alternative title style.
- Optional `"contentType": "double"` on a carousel (default `"single"`) makes its 5 `slides` price-comparison pairs instead of single fragrances: `{ "num", "a": { "brand", "name", "price", "fragranticaUrl" }, "b": { "brand", "name", "price", "fragranticaUrl" } }` — no `copy` field. `price` is a plain display string (e.g. `"$76"`), sourced from a live `WebSearch` at pick time, not stored/tracked. Registering one in `carousels.json` just needs 10 fragrances instead of 5 (see `add-batch.js` above) — no separate flag; the title already says what it is.
- Register — write a scratch `batch.json` (3 carousels × `{title, fragrances: [{fragrance, tier, gender}, ...]}`), then run `add-batch.js`.

## Assets

- Ask for one Pinterest title URL per carousel, in order (3 per batch). List the carousel titles in order alongside the request so the user knows which URL maps to which title: "Paste 3 Pinterest title URLs." followed by the numbered title list.

Column/type map of `carousels.json`: `../01-creation/schema.md`.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
