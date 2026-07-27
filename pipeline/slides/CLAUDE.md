# Stage 2 — Slide Creation

## Context

**Canvas + fonts**
- 1080 × 1920px (9:16, TikTok/Instagram)
- Serif: `Cormorant Garamond` (600 weight for headlines)
- Mono: `IBM Plex Mono` (500 for eyebrow, 400 for body)

**Palette**
- Background: `#ffffff` (white)
- Text: `#161310` (near-black)
- No dark overlay, no scrim, no background photos

**Images per slide**
- `cN-title.jpg` — Pinterest background photo for the title slide, downloaded via URL args passed to `process-images.js`
- `cN-sN-bottle.jpg` — fragrance bottle image, centered and flex-fills the middle zone
- `cN-sN-card.jpg` — Fragrantica social card, pinned to the bottom at 560px wide
- All downloaded by `process-images.js`

**Slide structure — title slide (dark photo background, default)**

```
┌──────────────────────────────────────┐
│  [photo background + dark scrim]     │
│                                      │
│                                      │
│                                      │
│  Title text here         (headline)  │  Instrument Serif 400, 132px, #f4efe6
│                                      │
└──────────────────────────────────────┘
```

**Title style variant — `titleStyle: "minimal"`**

Set `"titleStyle": "minimal"` on a carousel in `scripts.json` (sibling of `"title"`) to get a white-background, centered black-text title slide instead — no photo, no scrim:

```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│                                      │
│        Title text here      (centered, both axes)
│                                      │  Cormorant Garamond 600, 64px, #161310
│                                      │
└──────────────────────────────────────┘
```

Carousels with `titleStyle: "minimal"` don't need a `cN-title.jpg` — `resolveImages()` in `generate.js` skips the requirement, and `process-images.js` won't ask for or consume a Pinterest URL for that carousel's slot. Default (omitted, or `"photo"`) is the dark-photo style above. Use this when a title is meant to read as a standalone statement rather than sit over a mood photo.

**Slide structure — fragrance slide (white)**

```
┌──────────────────────────────────────┐
│  BRAND · FOR GENDER      (eyebrow)   │  IBM Plex Mono 500, 25px, 0.30em LS
│  Fragrance Name          (headline)  │  Cormorant Garamond 600, scaled px
│  Copy text here          (body)      │  IBM Plex Mono 400, 28px/1.5, max 720px
│                                      │
│         [bottle image]               │  flex:1, centered, object-fit:contain
│                                      │
│    [  fragrantica card  ]            │  560px wide, border-radius:18px
└──────────────────────────────────────┘
```

**Slide count:** 1 title + N fragrances × 1 = N+1 slides per carousel.

**Headline font scaling** (auto-sized by `generate.js`):
- ≤ 6 chars → 130px
- ≤ 10 chars → 116px
- ≤ 16 chars → 96px
- ≤ 22 chars → 80px
- 23+ chars → 68px

**Hard rules**
- White background only — no photo backgrounds, no scrim
- No separate card slide — bottle + card live on the same slide
- `generate.js` emits inline styles only; `styles.css` provides only `.slide-wrap` dimensions
- Add a manual `<br/>` in the generated JSX if a headline wraps awkwardly, then re-run `node export.js cN`
- Screenshots exactly 1080×1920px

---

## Steps

1. **Process images** — run `node ../images/process-images.js "url1" "url2" ...` from `pipeline/slides/`, passing one Pinterest title URL per carousel that is *not* `titleStyle: "minimal"` (in carousel order). Ask the user for exactly that many URLs. Downloads `cN-title.jpg` from Pinterest for photo-style carousels and `cN-sN-bottle.jpg` + `cN-sN-card.jpg` from Fragrantica for all slides.
2. **Generate + export** — run `node generate.js`. Generates `c1-slides.jsx`, `c2-slides.jsx`, `c3-slides.jsx` from [scripts.json](../scripts/data/scripts.json) and exports all 3 carousels via `export.js`. Aborts with a missing-files list if any image is absent.
3. **Review + tweak (optional)** — if a headline wraps awkwardly, hand-edit the relevant `cN-slides.jsx` (add a `<br/>`) and re-run `node export.js cN`.

## Output

End with exactly this message:
"All 3 carousels are in checkpoint/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

When the user confirms they're done posting, immediately run the cleanup — a single command, not a free-text checklist, since a multi-step instruction here has been silently skipped before:
```bash
node pipeline/scripts/cleanup.js
```
This deletes the PNGs from `checkpoint/1/`, `checkpoint/2/`, `checkpoint/3/` (keeping the folders), all image files from `pipeline/images/` (keeping `process-images.js` and `fragrantica-links.md`), and [scripts.json](../scripts/data/scripts.json).

# Last Updated

- 2026-07-26 — update this date whenever this file is edited.
