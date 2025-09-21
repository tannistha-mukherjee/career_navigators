import React, { useEffect, useState } from "react";

// TechLearningAdventure_App.jsx
// Single-file React component (plain JS + CSS injected at runtime).
// Drop this file into a Create-React-App project (e.g. src/App.jsx)
// It injects its own CSS so you don't need separate CSS files.

export default function Roadmap() {
  const [screen, setScreen] = useState("paths"); // 'paths' or 'foundation'
  const [selectedPath, setSelectedPath] = useState(null);

  // simple progress state for example
  const [progressSteps, setProgressSteps] = useState([
    { id: 1, title: "HTML Basics", done: true },
    { id: 2, title: "CSS Styling", done: false },
    { id: 3, title: "Responsive Design", done: false },
  ]);

  // inject CSS into the document so this is a single-file component
  useEffect(() => {
    const css = `
    :root{ --bg:#f3f6ff; --accent:#5b6cff; --muted:#9aa3c7; --card:#ffffff; }
    *{box-sizing:border-box}
    body,html,#root{height:100%}
    .app-wrap{min-height:100vh; background:linear-gradient(180deg,var(--bg),#f7f2ff); padding:28px; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;}

    .top-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--card);padding:12px 16px;border-radius:12px;box-shadow:0 6px 18px rgba(20,20,60,0.06)}
    .brand{display:flex;align-items:center;gap:12px}
    .logo{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
    .title{font-size:18px;font-weight:700}
    .subtitle{font-size:12px;color:var(--muted)}

    .stats{display:flex;gap:10px;align-items:center}
    .stat{display:flex;flex-direction:column;align-items:center;padding:6px 10px;border-radius:8px;background:linear-gradient(180deg,#fff,#fbfbff);box-shadow:0 2px 6px rgba(60,60,120,0.04);font-size:12px}
    .stat strong{font-size:13px}

    .screen{margin-top:18px}

    /* Paths screen */
    .paths-grid{display:flex;gap:16px;justify-content:center;align-items:center}
    .path-card{width:320px;height:120px;border-radius:14px;background:linear-gradient(90deg,#2b7bf6,#3ad0ff);color:white;padding:16px;display:flex;flex-direction:column;justify-content:center;cursor:pointer;box-shadow:0 10px 30px rgba(40,60,120,0.12);transition:transform .22s ease}
    .path-card.alt{background:linear-gradient(90deg,#4b3bd6,#6b8cfa)}
    .path-card.small{width:260px;height:96px}
    .path-card:hover{transform:translateY(-6px)}
    .path-title{font-weight:700;font-size:18px}
    .path-desc{font-size:12px;opacity:.95;margin-top:6px}

    /* Foundation world */
    .foundation-wrap{background:linear-gradient(180deg,#fdf6ff,#fff);border-radius:14px;padding:16px;margin:0 auto;max-width:980px;box-shadow:0 12px 30px rgba(20,20,50,0.06)}
    .world-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
    .badge{background:linear-gradient(90deg,#6b46ff,#c084fc);padding:8px 14px;border-radius:20px;color:white;font-weight:700}

    .world-canvas{height:340px;position:relative;display:flex;align-items:center;justify-content:center}
    .path-svg{width:88%;height:100%}

    /* node styles */
    .node{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:6px}
    .node .dot{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#2ecc71,#18a058);color:white;font-weight:800;box-shadow:0 8px 20px rgba(30,100,70,0.12)}
    .node .label{background:white;padding:6px 10px;border-radius:8px;font-size:12px;box-shadow:0 6px 18px rgba(20,20,60,0.06)}
    .node.locked .dot{background:linear-gradient(180deg,#bbb,#9b9b9b)}

    .bottom-nav{display:flex;gap:18px;justify-content:center;padding:12px;margin-top:14px}
    .nav-btn{padding:10px 18px;border-radius:12px;background:linear-gradient(180deg,#fff,#f7f7ff);box-shadow:0 6px 18px rgba(20,20,60,0.06);cursor:pointer}

    /* small screens */
    @media (max-width:760px){
      .paths-grid{flex-direction:column}
      .path-card{width:92%}
      .world-canvas{height:260px}
    }
    `;

    const styleEl = document.createElement("style");
    styleEl.id = "tla-styles";
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    return () => {
      const el = document.getElementById("tla-styles");
      if (el) el.remove();
    };
  }, []);

  function openPath(pathKey) {
    setSelectedPath(pathKey);
    setScreen("foundation");
  }

  function toggleStep(id) {
    setProgressSteps((s) =>
      s.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  }

  return (
    <div className="app-wrap">
      <div className="top-bar">
        <div className="brand">
          <div className="logo">TL</div>
          <div>
            <div className="title">Tech Learning Adventure</div>
            <div className="subtitle">
              Choose your path and level up — playful learning
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <span style={{ color: "#6b46ff" }}>Level</span>
            <strong>1</strong>
          </div>
          <div className="stat">
            <span style={{ color: "#f59e0b" }}>XP</span>
            <strong>0</strong>
          </div>
          <div className="stat">
            <span style={{ color: "#10b981" }}>Coins</span>
            <strong>0</strong>
          </div>
          <div className="stat">
            <span style={{ color: "#ef4444" }}>Lives</span>
            <strong>5</strong>
          </div>
        </div>
      </div>

      <div className="screen">
        {screen === "paths" && (
          <div>
            <h2 style={{ textAlign: "center", marginBottom: 16 }}>
              Choose your adventure path!
            </h2>
            <div className="paths-grid">
              <div className="path-card" onClick={() => openPath("fullstack")}>
                <div className="path-title">Full Stack Web Development</div>
                <div className="path-desc">
                  HTML, CSS, JS, React, Node — build end-to-end apps.
                </div>
              </div>

              <div className="path-card alt" onClick={() => openPath("datasci")}>
                <div className="path-title">Data Science & ML</div>
                <div className="path-desc">
                  Python, Pandas, ML models, visualization.
                </div>
              </div>

              <div
                className="path-card small"
                style={{ background: "linear-gradient(90deg,#3b82f6,#7c3aed)" }}
                onClick={() => openPath("mobile")}
              >
                <div className="path-title">Mobile App Development</div>
                <div className="path-desc">
                  React Native / Flutter basics and UI patterns.
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "foundation" && (
          <div className="foundation-wrap">
            <div className="world-header">
              <div className="badge">Foundation World</div>
              <div style={{ marginLeft: 8 }}>
                <div style={{ fontWeight: 700 }}>
                  {selectedPath === "fullstack"
                    ? "Full Stack Web"
                    : selectedPath === "datasci"
                    ? "Data Science"
                    : "Mobile Apps"}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Progress your core fundamentals
                </div>
              </div>
            </div>

            <div className="world-canvas">
              {/* use an SVG to draw a simple curved path to match screenshot vibes */}
              <svg
                className="path-svg"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#19b38a" />
                    <stop offset="100%" stopColor="#0ea47f" />
                  </linearGradient>
                </defs>
                <path
                  d="M70,320 C220,140 520,120 790,310"
                  stroke="#1ea47d"
                  strokeWidth="86"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
                {/* thin highlight */}
                <path
                  d="M70,320 C220,140 520,120 790,310"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.12"
                />

                {/* small circles to mark nodes */}
                <circle cx="170" cy="255" r="28" fill="#2ecc71" />
                <circle cx="430" cy="210" r="28" fill="#f1c40f" />
                <circle cx="680" cy="260" r="28" fill="#9b59b6" />
              </svg>

              {/* Nodes placed using absolute positioning to sit on top of the SVG curve */}
              <div className="node" style={{ left: "17%", top: "48%" }}>
                <div
                  className="dot"
                  onClick={() => toggleStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  {progressSteps[0].done ? "✓" : 1}
                </div>
                <div className="label">{progressSteps[0].title}</div>
              </div>

              <div className="node" style={{ left: "43%", top: "40%" }}>
                <div
                  className={`dot ${progressSteps[1].done ? "" : "locked"}`}
                  onClick={() => toggleStep(2)}
                  style={{ cursor: "pointer" }}
                >
                  {progressSteps[1].done ? "✓" : 2}
                </div>
                <div className="label">{progressSteps[1].title}</div>
              </div>

              <div className="node" style={{ left: "68%", top: "52%" }}>
                <div
                  className={`dot ${progressSteps[2].done ? "" : "locked"}`}
                  onClick={() => toggleStep(3)}
                  style={{ cursor: "pointer" }}
                >
                  {progressSteps[2].done ? "✓" : 3}
                </div>
                <div className="label">{progressSteps[2].title}</div>
              </div>
            </div>

            <div className="bottom-nav">
              <div className="nav-btn" onClick={() => setScreen("paths")}>
                Map
              </div>
              <div className="nav-btn">Pins</div>
              <div className="nav-btn">Shop</div>
              <div className="nav-btn">Profile</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
