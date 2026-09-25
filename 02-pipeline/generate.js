#!/usr/bin/env node
// Generates c1-slides.jsx / c2-slides.jsx / c3-slides.jsx from scripts.json
// and the downloaded images in this folder, then exports PNGs for all 3 carousels.
//
// Design: brand grey (#E1E1E1) + black, Cormorant Garamond + IBM Plex Mono, bottle image + card on
// same slide, the brand logo's rule + three stars as a divider. Mirrors design/build-slide.js.
// Usage: node 02-pipeline/generate.js   (cwd-independent, after process-images.js)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SCRIPTS_JSON = path.join(__dirname, 'scripts.json');
const IMAGES_DIR = __dirname;
const CAROUSELS_DIR = path.join(__dirname, 'source', 'carousels');

function resolveImages(carousels) {
  const missing = [];
  const resolved = [];

  for (const carousel of carousels) {
    const titleImg = ['jpg', 'png', 'webp'].map(e => `c${carousel.num}-title.${e}`).find(f => fs.existsSync(path.join(IMAGES_DIR, f)));
    if (!titleImg) missing.push(`c${carousel.num}-title.jpg`);

    const slides = carousel.slides.map(slide => {
      if (carousel.contentType === 'double') {
        const resolveSide = (side, letter) => {
          const bottle = `c${carousel.num}-s${slide.num}${letter}-bottle.jpg`;
          if (!fs.existsSync(path.join(IMAGES_DIR, bottle))) missing.push(bottle);
          const card = `c${carousel.num}-s${slide.num}${letter}-card.jpg`;
          if (!fs.existsSync(path.join(IMAGES_DIR, card))) missing.push(card);
          return { ...side, bottle, card };
        };
        return { ...slide, a: resolveSide(slide.a, 'a'), b: resolveSide(slide.b, 'b') };
      }

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

// Brand palette + mark (design/brand.png, colors in design/CONTEXT.md): grey, black, three stars.
const BG = '#E1E1E1';
const INK = '#000000';
const STAR_POINTS = '12,1.2 14.8,8.4 22.6,8.9 16.6,13.9 18.5,21.6 12,17.4 5.5,21.6 7.4,13.9 1.4,8.9 9.2,8.4';

function star(size, color) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style={{ display: 'block' }}><polygon points="${STAR_POINTS}" fill="${color}" /></svg>`;
}

// The logo's rule with three stars centered on it — full-width divider.
function ruleStars(size, color, margin) {
  const line = `<div style={{ flex: 1, height: '2px', background: '${color}' }} />`;
  const stars = `<div style={{ display: 'flex', gap: '${Math.round(size * 0.85)}px', alignItems: 'center' }}>${star(size, color)}${star(size, color)}${star(size, color)}</div>`;
  return `<div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '${Math.round(size * 1.1)}px', margin: '${margin}' }}>${line}${stars}${line}</div>`;
}

// Compare slide — two fragrances stacked with brand/name, bottle+card images,
// and price on its own centered line. Copied as-is from design/build-slide.js.
function compareRow(frag) {
  return `
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '60px', marginBottom: '24px', width: '100%' }}>
              <div style={{ width: '560px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '20px', fontWeight: 500, letterSpacing: '0.22em', color: '${INK}', textTransform: 'uppercase' }}>${frag.brand}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '64px', color: '${INK}', lineHeight: '0.95', marginTop: '10px', textWrap: 'balance' }}>${frag.name}</div>
              </div>
              <div style={{ width: '160px', flexShrink: 0, display: 'flex', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '36px', fontWeight: 500, color: '${INK}' }}>${frag.price}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '48px', width: '100%' }}>
              <div style={{ flexShrink: 0, width: '380px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/images/${frag.bottle}" alt="${frag.name} bottle" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <img src="/images/${frag.card}" alt="${frag.name} card" style={{ width: '460px', height: 'auto', borderRadius: '14px', display: 'block' }} />
            </div>
          </div>`;
}

function generateCompareSlideJsx(label, a, b) {
  return `      <div className="slide-caption">${label}</div>
      <div className="slide-wrap">
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: '${BG}', padding: '70px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          ${compareRow(a)}
          ${ruleStars(30, INK, '44px 0')}
          ${compareRow(b)}
        </div>
      </div>`;
}

function generateCarouselJsx(carousel) {
  const pad = n => String(n).padStart(2, '0');
  const sections = [];
  let i = 1;

  // Title slide — dark photo bg + black gradient scrim, Instrument Serif 400 132px grey headline, rule + stars under it.
  sections.push(`      {/* ── Slide ${pad(i)} — Title ── */}
      <div className="slide-caption">${pad(i)} — Title</div>
      <div className="slide-wrap" style={{ position: 'relative' }}>
        <img src="/images/${carousel.titleImg}" alt="title background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, padding: '420px 96px 96px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: '132px', color: '${BG}', lineHeight: '1.0', textWrap: 'balance', margin: 0 }}>${carousel.title}</h1>
          ${ruleStars(40, BG, '20px 0 0')}
        </div>
      </div>`);
  i++;

  for (const slide of carousel.slides) {
    if (carousel.contentType === 'double') {
      const label = `${pad(i)} — ${slide.a.name} vs ${slide.b.name}`;
      sections.push(`      {/* ── Slide ${label} ── */}\n${generateCompareSlideJsx(label, slide.a, slide.b)}`);
      i++;
      continue;
    }

    const nSize = headlineFontSize(slide.name);
    const eyebrow = eyebrowLabel(slide.brand, slide.gender);

    sections.push(`      {/* ── Slide ${pad(i)} — ${slide.name} ── */}
      <div className="slide-caption">${pad(i)} — ${slide.name}</div>
      <div className="slide-wrap">
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: '${BG}', padding: '90px 90px 70px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '25px', fontWeight: 500, letterSpacing: '0.30em', color: '${INK}', textTransform: 'uppercase' }}>${eyebrow}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '${nSize}', color: '${INK}', lineHeight: '0.93', marginTop: '14px', textWrap: 'balance' }}>${slide.name}</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '28px', fontWeight: 400, lineHeight: '1.5', color: '${INK}', maxWidth: '720px', marginTop: '22px' }}>${slide.copy}</div>
          ${ruleStars(30, INK, '40px 0 0')}
          <div style={{ height: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '26px 0' }}>
            <img src="/images/${slide.bottle}" alt="${slide.name} bottle" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <img src="/images/${slide.card}" alt="${slide.name} card" style={{ width: '560px', height: 'auto', borderRadius: '18px', display: 'block' }} />
        </div>
      </div>`);
    i++;
  }

  return `// c${carousel.num}-slides — "${carousel.title}"
// Generated by 02-pipeline/generate.js from scripts.json.
// <br/> tweaks for line-wrapping are fine — re-run "node export.js c${carousel.num}" after editing.
// Structure: 1 title + (${carousel.slides.length} fragrances × 1) = ${1 + carousel.slides.length} slides

function SlideTemplate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '${BG}', alignItems: 'center' }}>
${sections.join('\n\n')}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SlideTemplate />);
`;
}

function run() {
  if (!fs.existsSync(SCRIPTS_JSON)) {
    console.error('! scripts.json not found.');
    process.exit(1);
  }

  const { carousels, day } = JSON.parse(fs.readFileSync(SCRIPTS_JSON, 'utf8'));
  if (!carousels || carousels.length !== 3) {
    console.error(`! Expected 3 carousels in scripts.json, found ${carousels ? carousels.length : 0}.`);
    process.exit(1);
  }
  const VALID_DAYS = new Set(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  if (!VALID_DAYS.has(day)) {
    console.error(`! scripts.json needs a top-level "day" field, one of: ${[...VALID_DAYS].join(', ')}`);
    process.exit(1);
  }

  const { resolved, missing } = resolveImages(carousels);
  if (missing.length) {
    console.error('Missing images — run process-images.js or place files manually:\n');
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
    execSync(`node export.js c${carousel.num} ${day}`, { cwd: __dirname, stdio: 'inherit' });
  }

  console.log('\nDone.');
}

run();
