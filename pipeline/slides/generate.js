#!/usr/bin/env node
// Generates c1-slides.jsx / c2-slides.jsx / c3-slides.jsx from pipeline/scripts/data/scripts.json
// and the normalized pipeline/images/ directory, then exports PNGs for all 3 carousels.
//
// Design: white background, Cormorant Garamond + IBM Plex Mono, bottle image + card on same slide.
// Usage: node generate.js   (run from pipeline/slides/, after pipeline/images/process-images.js)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const SCRIPTS_JSON = path.join(__dirname, '..', 'scripts', 'data', 'scripts.json');
const IMAGES_DIR = path.join(__dirname, '..', 'images');
const CAROUSELS_DIR = path.join(__dirname, 'source', 'carousels');

function resolveImages(carousels) {
  const missing = [];
  const resolved = [];

  for (const carousel of carousels) {
    let titleImg = null;
    if (carousel.titleStyle !== 'minimal') {
      titleImg = ['jpg', 'png', 'webp'].map(e => `c${carousel.num}-title.${e}`).find(f => fs.existsSync(path.join(IMAGES_DIR, f)));
      if (!titleImg) missing.push(`c${carousel.num}-title.jpg`);
    }

    const slides = carousel.slides.map(slide => {
      const bottle = `c${carousel.num}-s${slide.num}-bottle.jpg`;
      if (!fs.existsSync(path.join(IMAGES_DIR, bottle))) missing.push(bottle);

      const card = `c${carousel.num}-s${slide.num}-card.jpg`;
      if (!fs.existsSync(path.join(IMAGES_DIR, card))) missing.push(card);

      return { ...slide, bottle, card };
    });

    resolved.push({ ...carousel, slides, titleImg });
  }

  return { resolved, missing };
}

// Scale headline font size inversely with name length to fill the slide width.
function headlineFontSize(name) {
  const len = name.length;
  if (len <= 6)  return '130px';
  if (len <= 10) return '116px';
  if (len <= 16) return '96px';
  if (len <= 22) return '80px';
  return '68px';
}

function eyebrowLabel(brand, gender) {
  if (!gender || gender === 'unisex') return `${brand} · unisex`;
  return `${brand} · for ${gender}`;
}

function generateCarouselJsx(carousel) {
  const pad = n => String(n).padStart(2, '0');
  const sections = [];
  let i = 1;

  // Title slide — "minimal": white bg, centered black Cormorant Garamond, no photo.
  // Default "photo": Instrument Serif 400, 132px, dark photo bg + scrim-strong.
  if (carousel.titleStyle === 'minimal') {
    sections.push(`      {/* ── Slide ${pad(i)} — Title (minimal) ── */}
      <div className="slide-caption">${pad(i)} — Title</div>
      <div className="slide-wrap">
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '64px', color: '#161310', lineHeight: '1.05', textAlign: 'center', textWrap: 'balance', margin: 0 }}>${carousel.title}</h1>
        </div>
      </div>`);
  } else {
    sections.push(`      {/* ── Slide ${pad(i)} — Title ── */}
      <div className="slide-caption">${pad(i)} — Title</div>
      <div className="slide-wrap" style={{ position: 'relative' }}>
        <img src="/images/${carousel.titleImg}" alt="title background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(13,14,16,0.75) 0%, rgba(13,14,16,0.55) 50%, rgba(13,14,16,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, padding: '420px 96px 96px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: '132px', color: '#f4efe6', lineHeight: '1.0', textWrap: 'balance', margin: 0 }}>${carousel.title}</h1>
        </div>
      </div>`);
  }
  i++;

  for (const slide of carousel.slides) {
    const nSize = headlineFontSize(slide.name);
    const eyebrow = eyebrowLabel(slide.brand, slide.gender);

    sections.push(`      {/* ── Slide ${pad(i)} — ${slide.name} ── */}
      <div className="slide-caption">${pad(i)} — ${slide.name}</div>
      <div className="slide-wrap">
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: '#ffffff', padding: '90px 90px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '25px', fontWeight: 500, letterSpacing: '0.30em', color: '#161310', textTransform: 'uppercase' }}>${eyebrow}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '${nSize}', color: '#161310', lineHeight: '0.93', marginTop: '14px', textWrap: 'balance' }}>${slide.name}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '28px', fontWeight: 400, lineHeight: '1.5', color: '#161310', maxWidth: '720px', marginTop: '22px' }}>${slide.copy}</div>
          <div style={{ height: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '26px 0' }}>
            <img src="/images/${slide.bottle}" alt="${slide.name} bottle" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
          </div>
          <img src="/images/${slide.card}" alt="${slide.name} card" style={{ width: '560px', height: 'auto', borderRadius: '18px', display: 'block' }} />
        </div>
      </div>`);
    i++;
  }

  return `// c${carousel.num}-slides — "${carousel.title}"
// Generated by pipeline/slides/generate.js from pipeline/scripts/data/scripts.json.
// <br/> tweaks for line-wrapping are fine — re-run "node export.js c${carousel.num}" after editing.
// Structure: 1 title + (${carousel.slides.length} fragrances × 1) = ${1 + carousel.slides.length} slides

function SlideTemplate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#e8e6e0', alignItems: 'center' }}>
${sections.join('\n\n')}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SlideTemplate />);
`;
}

function run() {
  if (!fs.existsSync(SCRIPTS_JSON)) {
    console.error('! pipeline/scripts/data/scripts.json not found.');
    process.exit(1);
  }

  const { carousels } = JSON.parse(fs.readFileSync(SCRIPTS_JSON, 'utf8'));
  if (!carousels || carousels.length !== 3) {
    console.error(`! Expected 3 carousels in scripts.json, found ${carousels ? carousels.length : 0}.`);
    process.exit(1);
  }

  const { resolved, missing } = resolveImages(carousels);
  if (missing.length) {
    console.error('Missing images — run pipeline/images/process-images.js or place files manually:\n');
    for (const m of missing) console.error(`  - ${m}`);
    process.exit(1);
  }

  fs.mkdirSync(CAROUSELS_DIR, { recursive: true });

  for (const carousel of resolved) {
    const jsx = generateCarouselJsx(carousel);
    const outPath = path.join(CAROUSELS_DIR, `c${carousel.num}-slides.jsx`);
    fs.writeFileSync(outPath, jsx);
    console.log(`Wrote ${path.relative(ROOT, outPath)}`);
  }

  console.log('\nExporting PNGs...\n');
  for (const carousel of resolved) {
    execSync(`node export.js c${carousel.num}`, { cwd: __dirname, stdio: 'inherit' });
  }

  console.log('\nDone.');
}

run();
