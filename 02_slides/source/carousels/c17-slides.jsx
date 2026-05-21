/* ─────────────────────────────────────────────────────────────
   C17 — "The most expensive motorcycle mistakes — ranked."
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

function C17() {
  return (
    <>
      {/* ── 01 · Hook ─────────────────────────────────────────── */}
      <div className="slide-caption">01 / 06 · Hook</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c17-1-bg" shape="rect" src="images/Motorcycle.webp"></image-slot>
          <div className="scrim scrim-top"></div>
          <div className="frame-counter">01 / 06</div>
          <div className="content top" style={{ paddingTop: "420px", gap: "32px" }}>
            <div className="accent-rule"></div>
            <div className="eyebrow">Mistakes</div>
            <h1 className="headline xl">The most<br />expensive<br />motorcycle<br />mistakes — ranked.</h1>
            <p className="subhead" style={{ maxWidth: "22ch" }}>The mistakes that bleed your wallet before you notice.</p>
          </div>
        </div>
      </div>

      {/* ── 02 · Chain ─────────────────────────────────────────── */}
      <div className="slide-caption">02 / 06 · Chain</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c17-2-bg" shape="rect" src="images/1M.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">02 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Mistake 01 · Chain</div>
            <h2 className="headline lg serif">Chain neglect<br />costs more<br />than the bike.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>A dry, stretched chain can destroy your sprockets and gearbox in under 500 miles.</p>
          </div>
        </div>
      </div>

      {/* ── 03 · Tires ─────────────────────────────────────────── */}
      <div className="slide-caption">03 / 06 · Tires</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c17-3-bg" shape="rect" src="images/2M.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">03 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Mistake 02 · Tires</div>
            <h2 className="headline lg serif">Tires that<br />look fine<br />aren't.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Age degrades rubber faster than wear — a 6-year-old tire is a liability, not a savings.</p>
          </div>
        </div>
      </div>

      {/* ── 04 · Valves ─────────────────────────────────────────── */}
      <div className="slide-caption">04 / 06 · Valves</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c17-4-bg" shape="rect" src="images/3M.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">04 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Mistake 03 · Valves</div>
            <h2 className="headline lg serif">Skipping valve<br />checks is a<br />$2,000 gamble.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Missed valve clearances burn out engines quietly — no warning light, no second chance.</p>
          </div>
        </div>
      </div>

      {/* ── 05 · Storage ─────────────────────────────────────────── */}
      <div className="slide-caption">05 / 06 · Storage</div>
      <div className="slide-wrap">
        <div className="slide">
          <image-slot id="c17-5-bg" shape="rect" src="images/4M.jpeg"></image-slot>
          <div className="scrim scrim-strong"></div>
          <div className="frame-counter">05 / 06</div>
          <div className="content top" style={{ paddingTop: "220px", gap: "32px" }}>
            <div className="eyebrow">Mistake 04 · Storage</div>
            <h2 className="headline lg serif">Storage kills<br />more bikes<br />than crashes.</h2>
            <div className="accent-rule" style={{ marginTop: "8px" }}></div>
            <p className="body wide" style={{ marginTop: "8px" }}>Three months without a fuel stabilizer turns a carburetor into a $400 cleaning job.</p>
          </div>
        </div>
      </div>

      {/* ── 06 · End ─────────────────────────────────────────────── */}
      <div className="slide-caption">06 / 06 · End</div>
      <div className="slide-wrap">
        <PhoneEndSlide setup="Know your motorcycle's history —" payoff={<>TrackAI.</>} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<C17 />);
