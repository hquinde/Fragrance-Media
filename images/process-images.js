#!/usr/bin/env node
// Normalizes images/ for Stage 2 after images.md is filled in:
//   1. Downloads Pinterest backgrounds (via download-images.js)
//   2. Converts any non-jpg backgrounds (png, heic, etc.) to .jpg
//   3. Renames Fragrantica card images referenced in images.md to cN-sN-card.jpg
//
// Usage: node process-images.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = __dirname;
const IMAGES_MD = path.join(IMAGES_DIR, 'images.md');

function downloadBackgrounds() {
  console.log('Downloading Pinterest backgrounds...\n');
  execSync('node download-images.js', { cwd: IMAGES_DIR, stdio: 'inherit' });
}

function convertBackgrounds() {
  console.log('\nConverting non-jpg backgrounds...');
  const jpgExts = new Set(['.jpg', '.jpeg']);
  let converted = 0;

  for (const entry of fs.readdirSync(IMAGES_DIR)) {
    if (!/^c\d+-/.test(entry)) continue;
    if (/-card\.jpg$/i.test(entry)) continue;

    const ext = path.extname(entry).toLowerCase();
    if (jpgExts.has(ext)) continue;

    const inPath = path.join(IMAGES_DIR, entry);
    const outPath = path.join(IMAGES_DIR, path.basename(entry, ext) + '.jpg');
    try {
      execSync(`sips -s format jpeg "${inPath}" --out "${outPath}"`, { stdio: 'pipe' });
      fs.unlinkSync(inPath);
      console.log(`  ${entry} -> ${path.basename(outPath)}`);
      converted++;
    } catch (err) {
      console.error(`  ! Failed to convert ${entry}: ${err.message}`);
    }
  }

  if (!converted) console.log('  Nothing to convert.');
}

// Parses `## Carousel N` / `- Slide M (Label): ...` / `  fragrantica: ...` blocks.
function parseFragranticaSlides(md) {
  const slides = [];
  let carousel = 0;
  let pendingSlide = null;

  for (const raw of md.split('\n')) {
    const line = raw.trim();

    const cm = line.match(/^## Carousel (\d+)/);
    if (cm) { carousel = parseInt(cm[1], 10); pendingSlide = null; continue; }

    const sm = line.match(/^-\s+slide\s+(\d+)\s*\(([^)]+)\)/i);
    if (sm) {
      pendingSlide = { carousel, slide: parseInt(sm[1], 10), label: sm[2].trim(), refs: [] };
      slides.push(pendingSlide);
      continue;
    }

    const fm = line.match(/^fragrantica:\s*(.+)$/i);
    if (fm && pendingSlide) {
      const mdLinks = [...fm[1].matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m => m[1].trim());
      pendingSlide.refs = mdLinks.length ? mdLinks : [fm[1].trim()].filter(Boolean);
      continue;
    }

    if (line && !line.startsWith('-') && !line.startsWith('#')) pendingSlide = null;
  }

  return slides;
}

function normalizeCards() {
  console.log('\nNormalizing Fragrantica card images...');
  if (!fs.existsSync(IMAGES_MD)) {
    console.error('  ! images.md not found — skipping.');
    return;
  }

  const slides = parseFragranticaSlides(fs.readFileSync(IMAGES_MD, 'utf8'));
  let renamed = 0;

  for (const { carousel, slide, label, refs } of slides) {
    const outName = `c${carousel}-s${slide}-card.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);

    if (!refs.length) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragrantica reference in images.md`);
      continue;
    }

    const source = refs[0];
    const sourcePath = path.join(IMAGES_DIR, source);

    if (path.resolve(sourcePath) === path.resolve(outPath)) {
      if (!fs.existsSync(outPath)) {
        console.warn(`  ! ${label} (C${carousel} S${slide}): "${outName}" not found in images/`);
      }
    } else if (fs.existsSync(outPath)) {
      // Already normalized in a previous run — raw-named source may be gone, that's fine.
    } else if (!fs.existsSync(sourcePath)) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): source "${source}" not found in images/`);
    } else {
      fs.copyFileSync(sourcePath, outPath);
      console.log(`  ${source} -> ${outName}`);
      renamed++;
    }

    // Remove leftover raw-named files (all alt options) now that the card is normalized.
    for (const ref of refs) {
      const refPath = path.join(IMAGES_DIR, ref);
      if (path.resolve(refPath) === path.resolve(outPath)) continue;
      if (fs.existsSync(refPath)) {
        try { fs.unlinkSync(refPath); } catch {}
      }
    }
  }

  if (!renamed) console.log('  Nothing to rename.');
}

function run() {
  downloadBackgrounds();
  convertBackgrounds();
  normalizeCards();
  console.log('\nDone. images/ is ready for 02_slides/generate.js');
}

run();
