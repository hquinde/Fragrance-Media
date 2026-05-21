/* ─────────────────────────────────────────────────────────────
   C18 — "The trucks that hold their value — and the ones that don't."
   6-slide vertical carousel (1080 × 1920), Instagram / TikTok format.
   ───────────────────────────────────────────────────────────── */

function PhoneEndSlide({ setup, payoff }) {
  const { IOSDevice, DashScreen } = window;
  return (
    <div className="slide" style={{ background: "#f4efe6", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: "50%", top: "33%",
        transform: "translate(-50%, -50%) scale(1.30)", transformOrigin: "center", zIndex: 1,
        filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.25)) drop-shadow(0 24px 30px rgba(0,0,0,0.15))"
      }}>
        <IOSDevice width={380} height={822} dark={true}>
          <DashScreen />
        </IOSDevice>
      </div>
      <div style={{
        position: "absolute", top: "1280px", left: "90px", right: "90px",
        zIndex: 4, display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", gap: "24px"
      }}>
        {setup ? <p style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: "82px", lineHeight: "0.98", letterSpacing: "-0.035em", color: "#0d0e10", margin: 0, maxWidth: "18ch" }}>{setup}</p> : null}
        {payoff ? <h2 style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: "82px", lineHeight: "0.98", letterSpacing: "-0.035em", color: "#0d0e10", margin: 0, maxWidth: "18ch" }}>{payoff}</h2> : null}
      </div>
    </div>
  );
}

function C18() {
  return (
    <>
      {/* ── 01 · Hook ─────────────────────────────────────────── */}
      <div className="slide-caption">01 / 06 · Hook</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c18-1-bg" shape="rect" src="images/Truck.jpeg"></image-slot>
          <div className="scrim scrim-top"></div>
          <div className="frame-counter">01 / 06</div>
          <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
            <div className="accent-rule"></div>
            <div className="eyebrow">Trucks</div>
            <h1 className="headline xl">The trucks<br />that hold<br />their value —<br />and the ones<br />that don't.</h1>
            <p className="subhead" style={{ maxWidth: "22ch" }}>Which ones keep value. Which ones don't.</p>
          </div>
        </div>
      </div>

      {/* ── 02 · Tacoma ─────────────────────────────────────────── */}
      <div className="slide-caption">02 / 06 · Tacoma</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c18-2-bg" shape="rect" src="images/1T.webp"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">02 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Ranked 01 · Tacoma</div>
            <h2 className="headline lg serif">Tacoma retains<br />72% after<br />five years.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>After 5 years, the Tacoma retains roughly 72% of its original value — no other midsize comes close.</p>
          </div>
        </div>
      </div>

      {/* ── 03 · F-250 ─────────────────────────────────────────── */}
      <div className="slide-caption">03 / 06 · F-250</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c18-3-bg" shape="rect" src="images/2T.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">03 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Ranked 02 · F-250</div>
            <h2 className="headline lg serif">F-250 diesel<br />outlasts<br />the loan.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Diesel Super Duties depreciate slower than gas versions because buyers know they'll run past 300,000 miles.</p>
          </div>
        </div>
      </div>

      {/* ── 04 · Ram ─────────────────────────────────────────── */}
      <div className="slide-caption">04 / 06 · Ram</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c18-4-bg" shape="rect" src="images/3T.webp"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">04 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Ranked 03 · Ram 1500</div>
            <h2 className="headline lg serif">Ram Classic<br />is the<br />sleeper pick.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>The Classic trim holds value because fleet buyers keep demand high and supply tight.</p>
          </div>
        </div>
      </div>

      {/* ── 05 · Avoid ─────────────────────────────────────────── */}
      <div className="slide-caption">05 / 06 · Avoid</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c18-5-bg" shape="rect" src="images/4T.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">05 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Ranked 04 · Avoid</div>
            <h2 className="headline lg serif">Two trucks<br />that bleed<br />money fast.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Lincoln Blackwood and Chevy Avalanche lose up to 60% in three years — avoid them at sticker price.</p>
          </div>
        </div>
      </div>

      {/* ── 06 · End ─────────────────────────────────────────────── */}
      <div className="slide-caption">06 / 06 · End</div>
      <div className="slide-wrap">
        <PhoneEndSlide setup="Check your truck's real value —" payoff={<>TrackAI.</>} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<C18 />);
