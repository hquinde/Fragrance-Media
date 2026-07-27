#!/usr/bin/env node
// Stage 1 helper: records a new batch of 3 carousels into both
// performance.json (pending) and fragrance-picks.json (already_used) in one
// atomic step, instead of hand-editing both JSON files via Edit/Write.
//
// Usage:
//   node add-batch.js batch.json
//
// batch.json shape:
// {
//   "carousels": [
//     {
//       "title": "5 Fragrances Built for a Long Flight",
//       "niche_mix": "1 mainstream, 2 mid-niche, 1 deep niche, 1 ultra niche",
//       "fragrances": [
//         { "name": "Weekend for Men", "brand": "Burberry" },
//         ...
//       ]
//     },
//     ...
//   ]
// }

const fs = require('fs');
const path = require('path');

const PERF_JSON = path.join(__dirname, 'data', 'performance.json');
const PICKS_JSON = path.join(__dirname, 'data', 'fragrance-picks.json');

function main() {
  const batchPath = process.argv[2];
  if (!batchPath) {
    console.error('Usage: node add-batch.js batch.json');
    process.exit(1);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
  const carousels = batch.carousels || [];
  if (carousels.length !== 3) {
    console.error(`! Expected 3 carousels, found ${carousels.length}.`);
    process.exit(1);
  }
  for (const c of carousels) {
    if (!c.title || !c.niche_mix || !Array.isArray(c.fragrances) || c.fragrances.length !== 5) {
      console.error(`! Carousel "${c.title || '(untitled)'}" needs title, niche_mix, and exactly 5 fragrances.`);
      process.exit(1);
    }
  }

  const perf = JSON.parse(fs.readFileSync(PERF_JSON, 'utf8'));
  const picks = JSON.parse(fs.readFileSync(PICKS_JSON, 'utf8'));

  for (const c of carousels) {
    perf.pending.push({
      title: c.title,
      fragrances: c.fragrances.map(f => `${f.brand} ${f.name}`),
      niche_mix: c.niche_mix,
      design: 'v2',
      date_posted: null,
    });
    for (const f of c.fragrances) {
      picks.already_used.push({ name: f.name, brand: f.brand });
    }
  }

  fs.writeFileSync(PERF_JSON, JSON.stringify(perf, null, 2) + '\n');
  fs.writeFileSync(PICKS_JSON, JSON.stringify(picks, null, 2) + '\n');

  console.log(`Added ${carousels.length} carousels to pending and ${carousels.reduce((n, c) => n + c.fragrances.length, 0)} fragrances to already_used.`);
  for (const c of carousels) console.log(`  - ${c.title}`);
}

main();
