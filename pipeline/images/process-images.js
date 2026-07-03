#!/usr/bin/env node
// Normalizes pipeline/images/ for Stage 2 after Stage 1 fills fragrantica-links.md:
//   1. Downloads Fragrantica bottle images (cN-sN-bottle.jpg) from fimgs.net
//   2. Downloads Fragrantica card images (cN-sN-card.jpg) from fragrantica.com social cards
//
// Usage: node process-images.js  (run from pipeline/images/)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = __dirname;
const SCRIPTS_JSON = path.join(IMAGES_DIR, '..', 'scripts', 'data', 'scripts.json');
const LINKS_FILE = path.join(IMAGES_DIR, 'fragrantica-links.md');

function loadSlides() {
  if (!fs.existsSync(SCRIPTS_JSON)) {
    console.error('! pipeline/scripts/data/scripts.json not found — run Stage 1 first.');
    process.exit(1);
  }
  const { carousels } = JSON.parse(fs.readFileSync(SCRIPTS_JSON, 'utf8'));
  const slides = [];
  for (const c of carousels || []) {
    for (const s of c.slides || []) {
      slides.push({ carousel: c.num, slide: s.num, label: s.name });
    }
  }
  return slides;
}

function loadFragranticaLinks() {
  if (!fs.existsSync(LINKS_FILE)) return {};
  const links = {};
  for (const line of fs.readFileSync(LINKS_FILE, 'utf8').split('\n')) {
    const m = line.match(/^c(\d+)-s(\d+):\s*(.+)$/i);
    if (m) links[`${m[1]}-${m[2]}`] = m[3].trim();
  }
  return links;
}

function downloadUrl(url, outPath) {
  try {
    execSync(
      `curl -sLf -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -H "Referer: https://www.fragrantica.com/" -o "${outPath}" "${url}"`,
      { stdio: 'pipe' }
    );
    return fs.existsSync(outPath) && fs.statSync(outPath).size > 0;
  } catch {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    return false;
  }
}

function downloadTitleImages(urls) {
  console.log('Downloading title background images (gallery-dl)...');
  const tmp = path.join(IMAGES_DIR, '_tmp_title');

  function findFile(dir) {
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith('.')) continue;
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) { const r = findFile(full); if (r) return r; }
      else return full;
    }
    return null;
  }

  for (let i = 0; i < 3; i++) {
    const num = i + 1;
    const outBase = path.join(IMAGES_DIR, `c${num}-title`);
    const existing = [`${outBase}.jpg`, `${outBase}.png`, `${outBase}.webp`].find(f => fs.existsSync(f) && fs.statSync(f).size > 1024);
    if (existing) { console.log(`  Carousel ${num}: already have ${path.basename(existing)}`); continue; }

    const url = urls[i];
    if (!url) { console.warn(`  ! Carousel ${num}: no URL provided`); continue; }

    fs.mkdirSync(tmp, { recursive: true });
    try {
      execSync(`gallery-dl --dest "${tmp}" --filename "{filename}.{extension}" --range 1 "${url}"`, { stdio: 'pipe' });
      const found = findFile(tmp);
      if (!found) throw new Error('gallery-dl downloaded nothing');
      const ext = path.extname(found);
      fs.renameSync(found, `${outBase}${ext}`);
      console.log(`  Carousel ${num}: downloaded c${num}-title${ext}`);
    } catch (err) {
      console.warn(`  ! Carousel ${num}: download failed — place c${num}-title.jpg manually in pipeline/images/`);
      console.warn(`    ${err.message}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
}

function downloadBottles(slides, links) {
  console.log('Downloading Fragrantica bottle images...');
  let downloaded = 0;

  for (const { carousel, slide, label } of slides) {
    const outName = `c${carousel}-s${slide}-bottle.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
      console.log(`  ${label} (C${carousel} S${slide}): already have ${outName}`);
      downloaded++;
      continue;
    }

    const link = links[`${carousel}-${slide}`];
    if (!link) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragrantica link — skipping bottle`);
      continue;
    }

    const m = link.match(/-(\d+)\.html?$/i);
    if (!m) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): can't parse ID from ${link}`);
      continue;
    }

    const imgUrl = `https://fimgs.net/mdimg/perfume/375x500.${m[1]}.jpg`;
    if (downloadUrl(imgUrl, outPath)) {
      console.log(`  ${label} (C${carousel} S${slide}): downloaded ${outName}`);
      downloaded++;
    } else {
      console.warn(`  ! ${label} (C${carousel} S${slide}): bottle download failed — place ${outName} manually in pipeline/images/`);
    }
  }

  if (!downloaded) console.log('  Nothing downloaded.');
}

function downloadCards(slides, links) {
  console.log('\nDownloading Fragrantica card images...');
  let downloaded = 0;

  for (const { carousel, slide, label } of slides) {
    const outName = `c${carousel}-s${slide}-card.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
      console.log(`  ${label} (C${carousel} S${slide}): already have ${outName}`);
      downloaded++;
      continue;
    }

    const link = links[`${carousel}-${slide}`];
    if (!link) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragrantica link — skipping card`);
      continue;
    }

    const m = link.match(/-(\d+)\.html?$/i);
    if (!m) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): can't parse ID from ${link}`);
      continue;
    }

    const imgUrl = `https://www.fragrantica.com/mdimg/perfume-social-cards/en-p_c_${m[1]}.jpeg`;
    if (downloadUrl(imgUrl, outPath)) {
      console.log(`  ${label} (C${carousel} S${slide}): downloaded ${outName}`);
      downloaded++;
    } else {
      console.warn(`  ! ${label} (C${carousel} S${slide}): card download failed from ${link}`);
    }
  }

  if (!downloaded) console.log('  Nothing downloaded.');
}

function run() {
  const titleUrls = process.argv.slice(2);
  if (titleUrls.length < 3) {
    console.error('Usage: node process-images.js "title-url-1" "title-url-2" "title-url-3"');
    process.exit(1);
  }

  const slides = loadSlides();
  const links = loadFragranticaLinks();

  downloadTitleImages(titleUrls);
  downloadBottles(slides, links);
  downloadCards(slides, links);

  console.log('\nDone. pipeline/images/ is ready for pipeline/slides/generate.js');
}

run();
