# Stage 2 — Slide Creation Prompt

## Task

Read `context.md` and `01_scripts/output.md` before doing anything.
Create all 3 carousels from the 3 scripts in `01_scripts/output.md`.

## Steps

1. **Determine carousel numbers** — check `02_slides/source/` for the highest existing `cN-slides.jsx`, increment by 1 for each of the 3 carousels.
2. **List available images** — read all filenames in `02_slides/source/assets/incoming/`.
3. **Match images to slides** — for each carousel, map all 5 slides (1 title + 4 content) to the best-fitting image. Output the full mapping for all 3 carousels and wait for confirmation before continuing.
4. **Create JSX files** — for each carousel, copy `02_slides/source/slide-template.jsx`, rename to `cN-slides.jsx`, replace all copy with the script. Keep all classNames, structure, and `PhoneEndSlide` exactly as-is. Use the reference file `02_slides/reference/source/c16-slides.jsx` as the authoritative structural example.
5. **Create HTML entry points** — for each carousel, copy `02_slides/source/slide-template.html`, rename to `cN.html`, update `<title>` and script src.
6. **Export PNGs** — run `node export.js cN` from `02_slides/` for each carousel. PNGs save to `outputs/cN/`.

## Output

Confirm: carousel numbers used, 18 PNG paths created (6 per carousel), any photo substitutions made.

Then end with exactly this message:
"All 3 carousels are in outputs/ and ready to upload. Let me know when you're done posting and I'll clean everything up."

When the user confirms they're done posting, respond with "Are you sure? This will delete all images, scripts, and exported slides from this batch." and wait for confirmation. Only run the cleanup after they confirm.
1. Empty `outputs/1/`, `outputs/2/`, `outputs/3/` (keep folders)
2. Delete all image files from `images/` (keep `images.md` and `download-images.js`)
3. Reset `images/images.md` to the blank 3-carousel template
4. Reset `01_scripts/output.md` to its blank header
5. Delete all `cN-slides.jsx` and `cN.html` files from `02_slides/source/carousels/`
