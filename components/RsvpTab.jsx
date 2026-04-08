import { useState } from "react";

export function RsvpTab({ ws, update }) {
  const [partifulUrl, setPartifulUrl] = useState("");
  const [showPartiful, setShowPartiful] = useState(false);
  const pct = Math.min((ws.rsvpCount / ws.capacity) * 100, 100);

  return (
    <div>
      <div className="rsvp-banner">
        <div className="rsvp-banner-text">
          <div className="rsvp-banner-title">Partiful Integration</div>
          <div className="rsvp-banner-sub">Connect your Partiful event to sync RSVPs automatically</div>
        </div>
        <button
          className="partiful-btn partiful-badge"
          style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.4)" }}
          onClick={() => setShowPartiful(!showPartiful)}
        >
          Connect Partiful
        </button>
      </div>

      {showPartiful && (
        <div className="partiful-panel">
          <div className="partiful-panel-title">Connect Partiful Event</div>
          <div className="partiful-panel-copy">
            Paste your Partiful event link below. Once connected, RSVP count syncs automatically.
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              className="form-input"
              placeholder="https://partiful.com/e/..."
              value={partifulUrl}
              onChange={e => setPartifulUrl(e.target.value)}
              style={{ flex: 1, minWidth: "12rem" }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (partifulUrl) {
                  alert(
                    "Partiful connected. In a full integration, RSVPs would sync automatically. For now, update manually below.",
                  );
                  setShowPartiful(false);
                }
              }}
            >
              Connect
            </button>
          </div>
          <div className="form-hint" style={{ marginTop: "0.5rem" }}>
            Note: Full Partiful API integration requires OAuth — this demo shows the UI flow.
            RSVPs can be set manually below.
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <div className="rsvp-count-input">
          <label>RSVP Count:</label>
          <div className="stepper">
            <button onClick={() => update({ rsvpCount: Math.max(0, ws.rsvpCount - 1) })}>-</button>
            <span>{ws.rsvpCount}</span>
            <button onClick={() => update({ rsvpCount: Math.min(ws.capacity, ws.rsvpCount + 1) })}>+</button>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.3rem",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {ws.rsvpCount} / {ws.capacity} spots filled
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{Math.round(pct)}%</span>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-fill" style={{ width: pct + "%" }} />
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section-label">Workshop Details</div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Max Capacity</label>
          <input
            type="number"
            className="form-input"
            value={ws.capacity}
            onChange={e => update({ capacity: parseInt(e.target.value, 10) || 0 })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={ws.date}
            onChange={e => update({ date: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Base Recipe Serves</label>
        <input
          type="number"
          className="form-input"
          value={ws.baseServings}
          onChange={e => update({ baseServings: parseInt(e.target.value, 10) || 1 })}
        />
        <div className="form-hint">
          All ingredient quantities are based on this many servings. They'll auto-scale to your RSVP count.
        </div>
      </div>

      {ws.rsvpCount > 0 && (
        <div
          style={{
            background: "var(--cream)",
            border: "1px solid var(--stone)",
            borderRadius: 10,
            padding: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <div style={{ fontSize: "0.9rem" }}>
            <strong>Scale factor: {(ws.rsvpCount / ws.baseServings).toFixed(2)}x</strong> - ingredients will be
            multiplied by this amount
          </div>
        </div>
      )}
    </div>
  );
}

