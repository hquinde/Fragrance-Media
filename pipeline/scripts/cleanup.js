#!/usr/bin/env node
// Runs the "done posting" cleanup as a single command instead of a 3-step
// free-text instruction, which has been silently skipped before:
//   1. Delete PNGs from checkpoint/1, checkpoint/2, checkpoint/3 (keep folders)
//   2. Delete image files + manifest from pipeline/images/ (keep the scripts + links.md)
//   3. Delete pipeline/scripts/data/scripts.json
//
// Usage: node cleanup.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CHECKPOINT_DIRS = [1, 2, 3].map(n => path.join(ROOT, 'checkpoint', String(n)));
const IMAGES_DIR = path.join(ROOT, 'pipeline', 'images');
const SCRIPTS_JSON = path.join(ROOT, 'pipeline', 'scripts', 'data', 'scripts.json');
const IMAGES_KEEP = new Set(['process-images.js', 'fragrantica-links.md']);

function main() {
  let removed = 0;

  for (const dir of CHECKPOINT_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      fs.unlinkSync(path.join(dir, f));
      removed++;
    }
  }

  if (fs.existsSync(IMAGES_DIR)) {
    for (const f of fs.readdirSync(IMAGES_DIR)) {
      if (IMAGES_KEEP.has(f)) continue;
      fs.unlinkSync(path.join(IMAGES_DIR, f));
      removed++;
    }
  }

  if (fs.existsSync(SCRIPTS_JSON)) {
    fs.unlinkSync(SCRIPTS_JSON);
    removed++;
  }

  console.log(`Cleanup done — removed ${removed} file(s). checkpoint/1,2,3 and pipeline/images/ are ready for the next batch.`);
}

main();
