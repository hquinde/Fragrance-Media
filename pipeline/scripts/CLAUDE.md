# Stage 1 — Script Generation

1. Read `data/fragrance-picks.json` and `data/performance.json`. Use `data/performance.json` to inform two things: (a) **title formats and hook categories** from winners/patterns, and (b) **niche tier mix** from the `niche_mix` field on winners vs. failures — higher plays/saves on a given mix means that tier distribution is working. Fragrance selection is always fresh; winners never suggest which fragrances to reuse.
2. Generate 3 scripts based on what worked and what didn't.
   - Never use a fragrance listed in `already_used` in `data/fragrance-picks.json`. Names are generalized — no EDT/EDP/Parfum distinction. If any version is listed, all versions are off limits.
   - Also avoid flankers of any fragrance in `already_used` — different-named entries in the same line (e.g. Eros, Eros Flame, Eros Energy are all off limits if any one is listed). Pick fragrances from different lines/families instead.
   - **Niche tier mix:** Read the `niche_mix` field across winners and interpret which distribution correlates with stronger plays and saves. Use that as the target mix per carousel. Do not apply a fixed rule — let the data decide. If winners consistently show `1 mainstream, 2 mid-niche, 1 deep niche, 1 ultra niche`, reproduce that. If the data shifts over time, shift with it.
   - Niche tiers: Mainstream (Dior, Chanel, YSL, Rabanne, Hugo Boss) → Mid-niche (Amouage, Xerjoff, Initio, Creed, MFK, PdM, Kilian, Maison Margiela Replica, Mancera, Montale) → Deep niche (Roja, Nishane, Nasomatto, Orto Parisi, Bogue Profumo) → Ultra niche/indie (Areej le Doré, Slumberhouse, Tauer, Ensar Oud) → Obscure (Sultan Pasha Attars, micro-batch/bespoke)
3. Before writing scripts, verify every chosen fragrance exists on Fragrantica via web search. Confirm the exact name, brand, and actual notes — use the real notes in slide copy, not guesses.
4. Write the output to `../../checkpoint/output.md` using the format below.
5. Update `../../checkpoint/images.md` (Pinterest URLs only — no fragrantica links) and write `fragrantica-links.md` in this directory (`pipeline/images/fragrantica-links.md`) with all 15 Fragrantica URLs in `cN-sN: URL` format.
6. In `data/fragrance-picks.json`: append all fragrances chosen during generation to `already_used`.
7. In `data/performance.json`: append the 3 new titles to `pending` as objects — `{ "title": "...", "fragrances": ["Brand Fragrance Name", ...], "niche_mix": "X mainstream, X mid-niche, X deep niche, X ultra niche", "date_posted": null }` — with the exact fragrances used and the niche tier count for each carousel.

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
- Slide 1 (Brand - Fragrance Name): https://www.pinterest.com/search/pins/?q=Brand+Fragrance+Name&rs=typed
- Slide 2 (Brand - Fragrance Name): https://www.pinterest.com/search/pins/?q=Brand+Fragrance+Name&rs=typed
- ... one line per slide in the script
```

Leave `Title:` empty — the user pastes the Pinterest background URL there manually.

For each slide, pre-build a Pinterest search URL using the brand + fragrance name (spaces → `+`, drop special characters). The user clicks it, picks an image, and replaces the search URL with the pin URL in place. Never write a placeholder like `[pinterest url]`.

All 3 carousels go in the same file, separated by a blank line.

---

## pipeline/images/fragrantica-links.md format

Write fragrantica links to this separate file — the user never sees it, but `process-images.js` reads it to auto-download card images.

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

Capture these during step 3's verification search. The numeric ID suffix (e.g. `-46038.html`) is required — never leave a line blank.
