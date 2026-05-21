/* ─────────────────────────────────────────────────────────────
   C19 — "The RV fees nobody warns you about."
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

function C19() {
  return (
    <>
      {/* ── 01 · Hook ─────────────────────────────────────────── */}
      <div className="slide-caption">01 / 06 · Hook</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c19-1-bg" shape="rect" src="images/RV.webp"></image-slot>
          <div className="scrim scrim-top"></div>
          <div className="frame-counter">01 / 06</div>
          <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
            <div className="accent-rule"></div>
            <div className="eyebrow">RV Fees</div>
            <h1 className="headline xl">The RV fees<br />nobody warns<br />you about.</h1>
            <p className="subhead" style={{ maxWidth: "22ch" }}>The numbers they don't put in the brochure.</p>
          </div>
        </div>
      </div>

      {/* ── 02 · Slide-outs ─────────────────────────────────────── */}
      <div className="slide-caption">02 / 06 · Slide-outs</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c19-2-bg" shape="rect" src="images/RV1.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">02 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Fee 01 · Slide-outs</div>
            <h2 className="headline lg serif">Slide-out repairs<br />average $1,500<br />per incident.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Most buyers never budget for slide mechanisms — and they fail far more often than dealers admit.</p>
          </div>
        </div>
      </div>

      {/* ── 03 · Roof seals ─────────────────────────────────────── */}
      <div className="slide-caption">03 / 06 · Roof seals</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c19-3-bg" shape="rect" src="images/RV2.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">03 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Fee 02 · Roof Seals</div>
            <h2 className="headline lg serif">One missed roof<br />seal costs<br />$8,000.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>One missed inspection and a single season of rain turns into $8,000 in interior water damage.</p>
          </div>
        </div>
      </div>

      {/* ── 04 · Storage ─────────────────────────────────────────── */}
      <div className="slide-caption">04 / 06 · Storage</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c19-4-bg" shape="rect" src="images/RV3.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">04 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Fee 03 · Storage</div>
            <h2 className="headline lg serif">Storage costs<br />more than your<br />car payment.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Covered RV storage in most states runs $200–$500 a month — year-round, not just winter.</p>
          </div>
        </div>
      </div>

      {/* ── 05 · Depreciation ─────────────────────────────────────── */}
      <div className="slide-caption">05 / 06 · Depreciation</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c19-5-bg" shape="rect" src="images/RV4.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">05 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Fee 04 · Depreciation</div>
            <h2 className="headline lg serif">RVs lose 25%<br />the day they<br />leave the lot.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>A new Class A motorhome loses up to 25% the moment it leaves the lot.</p>
          </div>
        </div>
      </div>

      {/* ── 06 · End ─────────────────────────────────────────────── */}
      <div className="slide-caption">06 / 06 · End</div>
      <div className="slide-wrap">
        <PhoneEndSlide setup="Pull your RV's full report —" payoff={<>TrackAI.</>} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<C19 />);
