import { useState } from "react";

export function TimelineTab({ ws, toggleTimeline, addTimelineItem, removeTimelineItem }) {
  const [inputs, setInputs] = useState({ week: "", day_before: "", day_of: "" });

  const sections = [
    { key: "week", label: "1 Week Before" },
    { key: "day_before", label: "Day Before" },
    { key: "day_of", label: "Day Of" },
  ];

  const doneCount = sections.reduce(
    (s, sec) => s + ws.timeline[sec.key].filter(i => i.done).length,
    0,
  );
  const totalCount = sections.reduce((s, sec) => s + ws.timeline[sec.key].length, 0);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <div className="section-label" style={{ marginBottom: 0 }}>
          Prep Checklist
        </div>
        <span className="chip chip-green">{doneCount} / {totalCount} complete</span>
      </div>

      {sections.map(sec => (
        <div key={sec.key} className="timeline-section">
          <div className="timeline-heading">
            <div className="timeline-dot" />
            {sec.label}
          </div>
          {ws.timeline[sec.key].map(item => (
            <div key={item.id} className="timeline-item">
              <div
                className={`timeline-item-check ${item.done ? "checked" : ""}`}
                onClick={() => toggleTimeline(sec.key, item.id)}
              >
              </div>
              <div className={`timeline-item-text ${item.done ? "done" : ""}`}>{item.text}</div>
              <button
                className="icon-btn"
                style={{ fontSize: "0.9rem" }}
                onClick={() => removeTimelineItem(sec.key, item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="timeline-add">
            <input
              className="form-input"
              style={{ fontSize: "0.87rem", padding: "0.45rem 0.75rem" }}
              placeholder={`Add task for "${sec.label}"...`}
              value={inputs[sec.key]}
              onChange={e => setInputs(prev => ({ ...prev, [sec.key]: e.target.value }))}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  addTimelineItem(sec.key, inputs[sec.key]);
                  setInputs(prev => ({ ...prev, [sec.key]: "" }));
                }
              }}
            />
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                addTimelineItem(sec.key, inputs[sec.key]);
                setInputs(prev => ({ ...prev, [sec.key]: "" }));
              }}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

