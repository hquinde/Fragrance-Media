# TrackAI — TikTok Carousel Generator

## What this is
A system for generating TrackAI social media carousels (1080×1920, TikTok/Instagram 9:16 format).
Each carousel is 6 slides: 1 hook + 4 content slides + 1 end slide with the TrackAI app mockup.

## Your job when given a script
1. Create a new JSX slide file based on the script content
2. Wire it into a new HTML entry point
3. Export all 6 slides as PNG screenshots (1080×1920 each)

---

## Workflow — step by step

### Step 1 — Receive the script
The user will paste a 6-slide script in this format:
```
Title slide: [Title]
Slide 1 — [Header]: [One sentence]
Slide 2 — [Header]: [One sentence]
Slide 3 — [Header]: [One sentence]
Slide 4 — [Header]: [One sentence]
CTA slide: [4–6 word CTA ending in "TrackAI."]
```

### Step 2 — Pick or assign background photos
Each content slide needs a background photo from `source/assets/repairs/`.
Available: `cover.jpeg`, `coolant.jpeg`, `filter.jpeg`, `brakes.jpeg`, `tires.jpeg`
Match photo to topic. If the topic doesn't match any photo, note it and use the closest one.

### Step 3 — Create the slide file
Copy `source/c16-slides.jsx` as your starting template.
Name the new file: `source/c[N]-slides.jsx` (increment N from c16).
Replace all copy (headlines, eyebrows, body text, CTA) with the new script.
Keep all classNames, structure, and the `PhoneEndSlide` end slide exactly as-is.

### Step 4 — Create the HTML entry point
Copy `source/c16.html` as your starting template.
Name it: `source/c[N].html`
Update the `<title>` and the script src to point to your new JSX file.

### Step 5 — Export PNGs
Use Puppeteer (or playwright) to open the HTML file in a headless browser.
Capture each `.slide-wrap` element at exactly 1080×1920px.
Save to: `screenshots/c[N]/01-slide.png` through `06-slide.png`

---

## File map
```
design_handoff_c16/
├── CLAUDE.md                        ← you are here
├── screenshots/                     ← visual reference for c16
│   ├── 01-slide.png … 06-slide.png
└── source/
    ├── c16.html                     ← HTML entry point (template)
    ├── c16-slides.jsx               ← 6-slide component (template)
    ├── styles.css                   ← design tokens + layout primitives
    ├── carousel-end.css             ← end slide (app mockup) styles
    ├── end-slide.css                ← end slide layout
    ├── image-slot.js                ← custom element for background photos
    ├── ios-frame.jsx                ← iOS device frame component
    ├── trackai-screens.jsx          ← app screen components for end slide
    ├── trackai-app.css              ← app screen styles
    └── assets/
        ├── repairs/                 ← background photos for content slides
        │   ├── cover.jpeg
        │   ├── coolant.jpeg
        │   ├── filter.jpeg
        │   ├── brakes.jpeg
        │   └── tires.jpeg
        └── trackai-phone.png        ← phone asset used in end slide
```

---

## Design system — do not change these

**Canvas:** 1080 × 1920px (9:16, TikTok/Instagram)

**Fonts (loaded from Google Fonts in the HTML):**
- `--sans`: Geist — headlines, body
- `--serif`: Instrument Serif — italic accent headlines
- `--mono`: Geist Mono — eyebrows, labels

**Palette:**
- `--ink`: #f4efe6 (warm off-white)
- `--paper`: #0d0e10 (near-black)
- `--accent`: #ff5b2e (orange-red)
- `--accent-2`: #f0c25a (warm yellow)

**Key classes:**
- `.slide` — full-canvas container
- `.slide-wrap` — the 1080×1920 capture target
- `.content.top / .center / .bottom` — content position
- `.eyebrow` — mono uppercase label (uses `--accent` color)
- `.headline.xl / .lg` — large display type
- `.subhead` — secondary heading
- `.body.wide` — body copy
- `.scrim / .scrim-strong / .scrim-top` — photo overlay gradients
- `.frame-counter` — "01 / 06" label
- `.accent-rule` — thin horizontal divider line

**Slide structure (every content slide):**
```jsx
<div className="slide">
  <image-slot id="unique-id" shape="rect" src="assets/repairs/photo.jpeg"></image-slot>
  <div className="scrim scrim-strong"></div>
  <div className="frame-counter">0N / 06</div>
  <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
    <div className="eyebrow">Realization 0N · Topic</div>
    <h2 className="headline lg serif">Headline<br />goes here.</h2>
    <div className="accent-rule"></div>
    <p className="body wide">One sentence of body copy.</p>
  </div>
</div>
```

**End slide — always use `PhoneEndSlide`:**
```jsx
<PhoneEndSlide setup="First line." payoff={<>TrackAI.</>} />
```
The `setup` prop is the line above the CTA. `payoff` is always `TrackAI.`

---

## Rules
- Never change fonts, colors, or canvas size
- Never add slides — always exactly 6
- Always use `PhoneEndSlide` for slide 06
- Each content slide gets exactly one background photo
- `image-slot` ids must be unique per carousel (e.g. `c17-1-bg`, `c17-2-bg`)
- Screenshots must be exactly 1080×1920px — no scaling
