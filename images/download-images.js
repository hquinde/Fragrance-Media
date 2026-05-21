#!/usr/bin/env node
// Reads images.md, downloads one image per slot into images/
// Usage: node download-images.js
// Requires: gallery-dl (brew install gallery-dl)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_MD = path.join(__dirname, 'images.md');
const IMAGES_DIR = __dirname;

const SLOT_NAMES = {
  'title':   'title',
  'slide 1': 's1',
  'slide 2': 's2',
  'slide 3': 's3',
  'slide 4': 's4',
};

function parse(md) {
  const slots = [];
  let carousel = 0;

  for (const raw of md.split('\n')) {
    const line = raw.trim();

    if (line.startsWith('## Carousel')) {
      carousel++;
      continue;
    }

    const match = line.match(/^-\s+(title|slide \d):\s*(\S+)/i);
    if (!match) continue;

    const [, slot, url] = match;
    const key = SLOT_NAMES[slot.toLowerCase()];
    if (key && url) slots.push({ carousel, key, url });
  }

  return slots;
}

function download(url, outPath) {
  // Download the first image from the Pinterest URL into a temp dir,
  // then move it to outPath with the correct name.
  const tmp = path.join(IMAGES_DIR, '_tmp');
  fs.mkdirSync(tmp, { recursive: true });

  try {
    execSync(
      `gallery-dl --dest "${tmp}" --filename "{filename}.{extension}" -G 1 "${url}"`,
      { stdio: 'pipe' }
    );

    const files = fs.readdirSync(tmp).filter(f => !f.startsWith('.'));
    if (files.length === 0) throw new Error('gallery-dl downloaded nothing');

    const ext = path.extname(files[0]);
    fs.renameSync(path.join(tmp, files[0]), outPath + ext);
    fs.rmdirSync(tmp);
    return outPath + ext;
  } catch (err) {
    fs.rmSync(tmp, { recursive: true, force: true });
    throw err;
  }
}

function run() {
  const md = fs.readFileSync(IMAGES_MD, 'utf8');
  const slots = parse(md);

  if (slots.length === 0) {
    console.log('No URLs found in images.md — nothing to download.');
    return;
  }

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  for (const { carousel, key, url } of slots) {
    const name = `c${carousel}-${key}`;
    console.log(`Downloading ${name} from ${url}`);
    try {
      const saved = download(url, path.join(IMAGES_DIR, name));
      console.log(`  → ${path.basename(saved)}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log('\nDone. Check images/ for results.');
}

run();
