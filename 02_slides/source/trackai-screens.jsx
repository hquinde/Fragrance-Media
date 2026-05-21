/* TrackAI in-phone screens — composed inside an IOSDevice frame.
   Each screen fills 100% of the IOSDevice content area. */

const { useState, useEffect } = React;

/* ── Common header inside the screen (under the status bar) ── */
function TAHeader({ title }) {
  if (!title) return null;
  return (
    <div className="ta-header">
      <div className="title">{title}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screen A — Garage / Vehicle detail
   ───────────────────────────────────────────── */
function GarageScreen() {
  return (
    <div className="ta-screen garage">
      <div className="scroll">
        <TAHeader title="My Garage" badge="JS" />

        <div className="hero">
          <image-slot id="car-hero-A" placeholder="Your car — hero shot" className="hero-img"></image-slot>
          <div className="hero-grad"></div>
          <div className="hero-meta">
            <div>
              <div className="car-name">'18 BMW M2</div>
              <div className="trim">Long Beach Blue · Manual</div>
            </div>
            <div className="miles">
              34,612
              <span className="small">miles</span>
            </div>
          </div>
        </div>

        <div className="quick">
          <div className="tile">
            <div className="k">Oil change</div>
            <div className="v hot">in ~800 mi</div>
          </div>
          <div className="tile">
            <div className="k">Avg MPG</div>
            <div className="v">22.4 <span className="small">↓ 11%</span></div>
          </div>
          <div className="tile">
            <div className="k">Last track</div>
            <div className="v">VIR <span className="small">04/28</span></div>
          </div>
          <div className="tile">
            <div className="k">Logs total</div>
            <div className="v">390</div>
          </div>
        </div>

        <div className="log-head">
          <div className="label">Recent activity</div>
          <div className="more">All →</div>
        </div>

        <div className="log">
          <div className="row">
            <div className="icon hot">⚙</div>
            <div className="text">
              <div className="t">Cold-air intake installed</div>
              <div className="s">Mod · Apr 3 · 33,810 mi</div>
            </div>
            <div className="right">$489</div>
          </div>
          <div className="row">
            <div className="icon">⛽</div>
            <div className="text">
              <div className="t">Fill — 93 oct, Shell</div>
              <div className="s">Fuel · May 11 · 14.2 gal</div>
            </div>
            <div className="right">21.8 mpg</div>
          </div>
          <div className="row">
            <div className="icon">🏁</div>
            <div className="text">
              <div className="t">VIR — 17 laps, PB 2:08.4</div>
              <div className="s">Track · Apr 28 · session #17</div>
            </div>
            <div className="right">+1.2s</div>
          </div>
          <div className="row">
            <div className="icon">🛢</div>
            <div className="text">
              <div className="t">Oil change — Mobil 1 0W-20</div>
              <div className="s">Maint · Feb 12 · Pep Boys</div>
            </div>
            <div className="right">$89</div>
          </div>
        </div>

        <div className="ai-prompt">
          <div className="spark">✦</div>
          <div className="ask">Ask TrackAI anything about your car…</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screen B — AI Chat
   ───────────────────────────────────────────── */
function ChatScreen() {
  return (
    <div className="ta-screen chat-screen">
      <div className="scroll">
        <div className="chat-head">
          <div className="av">✦</div>
          <div className="who">
            <div className="name">TrackAI</div>
            <div className="sub"><span className="live"></span>Grounded in your data</div>
          </div>
        </div>

        <div className="messages">
          <div className="bubble u">When's my next oil change due?</div>

          <div className="bubble ai">
            You changed it <span className="accent">4,200 mi ago</span> — Mobil 1 0W-20, Pep Boys, $89, on Feb 12.<br/>
            At your avg <span className="accent">850 mi/mo</span>, you're due in <span className="accent">~800 mi</span> (mid-June).
          </div>
          <div className="src">Sources · log #142 · fuel log Feb–May</div>

          <div className="bubble u">And why did my MPG drop?</div>

          <div className="bubble ai">
            Down 11% since the <span className="accent">cold-air intake</span> on Apr 3. Expected without a tune. Want me to flag a tune appointment?
          </div>
          <div className="src">Sources · mod log · fuel log</div>

          <div className="typing">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="composer">
          <div className="input">Ask about your car…</div>
          <div className="send">↑</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screen C — Dashboard / timeline
   Hero card on top shows the car image.
   ───────────────────────────────────────────── */
function DashScreen() {
  // Spark line
  const pts = [
    [0,40],[20,32],[40,36],[60,28],[80,22],[100,30],
    [120,24],[140,28],[160,42],[180,48],[200,44],[220,50]
  ];
  const d = "M " + pts.map(p => p.join(" ")).join(" L ");

  return (
    <div className="ta-screen dash">
      <div className="scroll">
        <TAHeader title="" badge="JS" />

        <div className="car-card">
          <img src="assets/car-hero.webp" alt="" className="car-card-img" />
          <div className="car-card-grad"></div>
          <div className="car-card-plate">KA·QP 53</div>
          <div className="car-card-meta">
            <div className="car-card-name">
              <div className="car-name">Mercedes AMG</div>
              <div className="trim">CLE 53 · Matte Black</div>
            </div>
            <div className="miles">
              34,612<span className="small">mi</span>
            </div>
          </div>
        </div>

        <div className="top-row">
          <div className="chip">
            <div className="k">Service in</div>
            <div className="v accent">800 mi</div>
            <div className="delta down">Oil · soon</div>
          </div>
          <div className="chip">
            <div className="k">Spend YTD</div>
            <div className="v">$2,840</div>
            <div className="delta">▴ on budget</div>
          </div>
        </div>

        <div className="mpg-card">
          <div className="mpg-head">
            <div className="label">MPG · last 12 fills</div>
            <div className="now">22.4<span className="small">mpg</span></div>
          </div>
          <svg className="spark" viewBox="0 0 220 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gFill-dash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4efe6" stopOpacity="0.45"/>
                <stop offset="100%" stopColor="#f4efe6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={d + " L 220 60 L 0 60 Z"} fill="url(#gFill-dash)" />
            <path d={d} fill="none" stroke="#f4efe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="220" cy="50" r="3" fill="#f4efe6"/>
          </svg>
        </div>

        <div className="activity">
          <div className="label">Timeline</div>
          <div className="timeline">
            <div className="row">
              <div className="date">MAY 11</div>
              <div className="t"><span className="tag">FUEL</span>Shell 98 · 14.2 gal</div>
              <div className="cost">$58</div>
            </div>
            <div className="row">
              <div className="date">APR 28</div>
              <div className="t"><span className="tag">TRACK</span>Nürburgring — PB 8:14</div>
              <div className="cost">+1.2s</div>
            </div>
            <div className="row">
              <div className="date">APR 03</div>
              <div className="t"><span className="tag">MOD</span>AMG ceramic coating</div>
              <div className="cost">$890</div>
            </div>
            <div className="row">
              <div className="date">FEB 12</div>
              <div className="t"><span className="tag">MAINT</span>Mobil 1 ESP 0W-30</div>
              <div className="cost">$140</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DashScreenLight — same data, light-mode skin.
   Add `.light` to the .ta-screen root and swap
   sparkline strokes to ink so it reads on paper.
   ───────────────────────────────────────────── */
function DashScreenLight() {
  const pts = [
    [0,40],[20,32],[40,36],[60,28],[80,22],[100,30],
    [120,24],[140,28],[160,42],[180,48],[200,44],[220,50]
  ];
  const d = "M " + pts.map(p => p.join(" ")).join(" L ");
  const inkLine = "#1a1814";

  return (
    <div className="ta-screen dash light">
      <div className="scroll">
        <div className="car-card">
          <img src="assets/car-hero.webp" alt="" className="car-card-img" />
          <div className="car-card-grad"></div>
          <div className="car-card-plate">KA·QP 53</div>
          <div className="car-card-meta">
            <div className="car-card-name">
              <div className="car-name">Mercedes AMG</div>
              <div className="trim">CLE 53 · Matte Black</div>
            </div>
            <div className="miles">
              34,612<span className="small">mi</span>
            </div>
          </div>
        </div>

        <div className="top-row">
          <div className="chip">
            <div className="k">Service in</div>
            <div className="v accent">800 mi</div>
            <div className="delta down">Oil · soon</div>
          </div>
          <div className="chip">
            <div className="k">Spend YTD</div>
            <div className="v">$2,840</div>
            <div className="delta">▴ on budget</div>
          </div>
        </div>

        <div className="mpg-card">
          <div className="mpg-head">
            <div className="label">MPG · last 12 fills</div>
            <div className="now">22.4<span className="small">mpg</span></div>
          </div>
          <svg className="spark" viewBox="0 0 220 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gFill-dash-light-shared" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={inkLine} stopOpacity="0.18"/>
                <stop offset="100%" stopColor={inkLine} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={d + " L 220 60 L 0 60 Z"} fill="url(#gFill-dash-light-shared)" />
            <path d={d} fill="none" stroke={inkLine} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="220" cy="50" r="3" fill={inkLine}/>
          </svg>
        </div>

        <div className="activity">
          <div className="label">Timeline</div>
          <div className="timeline">
            <div className="row">
              <div className="date">MAY 11</div>
              <div className="t"><span className="tag">FUEL</span>Shell 98 · 14.2 gal</div>
              <div className="cost">$58</div>
            </div>
            <div className="row">
              <div className="date">APR 28</div>
              <div className="t"><span className="tag">TRACK</span>Nürburgring — PB 8:14</div>
              <div className="cost">+1.2s</div>
            </div>
            <div className="row">
              <div className="date">APR 03</div>
              <div className="t"><span className="tag">MOD</span>AMG ceramic coating</div>
              <div className="cost">$890</div>
            </div>
            <div className="row">
              <div className="date">FEB 12</div>
              <div className="t"><span className="tag">MAINT</span>Mobil 1 ESP 0W-30</div>
              <div className="cost">$140</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GarageScreen, ChatScreen, DashScreen, DashScreenLight });
