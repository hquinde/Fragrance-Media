# Design System — Fragrance Collective Carousels

## Brand

- Logo: [brand.png](brand.png) — "Fragrance" / rule / "Collectives" / three stars, black on grey. Every carousel color comes from it; don't introduce colors outside this palette.

| Name  | Hex       | Used for                                                          |
|-------|-----------|-------------------------------------------------------------------|
| Grey  | `#E1E1E1` | Slide background; title-slide headline + rule/stars on the photo |
| Black | `#000000` | All text, rules, stars on grey slides; title-photo scrim (as `rgba(0,0,0,…)`) |

- In code: `BG` / `INK` constants in `build-slide.js` (mirrored in `02-pipeline/generate.js`).

## Design system

- Fonts: Cormorant Garamond (headlines), Instrument Serif (title-slide photo headline), IBM Plex Mono (eyebrow labels + body copy).
- Colors: see Brand above.
- Brand mark: the logo's rule with three stars centered on it (`ruleStars()` in `build-slide.js`) — under the title headline, between copy and bottle on single slides, and as the divider between the two fragrances on double slides. Bottle images use `mix-blend-mode: multiply` so Fragrantica's white JPG backgrounds disappear into the grey.
- Slide size: 1080×1920, `.slide-wrap` class in `base.html`.
- Slide types today: title (dark photo bg + black gradient scrim + grey headline + rule/stars — the only title style; no white/minimal alternative), single (grey bg, eyebrow label, name, copy, rule/stars, bottle image, Fragrantica card image), and double (two fragrances stacked with a rule/stars divider — brand/name, bottle+card images, price on its own centered line; no copy).

## Why JSX, not plain HTML

- The real pipeline templates this way already (JSX strings rendered client-side via a React+Babel CDN load, purely for data interpolation — nothing here is actually interactive). `build-slide.js` keeps that same approach deliberately: a rewrite to plain-HTML placeholder tokens was considered and rejected, since migrating existing templates to a new format is a real risk of introducing subtle breaks, for a benefit (no React dependency) that doesn't matter much when nothing here needs React's actual capabilities.

## Making a new template

- Add a new markup-building function to `build-slide.js` (e.g. a 2-or-3-fragrance-per-slide layout), following the existing style.
- Point `preview.js` at it (or pass it the right slice of `sample-data.js`) to render and check it.
- Promoting a finished template into the real pipeline (i.e. having `02-pipeline/generate.js` actually use it) is a separate, deliberate step — not done automatically. Ask before wiring a new template into the live pipeline.

# Last Updated

- 2026-09-25 — update this date whenever this file is edited.
