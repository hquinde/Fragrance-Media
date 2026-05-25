// slide-template — Fragrance Collective carousel template
// Design B: each fragrance = content slide + Fragrantica card slide
// Structure: 1 title + (N fragrances × 2) slides

function SlideTemplate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#111', alignItems: 'center' }}>

      {/* ── Slide 01 — Title ── */}
      <div className="slide-caption">01 — Title</div>
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/cN-title.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '420px', gap: '32px' }}>
            <h1 className="headline xl serif">Title goes<br />here.</h1>
          </div>
        </div>
      </div>

      {/* ── Slide 02 — Fragrance 1 Content ── */}
      <div className="slide-caption">02 — Fragrance 1 content</div>
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/cN-fragrance-slug.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Brand Name</p>
            <h2 className="headline lg serif">Fragrance<br />Name.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">One punchy line.<br />Second punchy line.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 03 — Fragrance 1 Card ── */}
      <div className="slide-caption">03 — Fragrance 1 card</div>
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/cN-fragrance-slug.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/cN-s1-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SlideTemplate />);
