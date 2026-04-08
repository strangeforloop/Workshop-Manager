import { useState } from "react";

export function CreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: "", date: "", capacity: "", budget: "" });
  const valid = form.name.trim() && form.date;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Create Workshop</div>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Workshop Name</label>
            <input
              className="form-input"
              placeholder="e.g. Fresh Pasta Making with Friends"
              autoFocus
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max Capacity</label>
              <input
                type="number"
                className="form-input"
                placeholder="20"
                value={form.capacity}
                onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Budget ($)</label>
            <input
              type="number"
              className="form-input"
              placeholder="150.00"
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            />
            <div className="form-hint">Total budget for ingredients and supplies</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            disabled={!valid}
            style={!valid ? { opacity: 0.5, cursor: "not-allowed" } : {}}
            onClick={() => valid && onCreate(form)}
          >
            Create Workshop
          </button>
        </div>
      </div>
    </div>
  );
}

