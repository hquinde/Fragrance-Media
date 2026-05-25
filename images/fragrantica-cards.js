#!/usr/bin/env node
// Watches Chrome's WebShare folder for perfume cards as you share them on Fragrantica.
// Reads fragrance order and URLs from images/images.md.
//
// Usage: node fragrantica-cards.js
//
// Workflow:
//   1. Fill in the "fragrantica:" lines in images.md
//   2. Run this script — it tells you which page to visit
//   3. Click the share button on Fragrantica, save the card image
//   4. Script detects the new file, renames it, and prompts the next fragrance

const fs = require('fs');
const path = require('path');
const os = require('os');

const IMAGES_MD = path.join(__dirname, 'images.md');
const WEBSHARE_DIR = path.join(os.homedir(), 'Library/Application Support/Google/Chrome/Profile 4/WebShare');
const OUT_DIR = __dirname;
const POLL_MS = 600;

// --- Parse images.md ----------------------------------------------------

function parseSlides(md) {
  const slides = [];
  let carousel = 0;
  let pendingSlide = null;

  for (const raw of md.split('\n')) {
    const line = raw.trim();

    const cm = line.match(/^## Carousel (\d+)/);
    if (cm) { carousel = parseInt(cm[1]); pendingSlide = null; continue; }

    // Slide line: - Slide N (Label): [optional url]
    const sm = line.match(/^-\s+slide\s+(\d+)\s*\(([^)]+)\):\s*(\S+)?/i);
    if (sm) {
      pendingSlide = { carousel, slide: parseInt(sm[1]), label: sm[2].trim(), fragranticaUrl: null };
      slides.push(pendingSlide);
      continue;
    }

    // fragrantica: line directly under a slide
    const fm = line.match(/^fragrantica:\s*(\S+)?/i);
    if (fm && pendingSlide) {
      pendingSlide.fragranticaUrl = fm[1] || null;
      continue;
    }

    // Any other non-empty line resets pendingSlide context
    if (line && !line.startsWith('-') && !line.startsWith('#')) pendingSlide = null;
  }

  return slides;
}

function toSlug(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function outFilename({ carousel, slide }) {
  return `c${carousel}-s${slide}-card.jpg`;
}

// --- WebShare watcher ---------------------------------------------------

function getExistingFiles(dir) {
  const seen = new Set();
  if (!fs.existsSync(dir)) return seen;
  for (const entry of fs.readdirSync(dir)) {
    const sub = path.join(dir, entry);
    if (fs.statSync(sub).isDirectory()) {
      for (const f of fs.readdirSync(sub)) seen.add(path.join(sub, f));
    }
  }
  return seen;
}

function findNewJpeg(dir, known) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir)) {
    const sub = path.join(dir, entry);
    if (!fs.statSync(sub).isDirectory()) continue;
    for (const f of fs.readdirSync(sub)) {
      const full = path.join(sub, f);
      if (!known.has(full) && /\.(jpg|jpeg)$/i.test(f) && fs.statSync(full).size > 5000) {
        return full;
      }
    }
  }
  return null;
}

// --- Main ---------------------------------------------------------------

function run() {
  if (!fs.existsSync(IMAGES_MD)) {
    console.error('images.md not found.');
    process.exit(1);
  }

  if (!fs.existsSync(WEBSHARE_DIR)) {
    console.error(`Chrome WebShare folder not found:\n  ${WEBSHARE_DIR}`);
    process.exit(1);
  }

  const slides = parseSlides(fs.readFileSync(IMAGES_MD, 'utf8'));
  if (slides.length === 0) {
    console.error('No slides found in images.md.');
    process.exit(1);
  }

  console.log(`\nFragrantica Card Watcher — ${slides.length} fragrances\n`);
  console.log('For each prompt: visit the Fragrantica page, click the card image,');
  console.log('and use the share/save option. Script picks it up automatically.\n');
  console.log('─'.repeat(55));

  let index = 0;
  let known = getExistingFiles(WEBSHARE_DIR);

  function prompt() {
    if (index >= slides.length) {
      console.log('\nAll done! Fragrantica cards saved to images/');
      process.exit(0);
    }
    const s = slides[index];
    console.log(`\n[${index + 1}/${slides.length}] ${s.label}  (C${s.carousel} S${s.slide})`);
    if (s.fragranticaUrl) {
      console.log(`  ${s.fragranticaUrl}`);
    } else {
      console.log(`  (no URL in images.md — search manually)`);
    }
    console.log(`  → saves as: ${outFilename(s)}`);
  }

  function poll() {
    const found = findNewJpeg(WEBSHARE_DIR, known);
    if (found) {
      const dest = path.join(OUT_DIR, outFilename(slides[index]));
      fs.copyFileSync(found, dest);
      known.add(found);
      console.log(`  ✓ Saved → ${path.basename(dest)}`);
      index++;
      prompt();
    }
  }

  prompt();
  setInterval(poll, POLL_MS);
}

run();
