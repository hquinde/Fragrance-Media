#!/usr/bin/env node
// Stage 0 helper: moves a pending title into winners or failures with
// reported metrics, instead of hand-editing performance.json via jq.
//
// Usage:
//   node report-performance.js --title "Title" --plays 1234 --saves 10 --likes 20
//   node report-performance.js --title "Title" --plays 500 --saves 1 --likes 2 --why "weak hook, niche fragrances didn't land"
//
// --why present -> moves to failures. Otherwise -> moves to winners.

const fs = require('fs');
const path = require('path');

const PERF_JSON = path.join(__dirname, 'data', 'performance.json');

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
  const { title, plays, saves, likes, why } = args;

  // Metrics are required for a reported winner, but a flop reported with only
  // --why shouldn't be forced to carry fabricated 0/0/0 numbers alongside
  // entries that have real reported metrics.
  const hasAnyMetric = plays !== undefined || saves !== undefined || likes !== undefined;
  const hasAllMetrics = plays !== undefined && saves !== undefined && likes !== undefined;

  if (!title || (!why && !hasAllMetrics) || (hasAnyMetric && !hasAllMetrics)) {
    console.error('Usage: node report-performance.js --title "Title" --plays N --saves N --likes N [--why "reason"]');
    console.error('       node report-performance.js --title "Title" --why "flopped, no metrics given"');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(PERF_JSON, 'utf8'));
  const idx = data.pending.findIndex(p => p.title === title);
  if (idx === -1) {
    console.error(`! No pending entry found with title "${title}"`);
    console.error('Pending titles:');
    for (const p of data.pending) console.error(`  - ${p.title}`);
    process.exit(1);
  }

  const entry = data.pending[idx];
  if (hasAllMetrics) {
    entry.plays = /^\d+$/.test(plays) ? Number(plays) : plays;
    entry.saves = /^\d+$/.test(saves) ? Number(saves) : saves;
    entry.likes = /^\d+$/.test(likes) ? Number(likes) : likes;
  }
  entry.date_reported = todayDate();

  data.pending.splice(idx, 1);

  if (why) {
    entry.why = why;
    data.failures = data.failures || [];
    data.failures.push(entry);
    console.log(`Moved "${title}" to failures.`);
  } else {
    data.winners = data.winners || [];
    data.winners.push(entry);
    console.log(`Moved "${title}" to winners.`);
  }

  fs.writeFileSync(PERF_JSON, JSON.stringify(data, null, 2) + '\n');
}

main();
