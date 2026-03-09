import { useState, useEffect } from "react";
import { GLOBAL_STYLES } from "./styles/globalStyles";
import {
  loadWorkshops,
  saveWorkshops,
  createWorkshopFromForm,
  deleteWorkshopById,
} from "./data/workshops";
import { CreateModal } from "./components/CreateModal";
import { WorkshopModal } from "./components/WorkshopModal";

export default function App() {
  const [workshops, setWorkshops] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [activeTab, setActiveTab] = useState("rsvp");
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState("idle");

  useEffect(() => {
    loadWorkshops().then(data => {
      setWorkshops(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    setSyncStatus("saving");
    const t = setTimeout(async () => {
      const ok = await saveWorkshops(workshops);
      setSyncStatus(ok ? "saved" : "error");
      if (ok) setTimeout(() => setSyncStatus("idle"), 2000);
    }, 600);
    return () => clearTimeout(t);
  }, [workshops, loading]);

  function createWorkshop(form) {
    const ws = createWorkshopFromForm(form);
    setWorkshops(prev => [ws, ...prev]);
    setShowCreate(false);
  }

  function updateWorkshop(updated) {
    setWorkshops(prev => prev.map(w => (w.id === updated.id ? updated : w)));
    setActiveWorkshop(updated);
  }

  function updateWorkshopIngredients(updated) {
    const withIds = {
      ...updated,
      ingredients: updated.ingredients.map(i => ({
        ...i,
        id:
          i.id ||
          (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `i-${Date.now()}-${Math.random()}`),
      })),
    };
    setWorkshops(prev => prev.map(w => (w.id === withIds.id ? withIds : w)));
    setActiveWorkshop(withIds);
  }

  async function deleteWorkshop(id) {
    setWorkshops(prev => prev.filter(w => w.id !== id));
    setActiveWorkshop(null);
    setSyncStatus("saving");
    const ok = await deleteWorkshopById(id);
    setSyncStatus(ok ? "saved" : "error");
    if (ok) setTimeout(() => setSyncStatus("idle"), 2000);
  }

  const formatDate = d => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const syncLabel =
    {
      idle: null,
      saving: (
        <>
          <span className="spin">↻</span> Saving…
        </>
      ),
      saved: <>✓ Saved</>,
      error: <>⚠ Failed</>,
    }[syncStatus];

  if (loading)
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div className="app">
          <header className="header">
            <div className="header-brand">
              🍳 Workshop<span>Studio</span>
            </div>
          </header>
          <div className="loading-screen">
            <div className="loading-spinner" />
            <span>Loading your workshops…</span>
          </div>
        </div>
      </>
    );

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="app">
        <header className="header">
          <div className="header-brand">
            🍳 Workshop<span>Studio</span>
          </div>
          <div
            className="header-right"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {syncLabel && (
              <span className={`sync-badge sync-${syncStatus}`}>{syncLabel}</span>
            )}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowCreate(true)}
            >
              + New Workshop
            </button>
          </div>
        </header>

        <div className="hero-band">
          <div className="hero-title">Your Workshops</div>
          <div className="hero-subtitle">
            Plan, scale, and execute culinary workshops with ease
          </div>
        </div>

        <main className="main">
          {workshops.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🧑‍🍳</div>
              <h3>No workshops yet</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Create your first workshop to get started with planning, ingredients, and
                RSVPs.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreate(true)}
              >
                + Create Workshop
              </button>
            </div>
          ) : (
            <div className="workshops-grid">
              {workshops.map(ws => {
                const scale = ws.rsvpCount > 0 ? ws.rsvpCount / ws.baseServings : 1;
                const totalCost = ws.ingredients.reduce(
                  (s, i) =>
                    s +
                    (parseFloat(i.costPer) || 0) *
                      (parseFloat(i.baseQty) || 0) *
                      scale,
                  0,
                );
                const overBudget = ws.budget > 0 && totalCost > ws.budget;
                const pct = Math.min((ws.rsvpCount / ws.capacity) * 100, 100);
                return (
                  <div
                    key={ws.id}
                    className="card"
                    onClick={() => {
                      setActiveWorkshop(ws);
                      setActiveTab("rsvp");
                    }}
                  >
                    <div className="card-header">
                      <div className="card-date-badge">📅 {formatDate(ws.date)}</div>
                      <div className="card-title">{ws.name}</div>
                    </div>
                    <div className="card-body">
                      <div className="card-stats">
                        <div className="stat">
                          <div className="stat-value">{ws.rsvpCount}</div>
                          <div className="stat-label">RSVPs</div>
                        </div>
                        <div className="stat">
                          <div className="stat-value">{ws.capacity}</div>
                          <div className="stat-label">Capacity</div>
                        </div>
                        <div className="stat">
                          <div
                            className={`stat-value stat-cost ${overBudget ? "stat-over" : ""}`}
                          >
                            {totalCost > 0 ? `$${totalCost.toFixed(0)}` : "—"}
                          </div>
                          <div className="stat-label">
                            {overBudget
                              ? "Over budget"
                              : ws.budget > 0
                              ? `of $${ws.budget}`
                              : "Est. cost"}
                          </div>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: pct + "%" }}
                        />
                      </div>
                      <div className="card-meta">
                        <span>{Math.round(pct)}% full</span>
                        <span>{ws.ingredients.length} ingredients</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className="card card-add"
                onClick={() => setShowCreate(true)}
              >
                <div className="card-add-content">
                  <div className="card-add-icon">＋</div>
                  <div className="card-add-label">New Workshop</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={createWorkshop} />
      )}

      {activeWorkshop && (
        <WorkshopModal
          workshop={activeWorkshop}
          onClose={() => setActiveWorkshop(null)}
          onUpdate={updateWorkshop}
          onUpdateIngredients={updateWorkshopIngredients}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onDelete={() => deleteWorkshop(activeWorkshop.id)}
        />
      )}
    </>
  );
}

