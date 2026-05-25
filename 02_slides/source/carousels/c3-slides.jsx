function Carousel3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#111', alignItems: 'center' }}>

      {/* ── 01 — Title ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-title.png" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '420px', gap: '32px' }}>
            <h1 className="headline lg serif">Top 3 men's<br />fragrances from<br />Parfums de Marly.</h1>
          </div>
        </div>
      </div>

      {/* ── 02 — Layton Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-layton.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Parfums de Marly</p>
            <h2 className="headline lg serif">Layton.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Apple, vanilla, pepper — the crowd-pleaser that somehow still feels exclusive.</p>
          </div>
        </div>
      </div>

      {/* ── 03 — Layton Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-layton.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c3-s1-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 04 — Herod Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-herod.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Parfums de Marly</p>
            <h2 className="headline lg serif">Herod.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Tobacco and vanilla pushed to their absolute limit.<br />Winter's best-dressed scent.</p>
          </div>
        </div>
      </div>

      {/* ── 05 — Herod Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-herod.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c3-s2-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 06 — Pegasus Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-pegasus.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Parfums de Marly</p>
            <h2 className="headline lg serif">Pegasus.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Bergamot, lavender, vanilla — clean and completely addictive.<br />People assume it costs twice as much.</p>
          </div>
        </div>
      </div>

      {/* ── 07 — Pegasus Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c3-pegasus.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c3-s3-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Carousel3 />);
