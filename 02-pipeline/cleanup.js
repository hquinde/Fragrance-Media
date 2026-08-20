#!/usr/bin/env node
// Runs the "done posting" cleanup as a single command instead of a 3-step
// free-text instruction, which has been silently skipped before:
//   1. Delete PNGs from 03-checkpoint/1, 03-checkpoint/2, 03-checkpoint/3 (keep folders)
//   2. Delete downloaded image files from this folder (keep the scripts/docs/toolchain)
//   3. Delete scripts.json
//
// Usage: node cleanup.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECKPOINT_DIRS = [1, 2, 3].map(n => path.join(ROOT, '03-checkpoint', String(n)));
const IMAGES_DIR = __dirname;
const SCRIPTS_JSON = path.join(__dirname, 'scripts.json');

// Images share this folder with the scripts, docs, and render toolchain now,
// so deletion must positively identify a downloaded asset by name rather than
// blacklist one known file — an "everything except X" rule here would wipe
// the pipeline itself.
const DOWNLOADED_ASSET = /^c\d+(-s\d+[ab]?)?-(title|bottle|card)\.(jpg|jpeg|png|webp)$|^\.manifest\.json$/;

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
      if (!DOWNLOADED_ASSET.test(f)) continue;
      fs.unlinkSync(path.join(IMAGES_DIR, f));
      removed++;
    }
  }

  if (fs.existsSync(SCRIPTS_JSON)) {
    fs.unlinkSync(SCRIPTS_JSON);
    removed++;
  }

  console.log(`Cleanup done — removed ${removed} file(s). 03-checkpoint/1,2,3 and this folder are ready for the next batch.`);
}

main();
