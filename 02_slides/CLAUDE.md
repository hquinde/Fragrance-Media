# Stage 2 — Slide Creation

## Context

**Visual reference:** `02_slides/reference/` — the c16 carousel. Check `reference/screenshots/` to see the expected visual output.

**Canvas + fonts**
- 1080 × 1920px (9:16, TikTok/Instagram)
- `--sans`: Geist | `--serif`: Instrument Serif | `--mono`: Geist Mono

**Palette**
- `--ink`: #f4efe6 (warm off-white)
- `--paper`: #0d0e10 (near-black)
- `--accent`: #ff5b2e (orange-red)
- `--accent-2`: #f0c25a (warm yellow)

**Background photos**
Images are downloaded via `download-images.js` from URLs in `images.md`. Files are named by position: `c1-title`, `c1-s1`, `c1-s2`, … for carousel 1; `c2-*` for carousel 2; `c3-*` for carousel 3.

**Matching rule:** Map each slide directly by filename — `c1-title.*` → carousel 1 title slide, `c1-s1.*` → carousel 1 slide 1, etc. No guessing. Every slide needs a background photo.

**In JSX:** reference images as `/images/filename.ext` (absolute path — e.g. `src="/images/c1-initio-absolute-aphrodisiac.jpg"`). Use a plain `<img className="slide-bg">` tag, not `image-slot`, so Puppeteer captures the image correctly.

**Template files**
- JSX template: `02_slides/source/slide-template.jsx`
- HTML template: `02_slides/source/slide-template.html`
- Increment N from the last used carousel number.

**Slide structure (per content slide)**
```jsx
<div className="slide">
  <img className="slide-bg" src="/images/cN-filename.jpg" />
  <div className="scrim scrim-strong"></div>
  <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
    <h2 className="headline lg serif">Headline<br />goes here.</h2>
    <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
    <p className="body wide">One sentence of body copy.</p>
  </div>
</div>
```

**No eyebrows. No frame counters.** Do not include `<div className="eyebrow">` or `<div className="frame-counter">` in any slide — these are not part of the Fragrance Collective design.

**Hard rules**
- Never change fonts, colors, or canvas size
- All slides follow the same content slide structure — slide count is driven by the script
- `image-slot` ids must be unique (e.g. `c17-1-bg`, `c17-2-bg`)
- Screenshots exactly 1080×1920px — no scaling
- Save to: `outputs/cN/01-slide.png` through `06-slide.png` (via `node export.js cN` from `02_slides/`)

---

## Task

Read `01_scripts/output.md` before doing anything.
Create all 3 carousels from the 3 scripts in `01_scripts/output.md`.

## Steps

1. **Determine carousel numbers** — check `02_slides/source/carousels/` for the highest existing `cN-slides.jsx`, increment by 1 for each of the 3 carousels.
2. **List available images** — read all filenames in `02_slides/source/assets/incoming/`.
3. **Match images to slides** — for each carousel, map every slide (title + all content slides) to the best-fitting image. Output the full mapping for all 3 carousels and wait for confirmation before continuing.
4. **Create JSX files** — for each carousel, copy `02_slides/source/slide-template.jsx`, rename to `cN-slides.jsx`, replace all copy with the script. All slides use the same content slide structure — keep all classNames and structure exactly as-is.
5. **Create HTML entry points** — for each carousel, copy `02_slides/source/slide-template.html`, rename to `cN.html`, update `<title>` and script src.
6. **Export PNGs** — run `node export.js cN` from `02_slides/` for each carousel. PNGs save to `outputs/cN/`.

## Output

Confirm: carousel numbers used, total PNG paths created (per carousel count), any photo substitutions made.

Then end with exactly this message:
"All 3 carousels are in outputs/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

When the user confirms they're done posting, respond with "Are you sure? This will delete all images, scripts, and exported slides from this batch." and wait for confirmation. Only run the cleanup after they confirm.
1. Empty `outputs/1/`, `outputs/2/`, `outputs/3/` (keep folders)
2. Delete all image files from `images/` (keep `images.md` and `download-images.js`)
3. Reset `images/images.md` to the blank 3-carousel template
4. Reset `01_scripts/output.md` to its blank header
5. Delete all `cN-slides.jsx` and `cN.html` files from `02_slides/source/carousels/`
