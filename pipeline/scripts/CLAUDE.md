# Stage 1 — Script Generation

**Step 1:** Query performance signals — do not read the full files:
```bash
jq '{winners: .winners, patterns: .patterns}' pipeline/scripts/data/performance.json
```
Use winners/patterns to inform title formats and hook categories. Fragrance selection is always fresh; winners never suggest which fragrances to reuse. Niche tier mix is handled separately in Step 2 (deliberate rotation, not pattern-matching — see below).

Do not pre-load `already_used` names into context — `check-fragrances.js` in Step 2 reloads the full list from `fragrance-picks.json` and checks against it on every run, so there's no need to see it ahead of time. Propose candidates from your own knowledge of the fragrance landscape and let the checker catch conflicts.

**Step 2:** Pick 15 fragrances (5 per carousel) following the exclusion rules and niche mix below. Also determine **gender audience** (men / women / unisex) for each.

Before brainstorming names, check brand saturation so you're not guessing blind — well-known lines from heavily-used brands (Xerjoff, Amouage, Parfums de Marly, Nishane, Creed, Initio, ...) are likely tapped out after 50+ carousels:
```bash
jq -r '.already_used[].brand' pipeline/scripts/data/fragrance-picks.json | sort | uniq -c | sort -rn
```
Lean toward brands with lower counts (or fresh brands) for your candidate list. Before committing to a specific brand, check exactly what's already blocked there:
```bash
jq -r '.already_used[] | select(.brand=="Brand Name") | .name' pipeline/scripts/data/fragrance-picks.json
```

Then verify all 15 before proceeding:
```bash
node pipeline/scripts/check-fragrances.js "Name 1" "Name 2" "Name 3" ...
```
This normalizes names (strips accents/case) and catches substring collisions, so it flags flankers (e.g. "Layton Exclusif" vs "Layton") and accent variants (e.g. "Vetiver" vs "Vétiver"), not just exact matches. "Clean — no conflicts." means all are clean. Swap any conflicts and re-run before continuing.

- Names are generalized — no EDT/EDP/Parfum distinction. If any version is listed, all versions are off limits.
- Also avoid flankers of any fragrance in `already_used` — different-named entries in the same line (e.g. Eros, Eros Flame, Eros Energy are all off limits if any one is listed). Pick fragrances from different lines/families instead.
- **Niche tier mix — deliberately explore, don't just exploit:** `1 mainstream, 2 mid-niche, 1 deep niche, 1 ultra niche` has been used on nearly every carousel to date, so there isn't yet enough variation across different mixes to say which one actually performs best — copying it again just repeats the same non-experiment. "Follow what won" will always lead back to the same dominant mix, since that's what the data mostly contains; someone has to deliberately try under-tested combinations for the data to ever become informative.
  1. Run `jq -r '(.winners + .failures + .pending)[].niche_mix' pipeline/scripts/data/performance.json | sort | uniq -c | sort -rn` to see how many times each mix has been tried (any 5-fragrance combination of the tiers below is fair game, not just ones seen before).
  2. For this batch's 3 carousels, deliberately assign 3 mixes that are under-represented in that count — invent combinations freely rather than picking from a fixed list, as long as they're genuinely different from the most-repeated ones and from each other within the batch.
  3. Once several mixes each have a handful of data points (both winners and failures), analysis can start comparing them for real — until then, treat mix selection as data *collection*, not data-driven optimization.
- Niche tiers: Mainstream (Dior, Chanel, YSL, Rabanne, Hugo Boss) → Mid-niche (Amouage, Xerjoff, Initio, Creed, MFK, PdM, Kilian, Maison Margiela Replica, Mancera, Montale) → Deep niche (Roja, Nishane, Nasomatto, Orto Parisi, Bogue Profumo) → Ultra niche/indie (Areej le Doré, Slumberhouse, Tauer, Ensar Oud) → Obscure (Sultan Pasha Attars, micro-batch/bespoke)

**Step 3 — verify + capture notes, one search per fragrance:** `WebFetch` directly against fragrantica.com returns HTTP 403 (confirmed — Fragrantica blocks direct fetches, both designer and perfume pages), so use `WebSearch` instead: for each of the 15 fragrances, search individually, e.g. `site:fragrantica.com "Brand" "Fragrance Name"`. Confirm it actually exists (exact name + brand) before committing to it — do not invent or guess a name from memory, especially for small indie houses. Capture the exact URL with its numeric ID suffix (e.g. `-46038.html`). Fragrantica's page description usually surfaces the main accords and full note pyramid (top/mid/base) directly in the search results — capture that text now, you'll use it to write copy in Step 4. If a search doesn't clearly return notes for the exact fragrance, run one more targeted search rather than guessing.

If a name doesn't check out (doesn't exist, or turns out to be a flanker/different product than expected), swap in a different fragrance from the same niche tier and re-search before moving on.

**Step 4:** Write [fragrantica-links.md](../images/fragrantica-links.md) and the final [scripts.json](../scripts/data/scripts.json) — titles, fragrance names, brands, genders, and `copy`. Write 1–2 punchy lines of copy per slide now, based on the notes/accords captured in Step 3. If a carousel's title should render as plain centered text on white instead of the default dark-photo-with-scrim look (e.g. the user asks for something minimal/standalone), add `"titleStyle": "minimal"` as a sibling of that carousel's `"title"` — see [pipeline/slides/CLAUDE.md](../slides/CLAUDE.md) for what it does. Omit the field (or use `"photo"`) for the normal look. Default to `"photo"` unless the user asks otherwise.

**Step 5:** Write a scratch `batch.json` (3 carousels × {title, niche_mix, fragrances: [{name, brand}, ...]}) and run:
```bash
node pipeline/scripts/add-batch.js batch.json
```
This appends all 15 fragrances to [fragrance-picks.json](data/fragrance-picks.json) `already_used` and all 3 titles to [performance.json](data/performance.json) `pending` (with `"design": "v2"`) in one step, instead of hand-editing both JSON files.

**Step 6:** Tell the user the 3 titles, then ask for one Pinterest title URL per carousel that is *not* `titleStyle: "minimal"` (in carousel order — a batch with one minimal carousel needs only 2 URLs). Run `node ../images/process-images.js "url1" "url2" ...` from `pipeline/slides/` immediately on paste, passing exactly that many URLs. This downloads the bottle and card images purely as rendering assets for Step 7 — copy is already written, so there's no need to read them.

**Step 7:** Run `node generate.js` from `pipeline/slides/`.

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
2. **Step 6** — output the 3 titles, then: "Paste N Pinterest title URLs." (N = number of non-minimal carousels)
3. **After Step 7** — one line: `Done. Slides in checkpoint/1/, 2/, 3/.`
4. **After "clean up"** — one line: `Done.`

Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.

# Last Updated

- 2026-07-27 — update this date whenever this file is edited.
