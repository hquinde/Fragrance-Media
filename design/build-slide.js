// Slide-markup builder — copied as-is from 02-pipeline/generate.js's
// generateCarouselJsx() + helpers. This is the actual design: title-slide
// (dark photo bg + scrim), single-fragrance slide, and double (compare)
// slide layout, fonts, colors, spacing. Kept in the same JSX-string-
// templating style as the real pipeline on purpose — see design/CLAUDE.md
// for why.
//
// Deliberately NOT required by 02-pipeline/generate.js (yet) — this is a
// standalone copy for template experimentation, not the pipeline's source
// of truth. See design/CLAUDE.md.

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

// Compare slide — two fragrances stacked with brand/name, bottle+card images,
// and price on its own centered line ("C, take 5": price moved off the name
// row since name+price centering as a group threw off the eyebrow/name
// centering; plain black text, no pill/badge).
function compareRow(frag) {
  return `
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '60px', marginBottom: '24px', width: '100%' }}>
              <div style={{ width: '560px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '20px', fontWeight: 500, letterSpacing: '0.22em', color: '#161310', textTransform: 'uppercase' }}>${frag.brand}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '64px', color: '#161310', lineHeight: '0.95', marginTop: '10px', textWrap: 'balance' }}>${frag.name}</div>
              </div>
              <div style={{ width: '160px', flexShrink: 0, display: 'flex', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '36px', fontWeight: 500, color: '#161310' }}>${frag.price}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '48px', width: '100%' }}>
              <div style={{ flexShrink: 0, width: '380px', height: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/images/${frag.bottle}" alt="${frag.name} bottle" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
              </div>
              <img src="/images/${frag.card}" alt="${frag.name} card" style={{ width: '460px', height: 'auto', borderRadius: '14px', display: 'block' }} />
            </div>
          </div>`;
}

// Returns one full slide section (caption + slide-wrap), matching
// generateCarouselJsx's per-slide section style — `label` is the
// pre-formatted "NN — X vs Y" caption.
function generateCompareSlideJsx(label, a, b) {
  return `      <div className="slide-caption">${label}</div>
      <div className="slide-wrap">
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: '#ffffff', padding: '70px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          ${compareRow(a)}
          <div style={{ height: '2px', width: '100%', background: 'rgba(22,19,16,0.12)', margin: '40px 0' }} />
          ${compareRow(b)}
        </div>
      </div>`;
}

function generateCarouselJsx(carousel) {
  const pad = n => String(n).padStart(2, '0');
  const sections = [];
  let i = 1;

  // Title slide — dark photo bg + gradient scrim, Instrument Serif 400 132px headline.
  sections.push(`      {/* ── Slide ${pad(i)} — Title ── */}
      <div className="slide-caption">${pad(i)} — Title</div>
      <div className="slide-wrap" style={{ position: 'relative' }}>
        <img src="/images/${carousel.titleImg}" alt="title background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(13,14,16,0.75) 0%, rgba(13,14,16,0.55) 50%, rgba(13,14,16,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, padding: '420px 96px 96px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: '132px', color: '#f4efe6', lineHeight: '1.0', textWrap: 'balance', margin: 0 }}>${carousel.title}</h1>
        </div>
      </div>`);
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

  return `// Generated by design/preview.js from design/sample-data.js.

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

module.exports = { generateCarouselJsx, headlineFontSize, eyebrowLabel, generateCompareSlideJsx };
