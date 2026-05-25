function Carousel1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#111', alignItems: 'center' }}>

      {/* ── 01 — Title ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-title.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '420px', gap: '32px' }}>
            <h1 className="headline xl serif">NEED a fragrance<br />for work?</h1>
          </div>
        </div>
      </div>

      {/* ── 02 — Acqua di Giò Profumo Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-acqua-di-gi-profumo.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Giorgio Armani</p>
            <h2 className="headline lg serif">Acqua di Giò<br />Profumo.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Aquatic, smoky, effortlessly sharp.<br />The scent of someone who closes deals.</p>
          </div>
        </div>
      </div>

      {/* ── 03 — Acqua di Giò Profumo Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-acqua-di-gi-profumo.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c1-s1-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 04 — Terre d'Hermès EDP Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-terre-d-herm-s-edp.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Hermès</p>
            <h2 className="headline lg serif">Terre d'Hermès<br />EDP.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Earth and mineral, perfectly refined.<br />Quiet confidence in a bottle.</p>
          </div>
        </div>
      </div>

      {/* ── 05 — Terre d'Hermès EDP Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-terre-d-herm-s-edp.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c1-s2-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 06 — Reflection Man Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-reflection-man.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Amouage</p>
            <h2 className="headline lg serif">Reflection<br />Man.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Clean beyond clean.<br />Walks into the room before you do.</p>
          </div>
        </div>
      </div>

      {/* ── 07 — Reflection Man Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-reflection-man.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c1-s3-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 08 — Ani Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-ani.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Nishane</p>
            <h2 className="headline lg serif">Ani.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Iris, musk, and something you can't quite name.<br />The scent of someone who doesn't need to explain themselves.</p>
          </div>
        </div>
      </div>

      {/* ── 09 — Ani Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-ani.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c1-s4-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 10 — Colonia Futura Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-colonia-futura.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Acqua di Parma</p>
            <h2 className="headline lg serif">Colonia<br />Futura.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Citrus that doesn't quit.<br />Italian elegance from 9 to 5 and beyond.</p>
          </div>
        </div>
      </div>

      {/* ── 11 — Colonia Futura Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c1-colonia-futura.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c1-s5-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Carousel1 />);
