# Workflow — judgment calls with no script

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

- Ask for one Pinterest title URL per carousel that isn't `titleStyle: "minimal"` (in order — a batch with one minimal carousel needs only 2 URLs): "Paste N Pinterest title URLs."

Column/type map of `carousels.json`: [../01-creation/schema.md](../01-creation/schema.md).

# Last Updated

- 2026-08-08 — update this date whenever this file is edited.
