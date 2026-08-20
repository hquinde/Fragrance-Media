# Design System — Fragrance Collective Carousels

## Design system

- Fonts: Cormorant Garamond (headlines), Instrument Serif (title-slide photo headline), IBM Plex Mono (eyebrow labels + body copy).
- Colors: `#161310` (near-black text), `#e8e6e0` (page background), `#f4efe6` (title-slide text on photo).
- Slide size: 1080×1920, `.slide-wrap` class in `base.html`.
- Slide types today: title (dark photo bg + gradient scrim + light headline — the only title style; no white/minimal alternative), single (white bg, eyebrow label, name, copy, bottle image, Fragrantica card image), and double (two fragrances stacked with a divider — brand/name, bottle+card images, price on its own centered line; no copy).

## Why JSX, not plain HTML

- The real pipeline templates this way already (JSX strings rendered client-side via a React+Babel CDN load, purely for data interpolation — nothing here is actually interactive). `build-slide.js` keeps that same approach deliberately: a rewrite to plain-HTML placeholder tokens was considered and rejected, since migrating existing templates to a new format is a real risk of introducing subtle breaks, for a benefit (no React dependency) that doesn't matter much when nothing here needs React's actual capabilities.

## Making a new template

- Add a new markup-building function to `build-slide.js` (e.g. a 2-or-3-fragrance-per-slide layout), following the existing style.
- Point `preview.js` at it (or pass it the right slice of `sample-data.js`) to render and check it.
- Promoting a finished template into the real pipeline (i.e. having `02-pipeline/generate.js` actually use it) is a separate, deliberate step — not done automatically. Ask before wiring a new template into the live pipeline.

# Last Updated

- 2026-08-09 — update this date whenever this file is edited.
