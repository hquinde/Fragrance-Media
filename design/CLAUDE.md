# design/

# Purpose

- The carousel design system, isolated from pipeline logic and data. Read this folder alone — no `carousels.json`, no `02-pipeline/` context — when building or iterating on a slide template.
- Not currently wired into `02-pipeline/` — it's a faithful, standalone copy of the real design for experimentation, not (yet) the pipeline's source of truth. See `02-pipeline/generate.js` for what's actually live.

# Context

- [CONTEXT.md](CONTEXT.md) — the design system (fonts, colors, slide types), why JSX over plain HTML, and how to add a new template. Start here.

# Files

- [base.html](base.html) — the shell: fonts, global CSS, React/Babel CDN loader that fetches and transforms whichever `*-slides.jsx` file `?c=` points to.
- [build-slide.js](build-slide.js) — the actual slide markup: `generateCarouselJsx()` + `headlineFontSize()` + `eyebrowLabel()`, copied as-is from `02-pipeline/generate.js`. Edit this to change slide design; add a new function here for a new slide type/template.
- [sample-data.js](sample-data.js) — real data from an actual posted batch (5 fragrances, not fabricated), used only for preview rendering.
- [samples/](samples/) — the real Fragrantica bottle/card images + Pinterest title background for `sample-data.js`'s 5 fragrances. Self-contained `CLAUDE.md` describing each image.
- [preview.js](preview.js) — standalone puppeteer + local server script. Renders exactly 2 slides (title + one content slide) to `preview-output/` (gitignored). `node preview.js` (1 fragrance) or `node preview.js 3` (first 3 fragrances in the one content slide, for testing a denser template).
- `package.json` / `node_modules/` — this folder's own `puppeteer` install, kept separate from `02-pipeline/`'s so this stays genuinely standalone.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
