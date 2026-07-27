#!/usr/bin/env node
// Exports a carousel HTML file as PNGs (1080×1920) via Puppeteer.
// Usage: node export.js <carousel-id>
// Example: node export.js c1

const http = require('http');
const fs = require('fs');
const path = require('path');

const carouselId = process.argv[2];
if (!carouselId) {
  console.error('Usage: node export.js <carousel-id>');
  process.exit(1);
}
const SOURCE_DIR = path.join(__dirname, 'source');
const IMAGES_DIR = path.join(__dirname, '..', 'images');
const OUTPUTS_ROOT = path.join(__dirname, '..', '..', 'checkpoint');

const carouselNum = carouselId.replace(/\D/g, '');
const OUT_DIR = path.join(OUTPUTS_ROOT, carouselNum);

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function startServer(dir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      const decoded = decodeURIComponent(urlPath);
      const filePath = decoded.startsWith('/images/')
        ? path.join(IMAGES_DIR, decoded.slice('/images/'.length))
        : path.join(dir, decoded);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function run() {
  const puppeteer = require('puppeteer');

  // Clear first, not just mkdir: export always regenerates every slide for
  // this carousel, so a stale PNG from a previous run with a different slide
  // count (e.g. 07-slide.png left behind when this batch only has 6) must
  // not survive into the new output.
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { server, port } = await startServer(SOURCE_DIR);
  const url = `http://127.0.0.1:${port}/carousels/carousel.html?c=${carouselId}`;
  console.log(`Serving ${SOURCE_DIR} on port ${port}`);
  console.log(`Opening ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for Babel/React to finish rendering slides
    await page.waitForFunction(
      () => document.querySelectorAll('.slide-wrap').length >= 1,
      { timeout: 20000 }
    );

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);

    // Extra settle time for images and custom elements
    await new Promise((r) => setTimeout(r, 1500));

    const slides = await page.$$('.slide-wrap');
    console.log(`Found ${slides.length} .slide-wrap elements`);

    for (let i = 0; i < slides.length; i++) {
      const num = String(i + 1).padStart(2, '0');
      const outPath = path.join(OUT_DIR, `${num}-slide.png`);
      await slides[i].screenshot({ path: outPath, type: 'png' });
      console.log(`  Saved ${outPath}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\nDone — ${carouselId} exported to checkpoint/${carouselNum}/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
