function Carousel2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#111', alignItems: 'center' }}>

      {/* ── 01 — Title ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-title.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '420px', gap: '32px' }}>
            <h1 className="headline xl serif">NEED a fragrance<br />for a date?</h1>
          </div>
        </div>
      </div>

      {/* ── 02 — La Nuit de l'Homme Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-la-nuit-de-l-homme.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Yves Saint Laurent</p>
            <h2 className="headline lg serif">La Nuit de<br />l'Homme.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Cardamom, cedar, and something dangerously close to seduction.<br />The original date-night fragrance.</p>
          </div>
        </div>
      </div>

      {/* ── 03 — La Nuit de l'Homme Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-la-nuit-de-l-homme.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c2-s1-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 04 — Tobacco Vanille Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-tobacco-vanille.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Tom Ford</p>
            <h2 className="headline lg serif">Tobacco<br />Vanille.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Rich, warm, impossible to ignore.<br />Wear it when you want to be remembered.</p>
          </div>
        </div>
      </div>

      {/* ── 05 — Tobacco Vanille Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-tobacco-vanille.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c2-s2-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 06 — Myths Man Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-myths-man.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Amouage</p>
            <h2 className="headline lg serif">Myths<br />Man.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Spicy, dark, and magnetic.<br />The fragrance equivalent of a very good story.</p>
          </div>
        </div>
      </div>

      {/* ── 07 — Myths Man Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-myths-man.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c2-s3-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* ── 08 — Black Phantom Content ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-black-phantom.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '26px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', margin: 0 }}>Kilian</p>
            <h2 className="headline lg serif">Black<br />Phantom.</h2>
            <div className="accent-rule" style={{ display: 'block', background: 'var(--ink)' }}></div>
            <p className="body wide">Coffee, rum, and vanilla in a bottle that looks like trouble.<br />Smells exactly as good as it sounds.</p>
          </div>
        </div>
      </div>

      {/* ── 09 — Black Phantom Card ── */}
      <div className="slide-wrap">
        <div className="slide">
          <img className="slide-bg" src="/images/c2-black-phantom.jpg" />
          <div className="scrim scrim-strong"></div>
          <div className="content center" style={{ padding: '96px' }}>
            <img src="/images/c2-s4-card.jpg" style={{ width: '100%', borderRadius: '20px', display: 'block', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Carousel2 />);
