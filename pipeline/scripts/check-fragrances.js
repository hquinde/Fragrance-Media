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

// Connector/descriptor words that are too common across unrelated fragrance
// names to count as a meaningful signal on their own (e.g. "Black Orchid" vs
// "Black Tie" sharing only "black" should NOT flag).
const STOPWORDS = new Set([
  'de', 'du', 'des', 'le', 'la', 'les', 'pour', 'eau', 'parfum', 'parfums',
  'edp', 'edt', 'and', 'for', 'of', 'the', 'by', 'a', 'in', 'homme', 'femme',
  'man', 'woman', 'men', 'women',
]);

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(norm) {
  return norm.split(' ').filter(Boolean);
}

// Whole-word containment: does `needle`'s token sequence appear contiguously
// inside `haystack`'s tokens? Catches flankers ("Layton" inside "Layton
// Exclusif") and short names picked up by a brand prefix ("Ani" inside
// "Nishane Ani") without the raw-substring false negatives that come from
// comparing full un-tokenized strings.
function containsTokenSequence(needle, haystack) {
  if (needle.length > haystack.length) return false;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((w, j) => haystack[i + j] === w)) return true;
  }
  return false;
}

// Catches same-fragrance-different-qualifier cases that don't share a
// contiguous run at all (e.g. "XJ 1861 Renaissance" vs "Xerjoff Renaissance").
// Flags on 2+ shared distinctive words, or a single shared word long enough
// (>=7 chars) to be unlikely to be a coincidental shared descriptor.
function distinctiveOverlapHit(aTokens, bTokens) {
  const distinctive = t => t.length >= 4 && !STOPWORDS.has(t);
  const aDist = aTokens.filter(distinctive);
  const bSet = new Set(bTokens);
  const shared = aDist.filter(w => bSet.has(w));
  if (shared.length >= 2) return true;
  if (shared.length === 1 && shared[0].length >= 7) return true;
  return false;
}

function main() {
  const picks = process.argv.slice(2);
  if (picks.length === 0) {
    console.error('Usage: node check-fragrances.js "Name 1" "Name 2" ...');
    process.exit(1);
  }

  const { already_used } = JSON.parse(fs.readFileSync(PICKS_JSON, 'utf8'));
  const usedNormalized = already_used.map(u => ({ raw: u.name, norm: normalize(u.name), tokens: tokenize(normalize(u.name)) }));

  const conflicts = [];
  for (const pick of picks) {
    const pickNorm = normalize(pick);
    const pickTokens = tokenize(pickNorm);
    const hit = usedNormalized.find(u => {
      if (u.norm === pickNorm) return true;
      if (containsTokenSequence(u.tokens, pickTokens) || containsTokenSequence(pickTokens, u.tokens)) return true;
      return distinctiveOverlapHit(u.tokens, pickTokens) || distinctiveOverlapHit(pickTokens, u.tokens);
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
