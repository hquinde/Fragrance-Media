#!/usr/bin/env node
// Checks proposed fragrance names against fragrance-picks.json already_used,
// using normalized (accent-stripped, lowercased) + substring matching so
// near-misses like "Vetiver" vs "Vétiver" or flankers like "Layton Exclusif"
// vs "Layton" are caught, not just exact matches.
//
// Usage: node check-fragrances.js "Name 1" "Name 2" ...

const fs = require('fs');
const path = require('path');

const PICKS_JSON = path.join(__dirname, 'data', 'fragrance-picks.json');

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function main() {
  const picks = process.argv.slice(2);
  if (picks.length === 0) {
    console.error('Usage: node check-fragrances.js "Name 1" "Name 2" ...');
    process.exit(1);
  }

  const { already_used } = JSON.parse(fs.readFileSync(PICKS_JSON, 'utf8'));
  const usedNormalized = already_used.map(u => ({ raw: u.name, norm: normalize(u.name) }));

  const conflicts = [];
  for (const pick of picks) {
    const pickNorm = normalize(pick);
    const hit = usedNormalized.find(u => {
      if (u.norm === pickNorm) return true;
      // Substring checks catch flankers/accents but are unreliable for very
      // short names (e.g. "K", "H24"), so require both sides to have enough
      // signal before treating a substring match as a real collision.
      if (u.norm.length < 4 || pickNorm.length < 4) return false;
      return u.norm.includes(pickNorm) || pickNorm.includes(u.norm);
    });
    if (hit) conflicts.push({ pick, matchedAgainst: hit.raw });
  }

  if (conflicts.length === 0) {
    console.log('Clean — no conflicts.');
  } else {
    console.log('Conflicts found:');
    for (const c of conflicts) {
      console.log(`  "${c.pick}" collides with already_used "${c.matchedAgainst}"`);
    }
    process.exit(1);
  }
}

main();
