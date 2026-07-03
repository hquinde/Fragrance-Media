# Stage 1 — Script Generation

**Step 1:** Query performance signals — do not read the full files:
```bash
# Winners + patterns
jq '{winners: .winners, patterns: .patterns}' pipeline/scripts/data/performance.json
# Already-used names
jq '[.already_used[].name]' pipeline/scripts/data/fragrance-picks.json
```
Use winners/patterns to inform (a) title formats and hook categories and (b) niche tier mix. Fragrance selection is always fresh; winners never suggest which fragrances to reuse.

**Step 2:** Pick 15 fragrances (5 per carousel) following the exclusion rules and niche mix below. Also determine **gender audience** (men / women / unisex) for each. Then verify all 15 before proceeding:
```bash
jq --argjson picks '["Name 1","Name 2","Name 3"]' \
  '[.already_used[].name] as $used | $picks | map(select(. as $p | $used | any(. == $p)))' \
  pipeline/scripts/data/fragrance-picks.json
```
An empty array means all are clean. Swap any conflicts and re-run before continuing.

- Names are generalized — no EDT/EDP/Parfum distinction. If any version is listed, all versions are off limits.
- Also avoid flankers of any fragrance in `already_used` — different-named entries in the same line (e.g. Eros, Eros Flame, Eros Energy are all off limits if any one is listed). Pick fragrances from different lines/families instead.
- **Niche tier mix:** Read the `niche_mix` field across winners and interpret which distribution correlates with stronger plays and saves. Use that as the target mix per carousel. Do not apply a fixed rule — let the data decide. If winners consistently show `1 mainstream, 2 mid-niche, 1 deep niche, 1 ultra niche`, reproduce that. If the data shifts over time, shift with it.
- Niche tiers: Mainstream (Dior, Chanel, YSL, Rabanne, Hugo Boss) → Mid-niche (Amouage, Xerjoff, Initio, Creed, MFK, PdM, Kilian, Maison Margiela Replica, Mancera, Montale) → Deep niche (Roja, Nishane, Nasomatto, Orto Parisi, Bogue Profumo) → Ultra niche/indie (Areej le Doré, Slumberhouse, Tauer, Ensar Oud) → Obscure (Sultan Pasha Attars, micro-batch/bespoke)

**Step 3 — URL search only:** Search Fragrantica once per carousel — batch all 5 fragrance names into a single query, e.g. `site:fragrantica.com "Name A" OR "Name B" OR "Name C" OR "Name D" OR "Name E"`. Confirm each fragrance actually exists (exact name + brand) before committing to it — do not invent or guess a name from memory, especially for small indie houses. Capture the exact URL with its numeric ID suffix (e.g. `-46038.html`) for each. Do NOT read or extract notes from search results — copy is written later from the card images.

**Step 4:** Write [fragrantica-links.md](../images/fragrantica-links.md) and a draft [scripts.json](../scripts/data/scripts.json) with titles, fragrance names, brands, and genders — leave `copy` as `""` for now.

**Step 5:** Update [fragrance-picks.json](data/fragrance-picks.json) `already_used` and [performance.json](data/performance.json) `pending` with `"design": "v2"`.

**Step 6:** Tell the user the 3 titles, then ask for 3 Pinterest title URLs. Run `node ../images/process-images.js "url1" "url2" "url3"` from `pipeline/slides/` immediately on paste.

**Step 7 — Read card images for copy:** Once images are downloaded, read each `pipeline/images/cN-sN-card.jpg` to see the actual note pyramid. Write 1–2 punchy lines of copy per slide based on what the card shows. Update scripts.json with the final copy.

**Step 8:** Run `node generate.js` from `pipeline/slides/`.

---

## [pipeline/images/fragrantica-links.md](../images/fragrantica-links.md) format

Write fragrantica links here — `process-images.js` reads it to auto-download both bottle images and card images.

```
c1-s1: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
c1-s2: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
c1-s3: ...
c1-s4: ...
c1-s5: ...
c2-s1: ...
...
c3-s5: ...
```

The numeric ID suffix (e.g. `-46038.html`) is required — never leave a line blank.

---

## Output rules

Produce user-facing text **only** at these moments:

1. **Stage 0** — ask the performance question if `pending` is non-empty; skip silently if empty.
2. **Step 6** — output the 3 titles, then: "Paste 3 Pinterest title URLs."
3. **After Step 8** — one line: `Done. Slides in checkpoint/1/, 2/, 3/.`
4. **After "clean up"** — one line: `Done.`

Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.
