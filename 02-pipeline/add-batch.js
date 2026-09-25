#!/usr/bin/env node
// 02-pipeline helper: records a new batch of 3 carousels into carousels.json as
// pending entries, instead of hand-editing the JSON via Edit/Write.
//
// Usage:
//   node add-batch.js batch.json
//
// batch.json shape:
// {
//   "carousels": [
//     {
//       "title": "3 Fragrances Built for a Long Flight",
//       "fragrances": [
//         { "fragrance": "Burberry Weekend for Men", "tier": "mainstream", "gender": "men" },
//         ...
//       ]
//     },
//     // A comparison carousel (3 price-comparison pairs instead of 3 single
//     // picks) just needs 6 fragrances instead of 3 — one per side of each
//     // pair. No separate flag; the title already says what it is.
//     ...
//   ]
// }

const fs = require('fs');
const path = require('path');

const CAROUSELS_JSON = path.join(__dirname, '..', '01-creation', 'carousels.json');
const VALID_TIERS = new Set(['mainstream', 'mid-niche', 'deep-niche', 'ultra-niche', 'obscure']);
const VALID_GENDERS = new Set(['men', 'women', 'unisex']);

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
    const count = Array.isArray(c.fragrances) ? c.fragrances.length : 0;
    if (!c.title || (count !== 3 && count !== 6)) {
      console.error(`! Carousel "${c.title || '(untitled)'}" needs a title and exactly 3 fragrances (6 for a comparison carousel).`);
      process.exit(1);
    }
    for (const f of c.fragrances) {
      if (!f.fragrance || !VALID_TIERS.has(f.tier) || !VALID_GENDERS.has(f.gender)) {
        console.error(`! Carousel "${c.title}" has an invalid fragrance entry: ${JSON.stringify(f)}`);
        console.error(`  tier must be one of: ${[...VALID_TIERS].join(', ')}`);
        console.error(`  gender must be one of: ${[...VALID_GENDERS].join(', ')}`);
        process.exit(1);
      }
    }
  }

  const data = JSON.parse(fs.readFileSync(CAROUSELS_JSON, 'utf8'));

  for (const c of carousels) {
    data.carousels.push({
      title: c.title,
      status: 'pending',
      date_posted: null,
      date_reported: null,
      plays: null,
      saves: null,
      likes: null,
      fragrances: c.fragrances.map(f => ({ fragrance: f.fragrance, tier: f.tier, gender: f.gender })),
    });
  }

  fs.writeFileSync(CAROUSELS_JSON, JSON.stringify(data, null, 2) + '\n');

  console.log(`Added ${carousels.length} carousels as pending, ${carousels.reduce((n, c) => n + c.fragrances.length, 0)} fragrances now excluded.`);
  for (const c of carousels) console.log(`  - ${c.title}`);
}

main();
