#!/usr/bin/env node
// 01-creation helper: reports real-world metrics for a pending carousel, instead
// of hand-editing carousels.json via Edit/Write.
//
// Usage:
//   node report-performance.js --title "Title" --plays 1234 --saves 10 --likes 20
//   node report-performance.js --title "Title"
//
// A title with plays >= 1000 is marked reported and kept, with its metrics.
// A title reported with no metrics at all, or with plays < 1000, is dropped
// entirely — we don't keep low/no-performance records, and its fragrances
// become eligible for reuse the moment the carousel is gone.

const fs = require('fs');
const path = require('path');

const CAROUSELS_JSON = path.join(__dirname, 'carousels.json');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1];
      args[key] = val;
      i++;
    }
  }
  return args;
}

function todayDate() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { title, plays, saves, likes } = args;

  const hasAnyMetric = plays !== undefined || saves !== undefined || likes !== undefined;
  const hasAllMetrics = plays !== undefined && saves !== undefined && likes !== undefined;

  if (!title || (hasAnyMetric && !hasAllMetrics)) {
    console.error('Usage: node report-performance.js --title "Title" --plays N --saves N --likes N');
    console.error('       node report-performance.js --title "Title"   (no metrics -> dropped)');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(CAROUSELS_JSON, 'utf8'));
  const idx = data.carousels.findIndex(c => c.status === 'pending' && c.title === title);
  if (idx === -1) {
    console.error(`! No pending carousel found with title "${title}"`);
    console.error('Pending titles:');
    for (const c of data.carousels) if (c.status === 'pending') console.error(`  - ${c.title}`);
    process.exit(1);
  }

  const playsNum = hasAllMetrics && /^\d+$/.test(plays) ? Number(plays) : null;

  if (hasAllMetrics && playsNum !== null && playsNum >= 1000) {
    const entry = data.carousels[idx];
    entry.status = 'reported';
    entry.plays = playsNum;
    entry.saves = /^\d+$/.test(saves) ? Number(saves) : saves;
    entry.likes = /^\d+$/.test(likes) ? Number(likes) : likes;
    entry.date_reported = todayDate();
    fs.writeFileSync(CAROUSELS_JSON, JSON.stringify(data, null, 2) + '\n');
    console.log(`Reported "${title}" — ${playsNum} plays, kept.`);
  } else {
    const freed = data.carousels[idx].fragrances.map(f => f.fragrance);
    data.carousels.splice(idx, 1);
    fs.writeFileSync(CAROUSELS_JSON, JSON.stringify(data, null, 2) + '\n');
    console.log(`Dropped "${title}" — no qualifying metrics. ${freed.length} fragrances now eligible for reuse.`);
  }
}

main();
