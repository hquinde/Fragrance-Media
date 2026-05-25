#!/usr/bin/env node
// Reads output.md, searches Fragrantica for each fragrance, and downloads
// the main product JPEG (the downloadable image Fragrantica provides).
// Usage: node fragrantica-images.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_MD = path.join(__dirname, '../01_scripts/output.md');
const OUT_DIR = __dirname;

// --- Parse output.md ---------------------------------------------------

function parseFragrances(md) {
  const results = [];
  let carousel = 0;
  let slide = 0;

  for (const line of md.split('\n')) {
    const carouselMatch = line.match(/^## Carousel (\d+)/);
    if (carouselMatch) { carousel = parseInt(carouselMatch[1]); slide = 0; continue; }

    const slideMatch = line.match(/^\*\*Slide (\d+) — (.+?)\*\*/);
    if (slideMatch) { slide = parseInt(slideMatch[1]); results.push({ carousel, slide, name: slideMatch[2].trim(), brand: null }); continue; }

    const brandMatch = line.match(/^Brand:\s*(.+)/);
    if (brandMatch && results.length > 0) {
      results[results.length - 1].brand = brandMatch[1].trim();
    }
  }

  return results.filter(f => f.brand);
}

// --- HTTP fetch via curl ------------------------------------------------

const HEADERS = [
  '-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"',
  '-H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"',
  '-H "Accept-Language: en-US,en;q=0.9"',
  '-H "Referer: https://www.fragrantica.com/"',
].join(' ');

function fetchHtml(url) {
  return execSync(`curl -sL --max-time 20 ${HEADERS} "${url}"`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

// --- Fragrantica logic --------------------------------------------------

function searchFragrantica(name, brand) {
  const query = encodeURIComponent(`${name} ${brand}`);
  const url = `https://www.fragrantica.com/search/?query=${query}`;
  const html = fetchHtml(url);

  // Fragrantica search returns perfume links like /perfume/Brand/Name-12345.html
  const match = html.match(/href="(\/perfume\/[^"]+\.html)"/);
  if (!match) throw new Error('No search result found — may be blocked by Cloudflare');
  return `https://www.fragrantica.com${match[1]}`;
}

function getImageUrl(perfumePageUrl) {
  const html = fetchHtml(perfumePageUrl);

  // og:image holds the main product JPEG
  const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
  if (ogMatch) return ogMatch[1];

  // Fallback: look for the fimgs.net CDN image directly
  const cdnMatch = html.match(/https:\/\/fimgs\.net\/mdimg\/perfume\/375x500\.\d+\.jpg/);
  if (cdnMatch) return cdnMatch[0];

  throw new Error('Could not extract image URL from page');
}

function downloadImage(imageUrl, outPath) {
  execSync(`curl -sL --max-time 30 ${HEADERS} "${imageUrl}" -o "${outPath}"`, { stdio: 'pipe' });
  const size = fs.statSync(outPath).size;
  if (size < 5000) throw new Error(`Downloaded file too small (${size} bytes) — likely an error page`);
}

// --- Main ---------------------------------------------------------------

function run() {
  const md = fs.readFileSync(OUTPUT_MD, 'utf8');
  const fragrances = parseFragrances(md);

  if (fragrances.length === 0) {
    console.log('No fragrances found in output.md.');
    return;
  }

  console.log(`Found ${fragrances.length} fragrances. Fetching from Fragrantica...\n`);

  for (const { carousel, slide, name, brand } of fragrances) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filename = `fragrantica-c${carousel}-s${slide}-${slug}.jpg`;
    const outPath = path.join(OUT_DIR, filename);

    process.stdout.write(`[C${carousel} S${slide}] ${name} (${brand}) ... `);

    try {
      const pageUrl = searchFragrantica(name, brand);
      const imageUrl = getImageUrl(pageUrl);
      downloadImage(imageUrl, outPath);
      console.log(`saved → ${filename}`);
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
    }
  }

  console.log('\nDone. Check images/ for results.');
}

run();
