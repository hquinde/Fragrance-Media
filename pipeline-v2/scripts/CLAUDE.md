# Stage 1 — Script Generation (pipeline-v2, Design v2)

Follow [pipeline-v1/scripts/CLAUDE.md](../../pipeline-v1/scripts/CLAUDE.md) for shared generation rules — fragrance exclusions, niche tier taxonomy, niche mix logic, and performance.json update format. Apply these v2-specific differences and follow the steps below in order:

**Step 1:** Query performance signals — do not read the full files:
```bash
# Winners + patterns (v2-first; v1 entries valid as fallback context)
jq '{winners: [.winners[] | select(.design == "v2")], v1_winners: [.winners[] | select(.design == "v1")], patterns: .patterns}' pipeline-v1/scripts/data/performance.json
# Already-used names
jq '[.already_used[].name]' pipeline-v1/scripts/data/fragrance-picks.json
```

**Step 2:** Pick 15 fragrances (5 per carousel) following niche mix and exclusion rules. Also determine **gender audience** (men / women / unisex) for each. Then verify all 15 before proceeding:
```bash
jq --argjson picks '["Name 1","Name 2","Name 3"]' \
  '[.already_used[].name] as $used | $picks | map(select(. as $p | $used | any(. == $p)))' \
  pipeline-v1/scripts/data/fragrance-picks.json
```
An empty array means all are clean. Swap any conflicts and re-run before continuing.

**Step 3 — URL search only:** Search Fragrantica once per carousel — batch all 5 fragrance names into a single query, e.g. `site:fragrantica.com "Name A" OR "Name B" OR "Name C" OR "Name D" OR "Name E"`. Capture the exact URL with its numeric ID suffix (e.g. `-46038.html`) for each. Do NOT read or extract notes from search results — copy is written later from the card images.

**Step 4:** Write [fragrantica-links.md](../images/fragrantica-links.md) and a draft [scripts.json](../scripts/data/scripts.json) with titles, fragrance names, brands, and genders — leave `copy` as `""` for now.

**Step 5:** Update [fragrance-picks.json](../../pipeline-v1/scripts/data/fragrance-picks.json) `already_used` and [performance.json](../../pipeline-v1/scripts/data/performance.json) `pending` with `"design": "v2"`.

**Step 6:** Tell the user the 3 titles, then ask for 3 Pinterest title URLs. Run `node ../images/process-images.js "url1" "url2" "url3"` from `pipeline-v2/slides/` immediately on paste.

**Step 7 — Read card images for copy:** Once images are downloaded, read each `pipeline-v2/images/cN-sN-card.jpg` to see the actual note pyramid. Write 1–2 punchy lines of copy per slide based on what the card shows. Update scripts.json with the final copy.

**Step 8:** Run `node generate.js` from `pipeline-v2/slides/`.

---

## [pipeline-v2/images/fragrantica-links.md](../images/fragrantica-links.md) format

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
3. **After Step 8** — one line: `Done. Slides in checkpoint/v2/1/, 2/, 3/.`
4. **After "clean up"** — one line: `Done.`

Everything else is silent — no selection reasoning, no confirmation tables, no file-write acknowledgements, no search narration.
