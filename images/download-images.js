#!/usr/bin/env node
// Reads images.md, downloads one image per slot into images/
// Usage: node download-images.js
// Requires: gallery-dl (brew install gallery-dl)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_MD = path.join(__dirname, 'images.md');
const IMAGES_DIR = __dirname;

function slotKey(slot) {
  if (slot.toLowerCase() === 'title') return 'title';
  const m = slot.match(/slide\s+(\d+)/i);
  return m ? `s${m[1]}` : null;
}

function parse(md) {
  const slots = [];
  let carousel = 0;

  for (const raw of md.split('\n')) {
    const line = raw.trim();

    if (line.startsWith('## Carousel')) {
      carousel++;
      continue;
    }

    const match = line.match(/^-\s+(title|slide\s+\d+)(?:\s*\(([^)]*)\))?:\s*(\S+)/i);
    if (!match) continue;

    const [, slot, label, url] = match;
    const key = slotKey(slot);
    if (key && url) slots.push({ carousel, key, label: label || null, url });
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
      `gallery-dl --dest "${tmp}" --filename "{filename}.{extension}" --range 1 "${url}"`,
      { stdio: 'pipe' }
    );

    const findFile = (dir) => {
      for (const f of fs.readdirSync(dir)) {
        if (f.startsWith('.')) continue;
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) { const r = findFile(full); if (r) return r; }
        else return full;
      }
      return null;
    };
    const found = findFile(tmp);
    if (!found) throw new Error('gallery-dl downloaded nothing');

    const ext = path.extname(found);
    fs.renameSync(found, outPath + ext);
    fs.rmSync(tmp, { recursive: true, force: true });
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

  for (const { carousel, key, label, url } of slots) {
    const slug = label
      ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : key;
    const name = `c${carousel}-${slug}`;
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
