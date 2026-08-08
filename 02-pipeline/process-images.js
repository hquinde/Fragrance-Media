#!/usr/bin/env node
// Normalizes this folder's images after scripts.json is filled (each slide
// carries its own fragranticaUrl):
//   1. Downloads Fragrantica bottle images (cN-sN-bottle.jpg) from fimgs.net
//   2. Downloads Fragrantica card images (cN-sN-card.jpg) from fragrantica.com social cards
//
// Usage: node process-images.js "url1" "url2" ...  (cwd-independent)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = __dirname;
const SCRIPTS_JSON = path.join(IMAGES_DIR, 'scripts.json');
const MANIFEST_PATH = path.join(IMAGES_DIR, '.manifest.json');

// Tracks which source URL produced each downloaded file. Filenames are
// reused every batch (c1-s1-bottle.jpg, etc.), so an "already have" check
// based on the file existing is not enough — it silently treats a prior
// batch's leftover image as current. The manifest lets a skip only happen
// when the file on disk actually came from the same URL this run wants.
function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  try { return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch { return {}; }
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

function loadCarousels() {
  if (!fs.existsSync(SCRIPTS_JSON)) {
    console.error('! scripts.json not found — run add-batch.js first.');
    process.exit(1);
  }
  const { carousels } = JSON.parse(fs.readFileSync(SCRIPTS_JSON, 'utf8'));
  return carousels || [];
}

function loadSlides(carousels) {
  const slides = [];
  for (const c of carousels) {
    for (const s of c.slides || []) {
      slides.push({ carousel: c.num, slide: s.num, label: s.name, link: s.fragranticaUrl });
    }
  }
  return slides;
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

function downloadTitleImages(carousels, urls, manifest) {
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

  let urlIdx = 0;
  for (const c of carousels) {
    const num = c.num;
    if (c.titleStyle === 'minimal') {
      console.log(`  Carousel ${num}: minimal title style — no photo needed`);
      continue;
    }

    const manifestKey = `c${num}-title`;
    const outBase = path.join(IMAGES_DIR, manifestKey);
    const url = urls[urlIdx++];
    const existing = [`${outBase}.jpg`, `${outBase}.png`, `${outBase}.webp`].find(f => fs.existsSync(f) && fs.statSync(f).size > 1024);

    if (existing && manifest[manifestKey] === url) {
      console.log(`  Carousel ${num}: already have ${path.basename(existing)}`);
      continue;
    }
    if (existing) fs.unlinkSync(existing); // stale from a different batch/URL

    if (!url) { console.warn(`  ! Carousel ${num}: no URL provided`); continue; }

    fs.mkdirSync(tmp, { recursive: true });
    try {
      execSync(`gallery-dl --dest "${tmp}" --filename "{filename}.{extension}" --range 1 "${url}"`, { stdio: 'pipe' });
      const found = findFile(tmp);
      if (!found) throw new Error('gallery-dl downloaded nothing');
      const ext = path.extname(found);
      fs.renameSync(found, `${outBase}${ext}`);
      manifest[manifestKey] = url;
      console.log(`  Carousel ${num}: downloaded c${num}-title${ext}`);
    } catch (err) {
      console.warn(`  ! Carousel ${num}: download failed — place c${num}-title.jpg manually in this folder`);
      console.warn(`    ${err.message}`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
}

function downloadBottles(slides, manifest) {
  console.log('Downloading Fragrantica bottle images...');
  let downloaded = 0;

  for (const { carousel, slide, label, link } of slides) {
    const outName = `c${carousel}-s${slide}-bottle.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0 && manifest[outName] === link) {
      console.log(`  ${label} (C${carousel} S${slide}): already have ${outName}`);
      downloaded++;
      continue;
    }

    if (!link) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragranticaUrl — skipping bottle`);
      continue;
    }

    const m = link.match(/-(\d+)\.html?$/i);
    if (!m) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): can't parse ID from ${link}`);
      continue;
    }

    const imgUrl = `https://fimgs.net/mdimg/perfume/375x500.${m[1]}.jpg`;
    if (downloadUrl(imgUrl, outPath)) {
      manifest[outName] = link;
      console.log(`  ${label} (C${carousel} S${slide}): downloaded ${outName}`);
      downloaded++;
    } else {
      console.warn(`  ! ${label} (C${carousel} S${slide}): bottle download failed — place ${outName} manually in this folder`);
    }
  }

  if (!downloaded) console.log('  Nothing downloaded.');
}

function downloadCards(slides, manifest) {
  console.log('\nDownloading Fragrantica card images...');
  let downloaded = 0;

  for (const { carousel, slide, label, link } of slides) {
    const outName = `c${carousel}-s${slide}-card.jpg`;
    const outPath = path.join(IMAGES_DIR, outName);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0 && manifest[outName] === link) {
      console.log(`  ${label} (C${carousel} S${slide}): already have ${outName}`);
      downloaded++;
      continue;
    }

    if (!link) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): no fragranticaUrl — skipping card`);
      continue;
    }

    const m = link.match(/-(\d+)\.html?$/i);
    if (!m) {
      console.warn(`  ! ${label} (C${carousel} S${slide}): can't parse ID from ${link}`);
      continue;
    }

    const imgUrl = `https://www.fragrantica.com/mdimg/perfume-social-cards/en-p_c_${m[1]}.jpeg`;
    if (downloadUrl(imgUrl, outPath)) {
      manifest[outName] = link;
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
  const carousels = loadCarousels();
  const photoCarousels = carousels.filter(c => c.titleStyle !== 'minimal').length;

  if (titleUrls.length < photoCarousels) {
    console.error(`Usage: node process-images.js "title-url-1" ... (need ${photoCarousels} URL(s) — one per non-minimal carousel)`);
    process.exit(1);
  }

  const slides = loadSlides(carousels);
  const manifest = loadManifest();

  downloadTitleImages(carousels, titleUrls, manifest);
  downloadBottles(slides, manifest);
  downloadCards(slides, manifest);
  saveManifest(manifest);

  console.log('\nDone. this folder is ready for generate.js');
}

run();
