#!/usr/bin/env node
// Self-contained preview renderer for design/ — completely independent of
// 02-pipeline/export.js and 02-pipeline/generate.js. Renders exactly 2
// slides (title + one content slide) from the real sample data in
// sample-data.js, using build-slide.js's markup builder, and screenshots
// them to design/preview-output/.
//
// Usage: node design/preview.js            (1 fragrance per content slide)
//        node design/preview.js 3           (first 3 fragrances in the one content slide — for a denser template variant)

const fs = require('fs');
const path = require('path');
const http = require('http');

const { generateCarouselJsx } = require('./build-slide');
const sampleData = require('./sample-data');

const HERE = __dirname;
const SAMPLES_DIR = path.join(HERE, 'samples');
const OUT_DIR = path.join(HERE, 'preview-output');
const TMP_JSX = path.join(HERE, 'preview-slides.jsx');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const filePath = urlPath.startsWith('/images/')
        ? path.join(SAMPLES_DIR, urlPath.slice('/images/'.length))
        : path.join(HERE, urlPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

async function run() {
  const puppeteer = require('puppeteer');

  const fragranceCount = Math.max(1, parseInt(process.argv[2], 10) || 1);
  const previewCarousel = {
    title: sampleData.title,
    titleImg: sampleData.titleImg,
    slides: sampleData.slides.slice(0, fragranceCount), // one content slide, using N fragrances' worth of data
  };

  fs.writeFileSync(TMP_JSX, generateCarouselJsx(previewCarousel));
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { server, port } = await startServer();
  const url = `http://127.0.0.1:${port}/base.html?c=preview`;
  console.log(`Serving ${HERE} on port ${port}`);
  console.log(`Opening ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    await page.waitForFunction(
      () => document.querySelectorAll('.slide-wrap').length >= 1,
      { timeout: 20000 }
    );
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1500));

    const slides = await page.$$('.slide-wrap');
    console.log(`Found ${slides.length} .slide-wrap elements`);

    const labels = ['title', 'content'];
    for (let i = 0; i < slides.length; i++) {
      const outPath = path.join(OUT_DIR, `${labels[i] || `slide-${i + 1}`}.png`);
      await slides[i].screenshot({ path: outPath, type: 'png' });
      console.log(`  Saved ${outPath}`);
    }
  } finally {
    await browser.close();
    server.close();
    fs.rmSync(TMP_JSX, { force: true });
  }

  console.log(`\nDone — preview exported to design/preview-output/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
