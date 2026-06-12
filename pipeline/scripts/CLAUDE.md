# Stage 1 — Script Generation

1. Read `data/fragrance-picks.json` and `data/performance.json`. Use `data/performance.json` for winners, failures, patterns, and pending. Skip winners/failures if `../../checkpoint/ideas.md` fills all 3 slots.
2. Generate 3 scripts based on what worked and what didn't.
   - Never use a fragrance listed in `already_used` in `data/fragrance-picks.json`. Names are generalized — no EDT/EDP/Parfum distinction. If any version is listed, all versions are off limits.
   - Also avoid flankers of any fragrance in `already_used` — different-named entries in the same line (e.g. Eros, Eros Flame, Eros Energy are all off limits if any one is listed). Pick fragrances from different lines/families instead.
   - Distribute niche levels across the 3 carousels — don't default to all-mainstream. Each batch must include at least one fragrance from each of the first three tiers: Mainstream, Mid-niche, and Deep niche. Ultra niche and Obscure are encouraged bonuses. Vary the mix batch to batch so the channel doesn't feel predictable.
   - Niche tiers: Mainstream (Dior, Chanel, YSL) → Mid-niche (Amouage, Xerjoff, Initio) → Deep niche (Roja, Nishane, Nasomatto) → Ultra niche/indie (Areej le Doré, Slumberhouse, Bogue Profumo) → Obscure (Sultan Pasha Attars, Ensar Oud, micro-batch/bespoke)
3. Before writing scripts, verify every chosen fragrance exists on Fragrantica via web search. Confirm the exact name, brand, and actual notes — use the real notes in slide copy, not guesses.
4. Write the output to `../../checkpoint/output.md` using the format below.
5. Update `../../checkpoint/images.md` using the format below.
6. In `data/fragrance-picks.json`: append all fragrances chosen during generation to `already_used`.

---

## checkpoint/output.md format

```
## Carousel N — "Title"

**Format:** [pattern name]

**Title slide:** [title text]

**Slide 1 — Fragrance Name**
Brand: Brand Name
Copy: [one or two punchy lines]

**Slide 2 — Fragrance Name**
...
```

---

## checkpoint/images.md format

```
## Carousel N — Title

- Title:
- Slide 1 (Brand - Fragrance Name):
  fragrantica link: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
- Slide 2 (Brand - Fragrance Name):
  fragrantica link: https://www.fragrantica.com/perfume/Brand/Fragrance-Name-12345.html
- ... one line per slide in the script
```

Leave the space after `Title:` empty — the user pastes the Pinterest URL there. Never write a `[pinterest url]` placeholder or a pre-named `cN-sN-card.jpg` placeholder.

The `fragrantica link:` line must be filled in by the agent with the exact Fragrantica product page URL for that fragrance (including its numeric ID suffix, e.g. `-63062.html`). Capture this URL during step 3's Fragrantica verification search and write it directly into `images.md` — never leave it blank.

Each slide label includes the brand name (`Brand - Fragrance Name`) so the full name is searchable when sourcing Pinterest images.

`pipeline/images/process-images.js` uses the `fragrantica link:` URL to auto-download that fragrance's Fragrantica card image directly to `cN-sN-card.jpg` (e.g. `c1-s1-card.jpg` for carousel 1, slide 1) — no manual screenshot needed.

All 3 carousels go in the same file, separated by a blank line.
