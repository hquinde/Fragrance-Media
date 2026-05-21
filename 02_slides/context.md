# Stage 2 — Slide Creation Context

## Visual reference

**`02_slides/reference/`** — the c16 carousel. This is what a finished carousel looks like.
Check `reference/screenshots/` to see the expected visual output before creating a new one.

## Design system

**Full spec:** `02_slides/source/` (templates, assets, and CSS are here)

## Canvas + fonts

- 1080 × 1920px (9:16, TikTok/Instagram)
- `--sans`: Geist | `--serif`: Instrument Serif | `--mono`: Geist Mono

## Palette

- `--ink`: #f4efe6 (warm off-white)
- `--paper`: #0d0e10 (near-black)
- `--accent`: #ff5b2e (orange-red)
- `--accent-2`: #f0c25a (warm yellow)

## Background photos

Photos are sourced manually from Pinterest and dropped into:
`images/` (top-level project folder — `TrackAI-Media/images/`)

Before running Stage 2, the user downloads images from Pinterest and places them there.
Each image filename should describe its content (e.g. `dirty-engine.jpg`, `cracked-tire.jpg`).

Images are downloaded via `download-images.js` from URLs in `images.md`. Files are named by position: `c1-title`, `c1-s1`, `c1-s2`, `c1-s3`, `c1-s4` for carousel 1; `c2-*` for carousel 2; `c3-*` for carousel 3.

**Matching rule:** Map each slide directly by filename — `c1-title.*` → carousel 1 title slide, `c1-s1.*` → carousel 1 slide 1, etc. No guessing needed. The end slide (06) uses `PhoneEndSlide` — no photo needed.

**In JSX:** reference images as `images/filename.ext` (e.g. `src="images/c1-title.jpeg"`).

## Template files

- JSX template: `02_slides/source/slide-template.jsx`
- HTML template: `02_slides/source/slide-template.html`
- Increment N from the last used carousel number.

## Slide structure (per content slide)

```jsx
<div className="slide">
  <image-slot id="cN-M-bg" shape="rect" src="assets/incoming/photo.jpg"></image-slot>
  <div className="scrim scrim-strong"></div>
  <div className="frame-counter">0M / 06</div>
  <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
    <div className="eyebrow">Slide 0M · Topic</div>
    <h2 className="headline lg serif">Headline<br />goes here.</h2>
    <div className="accent-rule"></div>
    <p className="body wide">One sentence of body copy.</p>
  </div>
</div>
```

## End slide (always)

Off-white background (`#f4efe6`), dark text (`#0d0e10`). No background photo — no scrim.

```jsx
<PhoneEndSlide setup="First line." payoff={<>TrackAI.</>} />
```

`PhoneEndSlide` must use `background: "#f4efe6"` and text color `#0d0e10`. No radial gradient overlay.

## Hard rules

- Never change fonts, colors, or canvas size
- Always exactly 6 slides
- Always use `PhoneEndSlide` for slide 06
- `image-slot` ids must be unique (e.g. `c17-1-bg`, `c17-2-bg`)
- Screenshots exactly 1080×1920px — no scaling
- Save to: `outputs/cN/01-slide.png` through `06-slide.png` (via `node export.js cN` from `02_slides/`)
