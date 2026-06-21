# Stage 2 — Slide Creation

## Context

**Canvas + fonts**
- 1080 × 1920px (9:16, TikTok/Instagram)
- `--sans`: Geist | `--serif`: Instrument Serif | `--mono`: Geist Mono

**Palette**
- `--ink`: #f4efe6 (warm off-white)
- `--paper`: #0d0e10 (near-black)
- `--accent`: #ff5b2e (orange-red)
- `--accent-2`: #f0c25a (warm yellow)

**Background photos**
Images are downloaded via `../images/download-images.js` from URLs in `../../checkpoint/images.md`. Files are named by position: `c1-title.jpg`, `c1-fragrance-slug.jpg`, etc.

**Fragrantica card images**
Normalized by `../images/process-images.js` to the convention: `cN-sN-card.jpg`
- `c1-s1-card.jpg` → carousel 1, slide 1 card
- `c1-s2-card.jpg` → carousel 1, slide 2 card
- etc.

**Matching rule:** Map each slide directly by filename — `c1-title.*` → carousel 1 title slide, `c1-s1-*` → carousel 1 slide 1, etc. No guessing. Every slide needs a background photo and every content slide needs a matching card image.

**In JSX:** reference images as `/images/filename.ext` (absolute path). Use a plain `<img className="slide-bg">` tag, not `image-slot`, so Puppeteer captures the image correctly.

**Fixtures**
- Carousel numbers are fixed: every batch is c1, c2, c3.
- `source/carousels/c1.html`, `c2.html`, `c3.html` are permanent — never regenerated or deleted. Each loads `styles.css`, React/Babel from CDN, and its `cN-slides.jsx`.
- `generate.js` builds `cN-slides.jsx` directly from `../../checkpoint/output.md` — no separate template file.

---

## Slide structure — Design B

Each fragrance gets two slides: a content slide and a Fragrantica card slide. Both share the same background photo.

**Text wrapping:** `.headline` uses `text-wrap: balance` and `.body`/`.body.wide` use `text-wrap: pretty` with a `max-width`, so the browser auto-wraps titles, names, and copy by default. `generate.js` emits plain text with no `<br/>`. Only add a manual `<br/>` afterward if a specific rendered slide wraps awkwardly (see Steps below) — it's the exception, not the rule.

**Title slide**
```jsx
<div className="slide">
  <img className="slide-bg" src="/images/cN-title.jpg" />
  <div className="scrim scrim-strong"></div>
  <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
    <h1 className="headline xl serif">Title goes here.</h1>
  </div>
</div>
```

**Content slide (one per fragrance)**
```jsx
<div className="slide">
  <img className="slide-bg" src="/images/cN-fragrance-slug.jpg" />
  <div className="scrim scrim-strong"></div>
  <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
    <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Brand Name</p>
    <h2 className="headline lg serif">Fragrance Name.</h2>
    <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
    <p className="body wide">One punchy line. Second punchy line.</p>
  </div>
</div>
```

**Card slide (one per fragrance, immediately after its content slide)**
```jsx
<div className="slide">
  <img className="slide-bg" src="/images/cN-fragrance-slug.jpg" />
  <div className="scrim scrim-strong"></div>
  <div className="content center" style={{ padding: "96px" }}>
    <img src="/images/cN-sN-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
  </div>
</div>
```

**Slide count:** 1 title + (5 fragrances × 2) = 11 slides per carousel.

**Hard rules**
- Never change fonts, colors, or canvas size
- No `<div className="eyebrow">` or `<div className="frame-counter">` — not part of this design
- `<img className="slide-bg">` not `image-slot` — Puppeteer requires it
- Card slide always uses the same background photo as its content slide
- Screenshots exactly 1080×1920px — no scaling
- Save to: `checkpoint/1/`, `checkpoint/2/`, `checkpoint/3/` (via `node export.js cN` from `pipeline/slides/`), named `NN-slide.png`

---

## Task

Read `../../checkpoint/output.md` before doing anything.
Create all 3 carousels from the 3 scripts in `../../checkpoint/output.md`.

## Steps

1. **Process images** — run `node ../images/process-images.js` (downloads Pinterest backgrounds, converts non-jpg backgrounds to `.jpg`, normalizes Fragrantica card images to `cN-sN-card.jpg`).
2. **Generate + export** — run `node generate.js`. This generates `c1-slides.jsx`, `c2-slides.jsx`, `c3-slides.jsx` from `../../checkpoint/output.md` and the resolved images, then exports all 3 carousels via `export.js`. If any background or card image is missing, it aborts and lists exactly what's missing — fix `../images/` and re-run.
3. **Review + tweak (optional)** — look at the exported PNGs in `../../checkpoint/`. If a headline, name, or copy line wraps awkwardly, hand-edit the relevant `cN-slides.jsx` (add a `<br/>` at the desired break) and re-run `node export.js cN` for just that carousel.

## Output

End with exactly this message:
"All 3 carousels are in checkpoint/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

When the user confirms they're done posting, immediately run the cleanup:
1. Delete all files from `checkpoint/1/`, `checkpoint/2/`, and `checkpoint/3/` (keep the folders)
2. Delete all image files from `../images/` (keep `download-images.js` and `process-images.js`)
3. Reset `checkpoint/images.md` to the blank 3-carousel template
4. Reset `checkpoint/output.md` to its blank header
