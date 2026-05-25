# Stage 1 — Script Generation

1. Read `fragrance-picks.md`. Also read `winners.md` and `failures.md` unless `ideas.md` fills all 3 slots.
2. Generate 3 scripts based on what worked and what didn't. If `fragrance-picks.md` has entries in the "To Feature" table, include at least one of those fragrances across the 3 scripts. Prioritize picks that fit naturally into a high-performing format.
   - Never use a fragrance listed in the "Already Used" section of `fragrance-picks.md`.
   - Distribute niche levels across the 3 carousels — don't default to all-mainstream. Each batch must include at least one fragrance from each of the first three tiers: Mainstream, Mid-niche, and Deep niche. Ultra niche and Obscure are encouraged bonuses. Vary the mix batch to batch so the channel doesn't feel predictable.
   - Niche tiers: Mainstream (Dior, Chanel, YSL) → Mid-niche (Amouage, Xerjoff, Initio) → Deep niche (Roja, Nishane, Nasomatto) → Ultra niche/indie (Areej le Doré, Slumberhouse, Bogue Profumo) → Obscure (Sultan Pasha Attars, Ensar Oud, micro-batch/bespoke)
3. Write the output to `output.md` using the format below.
4. Update `images/images.md` using the format below.
5. In `fragrance-picks.md`: move any used "To Feature" entries to "Already Used", and append all other fragrances chosen during generation to "Already Used" as well.

---

## output.md format

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

## images.md format

```
## Carousel N — Title

- Title: [pinterest url]
- Slide 1 (Fragrance Name): [pinterest url]
  fragrantica: c1-s1-card.jpg
- Slide 2 (Fragrance Name): [pinterest url]
  fragrantica: c1-s2-card.jpg
- ... one line per slide in the script
```

The `fragrantica:` line under each slide is filled in after running `fragrantica-cards.js`. Card images are named `cN-sN-card.jpg` (e.g. `c1-s1-card.jpg` for carousel 1, slide 1).

All 3 carousels go in the same file, separated by a blank line.
