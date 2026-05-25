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
Images are downloaded via `download-images.js` from URLs in `images.md`. Files are named by position: `c1-title.jpg`, `c1-fragrance-slug.jpg`, etc.

**Fragrantica card images**
Saved by `fragrantica-cards.js` using the convention: `cN-sN-card.jpg`
- `c1-s1-card.jpg` → carousel 1, slide 1 card
- `c1-s2-card.jpg` → carousel 1, slide 2 card
- etc.

**Matching rule:** Map each slide directly by filename — `c1-title.*` → carousel 1 title slide, `c1-s1-*` → carousel 1 slide 1, etc. No guessing. Every slide needs a background photo and every content slide needs a matching card image.

**In JSX:** reference images as `/images/filename.ext` (absolute path). Use a plain `<img className="slide-bg">` tag, not `image-slot`, so Puppeteer captures the image correctly.

**Template files**
- JSX template: `02_slides/source/slide-template.jsx`
- HTML template: `02_slides/source/slide-template.html`
- Increment N from the last used carousel number.

---

## Slide structure — Design B

Each fragrance gets two slides: a content slide and a Fragrantica card slide. Both share the same background photo.

**Title slide**
```jsx
<div className="slide">
  <img className="slide-bg" src="/images/cN-title.jpg" />
  <div className="scrim scrim-strong"></div>
  <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
    <h1 className="headline xl serif">Title goes<br />here.</h1>
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
    <h2 className="headline lg serif">Fragrance<br />Name.</h2>
    <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
    <p className="body wide">One punchy line.<br />Second punchy line.</p>
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
- Save to: `outputs/N/` (via `node export.js cN` from `02_slides/`)

---

## Task

Read `01_scripts/output.md` before doing anything.
Create all 3 carousels from the 3 scripts in `01_scripts/output.md`.

## Steps

1. **Determine carousel numbers** — check `02_slides/source/carousels/` for the highest existing `cN-slides.jsx`, increment by 1 for each of the 3 carousels.
2. **Check images** — confirm all Pinterest backgrounds (`cN-*.jpg`) and card images (`cN-sN-card.jpg`) are present in `images/`. If any are missing, stop and ask before continuing.
3. **Create JSX files** — for each carousel, copy `02_slides/source/slide-template.jsx`, rename to `cN-slides.jsx`, replace all copy with the script following Design B structure.
4. **Create HTML entry points** — for each carousel, copy `02_slides/source/slide-template.html`, rename to `cN.html`, update `<title>` and script src.
5. **Export PNGs** — run `node export.js cN` from `02_slides/` for each carousel. PNGs save to `outputs/N/`.

## Output

End with exactly this message:
"All 3 carousels are in outputs/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

When the user confirms they're done posting, respond with "Are you sure? This will delete all images, scripts, and exported slides from this batch." and wait for confirmation. Only run the cleanup after they confirm.
1. Empty `outputs/1/`, `outputs/2/`, `outputs/3/` (keep folders)
2. Delete all image files from `images/` (keep `images.md` and `download-images.js` and `fragrantica-cards.js`)
3. Reset `images/images.md` to the blank 3-carousel template
4. Reset `01_scripts/output.md` to its blank header
5. Delete all `cN-slides.jsx` and `cN.html` files from `02_slides/source/carousels/`
