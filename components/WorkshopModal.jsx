import { RsvpTab } from "./RsvpTab";
import { IngredientsBudgetTab } from "./IngredientsBudgetTab";
import { TimelineTab } from "./TimelineTab";

export function WorkshopModal({
  workshop,
  onClose,
  onUpdate,
  onUpdateIngredients,
  onDelete,
  activeTab,
  setActiveTab,
}) {
  const ws = workshop;

  const update = changes => onUpdate({ ...ws, ...changes });

  function addIngredient() {
    const newId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `tmp-${Date.now()}-${Math.random()}`;
    const newIngs = [
      ...ws.ingredients,
      { id: newId, name: "", baseQty: 0, unit: "g", costPer: 0, packageSize: 1 },
    ];
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function updateIngredient(id, field, val) {
    const newIngs = ws.ingredients.map(i => (i.id === id ? { ...i, [field]: val } : i));
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function removeIngredient(id) {
    const newIngs = ws.ingredients.filter(i => i.id !== id);
    onUpdateIngredients({ ...ws, ingredients: newIngs });
  }

  function toggleTimeline(section, id) {
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = tl[section].map(item =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
    onUpdate({ ...ws, timeline: tl });
  }

  function addTimelineItem(section, text) {
    if (!text.trim()) return;
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = [...tl[section], { id: Date.now(), text, done: false }];
    onUpdate({ ...ws, timeline: tl });
  }

  function removeTimelineItem(section, id) {
    const tl = JSON.parse(JSON.stringify(ws.timeline));
    tl[section] = tl[section].filter(i => i.id !== id);
    onUpdate({ ...ws, timeline: tl });
  }

  const scale = ws.rsvpCount > 0 ? ws.rsvpCount / ws.baseServings : 1;
  const totalCost = ws.ingredients.reduce((s, i) => {
    const scaledQty = (parseFloat(i.baseQty) || 0) * scale;
    return s + (parseFloat(i.costPer) || 0) * scaledQty;
  }, 0);
  const costPerPerson =
    ws.rsvpCount > 0 ? totalCost / ws.rsvpCount : totalCost / ws.baseServings;
  const budgetLeft = ws.budget - totalCost;

  const formatDate = d => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 920 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{ws.name}</div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginTop: "0.2rem",
              }}
            >
              {formatDate(ws.date)}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Delete
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="tabs">
            {[
              { id: "rsvp", label: "RSVPs" },
              { id: "ingredients", label: "Ingredients & Budget" },
              // { id: "timeline", label: "Timeline" },
            ].map(t => (
              <button
                key={t.id}
                className={`tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "rsvp" && <RsvpTab ws={ws} update={update} />}
          {activeTab === "ingredients" && (
            <IngredientsBudgetTab
              ws={ws}
              scale={scale}
              totalCost={totalCost}
              costPerPerson={costPerPerson}
              budgetLeft={budgetLeft}
              addIngredient={addIngredient}
              updateIngredient={updateIngredient}
              removeIngredient={removeIngredient}
              update={update}
            />
          )}
          {activeTab === "timeline" && (
            <TimelineTab
              ws={ws}
              toggleTimeline={toggleTimeline}
              addTimelineItem={addTimelineItem}
              removeTimelineItem={removeTimelineItem}
            />
          )}
        </div>
      </div>
    </div>
  );
}

