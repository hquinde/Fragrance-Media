/* ─────────────────────────────────────────────────────────────
   C16 — "4 Realizations That Will Save You Thousands on Car Repairs"
   6-slide vertical carousel (1080 × 1920), Instagram / TikTok format.

   Each slide is a static .slide block. Background photo via
   <image-slot>, overlay scrim, then a stack of editorial type.
   ───────────────────────────────────────────────────────────── */

function PhoneEndSlide({ setup, payoff }) {
  const { IOSDevice, DashScreen } = window;
  return (
    <div className="slide" style={{ background: "var(--ink)", overflow: "hidden" }}>
      {/* Car hero — bleeds in from top */}
      <image-slot id="end-bg" shape="rect" src="assets/cle-53-amg.webp"></image-slot>
      {/* Gradient: photo at top fades to off-white by 58% */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, transparent 28%, var(--ink) 58%)",
        pointerEvents: "none"
      }}></div>
      {/* Phone mockup */}
      <div style={{
        position: "absolute", left: "50%", top: "30%",
        transform: "translate(-50%, -50%) scale(1.30)", transformOrigin: "center", zIndex: 2,
        filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.35)) drop-shadow(0 24px 30px rgba(0,0,0,0.2))"
      }}>
        <IOSDevice width={380} height={822} dark={true}>
          <DashScreen />
        </IOSDevice>
      </div>
      {/* Text */}
      <div style={{
        position: "absolute", top: "1320px", left: "90px", right: "90px",
        zIndex: 4, display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", gap: "24px"
      }}>
        {setup ? <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "104px", lineHeight: "1.0", letterSpacing: "-0.03em", color: "var(--paper)", margin: 0 }}>{setup}</p> : null}
        {payoff ? <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "104px", lineHeight: "1.0", letterSpacing: "-0.03em", color: "var(--paper)", margin: 0 }}>{payoff}</p> : null}
      </div>
    </div>
  );
}

function C16() {
  return (
    <>
      {/* ── 01 · Hook ─────────────────────────────────────────── */}
      <div className="slide-caption">01 / 06 · Hook</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c16-1-bg" shape="rect" placeholder="Cover · garage / wrench / fluids" src="assets/repairs/cover.jpeg"></image-slot>
          <div className="scrim scrim-top"></div>
          <div className="frame-counter">01 / 06</div>
          <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
            <div className="accent-rule"></div>
            <div className="eyebrow">Realizations</div>
            <h1 className="headline xl">4 realizations<br />that will save<br />you thousands<br />on repairs.</h1>
            <p className="subhead" style={{ maxWidth: "22ch" }}>The fixes you can avoid by knowing them now.</p>
          </div>
        </div>
      </div>

      {/* ── 02 · Coolant ─────────────────────────────────────── */}
      <div className="slide-caption">02 / 06 · Coolant</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c16-2-bg" shape="rect" placeholder="R01 · coolant reservoir / radiator" src="assets/repairs/coolant.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">02 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Realization 01 · Coolant</div>
            <h2 className="headline lg serif">Coolant is a<br />ticking clock.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Most coolant breaks down after 5 years — whether you've driven 5,000 miles or 50,000.</p>
          </div>
        </div>
      </div>

      {/* ── 03 · Filter ─────────────────────────────────────── */}
      <div className="slide-caption">03 / 06 · Filter</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c16-3-bg" shape="rect" placeholder="R02 · cabin filter / HVAC blower" src="assets/repairs/filter.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">03 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Realization 02 · Filter</div>
            <h2 className="headline lg serif">A $15 filter<br />protects a<br />$600 motor.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>A never-changed cabin air filter starves your HVAC blower motor — a $600 repair.</p>
          </div>
        </div>
      </div>

      {/* ── 04 · Brakes ─────────────────────────────────────── */}
      <div className="slide-caption">04 / 06 · Brakes</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c16-4-bg" shape="rect" placeholder="R03 · city traffic / brake pads" src="assets/repairs/brakes.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">04 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Realization 03 · Brakes</div>
            <h2 className="headline lg serif">City driving<br />destroys brakes<br />2–3× faster.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>City drivers replace brake pads 2–3× more often than highway drivers — same car, same year.</p>
          </div>
        </div>
      </div>

      {/* ── 05 · Tires ─────────────────────────────────────── */}
      <div className="slide-caption">05 / 06 · Tires</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c16-5-bg" shape="rect" placeholder="R04 · tire sidewall / date code" src="assets/repairs/tires.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">05 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Realization 04 · Tires</div>
            <h2 className="headline lg serif">Your tires age<br />even when<br />parked.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Rubber degrades from UV and ozone — tires over 6 years old are risky regardless of tread depth.</p>
          </div>
        </div>
      </div>

      {/* ── 06 · End / The app ───────────────────────────────── */}
      <div className="slide-caption">06 / 06 · End</div>
      <div className="slide-wrap">
        <PhoneEndSlide setup="Forget nothing." payoff={<>TrackAI.</>} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<C16 />);
