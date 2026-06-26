#!/usr/bin/env node
// Normalizes pipeline/images/ for Stage 2 after checkpoint/images.md is filled in:
//   1. Downloads Pinterest backgrounds (via download-images.js)
//   2. Converts any non-jpg backgrounds (png, heic, etc.) to .jpg
//   3. Downloads each slide's Fragrantica card image (via fragrantica link:) to cN-sN-card.jpg
//
// Usage: node process-images.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = __dirname;
const IMAGES_MD = path.join(IMAGES_DIR, '..', '..', 'checkpoint', 'images.md');

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

// Parses `## Carousel N` / `- Slide M (Label): ...` blocks from images.md (labels only, no fragrantica links).
function parseSlideLabels(md) {
  const slides = [];
  let carousel = 0;

  for (const raw of md.split('\n')) {
    const line = raw.trim();
    const cm = line.match(/^## Carousel (\d+)/);
    if (cm) { carousel = parseInt(cm[1], 10); continue; }
    const sm = line.match(/^-\s+slide\s+(\d+)\s*\(([^)]+)\)/i);
    if (sm) slides.push({ carousel, slide: parseInt(sm[1], 10), label: sm[2].trim() });
  }

  return slides;
}

// Loads fragrantica links from pipeline/images/fragrantica-links.md (format: `c1-s1: https://...`)
// Falls back to reading `fragrantica link:` lines from images.md for backward compatibility.
function loadFragranticaLinks() {
  const linksFile = path.join(IMAGES_DIR, 'fragrantica-links.md');

  if (fs.existsSync(linksFile)) {
    const links = {};
    for (const line of fs.readFileSync(linksFile, 'utf8').split('\n')) {
      const m = line.match(/^c(\d+)-s(\d+):\s*(.+)$/i);
      if (m) links[`${m[1]}-${m[2]}`] = m[3].trim();
    }
    return links;
  }

  // Legacy fallback: parse fragrantica link: lines from images.md
  if (!fs.existsSync(IMAGES_MD)) return {};
  const links = {};
  let carousel = 0, pendingKey = null;
  for (const raw of fs.readFileSync(IMAGES_MD, 'utf8').split('\n')) {
    const line = raw.trim();
    const cm = line.match(/^## Carousel (\d+)/);
    if (cm) { carousel = parseInt(cm[1], 10); pendingKey = null; continue; }
    const sm = line.match(/^-\s+slide\s+(\d+)\s*\(/i);
    if (sm) { pendingKey = `${carousel}-${sm[1]}`; continue; }
    const lm = line.match(/^fragrantica link:\s*(.+)$/i);
    if (lm && pendingKey) { links[pendingKey] = lm[1].trim(); pendingKey = null; }
  }
  return links;
}

// Downloads the Fragrantica social-card image for a product page URL
// (e.g. https://www.fragrantica.com/perfume/Brand/Name-12345.html ->
// https://www.fragrantica.com/mdimg/perfume-social-cards/en-p_c_12345.jpeg)
function downloadFragranticaCard(link, outPath) {
  const m = link.match(/-(\d+)\.html?$/i);
  if (!m) return false;

  const imgUrl = `https://www.fragrantica.com/mdimg/perfume-social-cards/en-p_c_${m[1]}.jpeg`;
  try {
    execSync(`curl -sLf -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -H "Referer: https://www.fragrantica.com/" -o "${outPath}" "${imgUrl}"`, { stdio: 'pipe' });
    return fs.existsSync(outPath) && fs.statSync(outPath).size > 0;
  } catch {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    return false;
  }
}

function normalizeCards() {
  console.log('\nNormalizing Fragrantica card images...');
  if (!fs.existsSync(IMAGES_MD)) {
    console.error('  ! checkpoint/images.md not found — skipping.');
    return;
  }

  const slides = parseSlideLabels(fs.readFileSync(IMAGES_MD, 'utf8'));
  const links = loadFragranticaLinks();
  let downloaded = 0;

  for (const { carousel, slide, label } of slides) {
    const outName = `c${carousel}-s${slide}-card.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);
    const link = links[`${carousel}-${slide}`];

    if (!link) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragrantica link found`);
      continue;
    }

    if (downloadFragranticaCard(link, outPath)) {
      console.log(`  ${label} (C${carousel} S${slide}): downloaded ${outName} from Fragrantica`);
      downloaded++;
    } else {
      console.warn(`  ! ${label} (C${carousel} S${slide}): failed to download card from ${link}`);
    }
  }

  if (!downloaded) console.log('  Nothing to download.');
}

function run() {
  downloadBackgrounds();
  convertBackgrounds();
  normalizeCards();
  console.log('\nDone. pipeline/images/ is ready for pipeline/slides/generate.js');
}

run();
