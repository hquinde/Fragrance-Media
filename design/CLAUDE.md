# design/

# Purpose

- The carousel design system: slide templates, the render shell, and preview tooling, isolated from pipeline logic and data so template work needs no pipeline context.

# Context

- [CONTEXT.md](CONTEXT.md) — the design system (fonts, colors, slide types), why JSX over plain HTML, and how to add and promote a new template. Start here.

# Assets

- [brand.png](brand.png) — the account's logo; source of the carousel palette and star mark. Color codes: [CONTEXT.md](CONTEXT.md) → Brand.
- [samples/](samples/) — the real Fragrantica bottle/card images + Pinterest title background for `sample-data.js`'s fragrances. Self-contained `CLAUDE.md` describing each image.

# Source

- [base.html](base.html) — the shell: fonts, global CSS, React/Babel CDN loader that fetches and transforms whichever `*-slides.jsx` file `?c=` points to.
- [build-slide.js](build-slide.js) — the slide markup functions: fragrance (single) slides with their headline-sizing and eyebrow-label helpers, and compare (double) slides. Edit this to change slide design; add a new function here for a new slide type/template.

# Data

- [sample-data.js](sample-data.js) — real data from an actual posted batch (not fabricated), used only for preview rendering.

# Scripts

- [preview.js](preview.js) — standalone puppeteer + local server script. Renders exactly 2 slides (title + one content slide) to [preview-output/](preview-output/) (gitignored). `node preview.js` (1 fragrance) or `node preview.js 3` (first 3 fragrances in the one content slide, for testing a denser template).

# Dependencies

- [package.json](package.json) — this folder's own `puppeteer` dependency, kept separate from [../02-pipeline/](../02-pipeline/)'s install.
- [package-lock.json](package-lock.json) — the locked dependency tree for `package.json`.
- [node_modules/](node_modules/) — installed dependencies; gitignored.

# Rules

- Ask if unsure.

# Last Updated

- 2026-11-02 — update this date whenever this file is edited.
