// slide-template — Fragrance Collective carousel template

function SlideTemplate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48, background: '#111', alignItems: 'center' }}>

      {/* ── Slide 01 — Hook ── */}
      <div className="slide-caption">01 / 06 — Hook</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-1-bg" shape="rect" src="assets/repairs/cover.jpeg"></image-slot>
          <div className="scrim scrim-top"></div>
          <div className="content top" style={{ paddingTop: '420px', gap: '32px' }}>
            <h1 className="headline xl">4 realizations<br />that will save<br />you thousands<br />on repairs.</h1>
            <div className="accent-rule"></div>
            <p className="subhead">The fixes you can avoid by knowing them now.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 02 — Coolant ── */}
      <div className="slide-caption">02 / 06 — Coolant</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-2-bg" shape="rect" src="assets/repairs/coolant.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <h2 className="headline lg serif">Coolant is a<br />ticking clock.</h2>
            <div className="accent-rule"></div>
            <p className="body wide">Most coolant breaks down after 5 years — whether you've driven 5,000 miles or 50,000.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 03 — Filter ── */}
      <div className="slide-caption">03 / 06 — Filter</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-3-bg" shape="rect" src="assets/repairs/filter.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <h2 className="headline lg serif">A $15 filter<br />protects a<br />$600 motor.</h2>
            <div className="accent-rule"></div>
            <p className="body wide">A never-changed cabin air filter starves your HVAC blower motor — a $600 repair.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 04 — Brakes ── */}
      <div className="slide-caption">04 / 06 — Brakes</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-4-bg" shape="rect" src="assets/repairs/brakes.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <h2 className="headline lg serif">City driving<br />destroys brakes<br />2–3× faster.</h2>
            <div className="accent-rule"></div>
            <p className="body wide">City drivers replace brake pads 2–3× more often than highway drivers — same car, same year.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 05 — Tires ── */}
      <div className="slide-caption">05 / 06 — Tires</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-5-bg" shape="rect" src="assets/repairs/tires.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <h2 className="headline lg serif">Your tires age<br />even when<br />parked.</h2>
            <div className="accent-rule"></div>
            <p className="body wide">Rubber degrades from UV and ozone — tires over 6 years old are risky regardless of tread depth.</p>
          </div>
        </div>
      </div>

      {/* ── Slide 06 — Closing ── */}
      <div className="slide-caption">06 / 06 — Closing</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="st-6-bg" shape="rect" src="assets/repairs/tires.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">06 / 06</div>
          <div className="content top" style={{ paddingTop: '220px', gap: '32px' }}>
            <div className="eyebrow">Slide 06 · Topic</div>
            <h2 className="headline lg serif">Headline<br />goes here.</h2>
            <div className="accent-rule"></div>
            <p className="body wide">One sentence of body copy.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SlideTemplate />);
