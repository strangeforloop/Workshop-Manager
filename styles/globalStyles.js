export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

export const BASE_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FAF7F2;
    --warm-white: #FDFBF8;
    --panel-bg: #FFFFFF;
    --stone: #E8E0D5;
    --tan: #C9B99A;
    --brown: #8B6F47;
    --dark: #2C1F0E;
    --accent: #D4622A;
    --accent-light: #F0A882;
    --green: #4A7C59;
    --green-light: #E8F2EB;
    --teal: #21D099;
    --teal-soft: #D1F0E8;
    --yellow: #FBE300;
    --text: #332211;
    --text-muted: #8C7B6D;
    --shadow: 0 2px 12px rgba(0,0,0,0.06);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.1);
  }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--text); }
  
  .app { min-height: 100vh; }
`;

export const LAYOUT_STYLES = `
  .header {
    background: var(--dark);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
    position: sticky; top: 0; z-index: 100;
  }
  .header-brand {
    font-family: 'Playfair Display', serif;
    color: var(--cream);
    font-size: 1.4rem;
    letter-spacing: -0.01em;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .header-brand span { color: var(--accent-light); font-style: italic; }
  .header-right { display: flex; gap: 0.75rem; }

  .hero-band {
    background: var(--accent);
    background: linear-gradient(135deg, #D4622A 0%, #B8431A 100%);
    padding: 3rem 2.5rem 2.5rem;
    position: relative; overflow: hidden;
  }
  .hero-band::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    color: white; font-size: 2.2rem; font-weight: 700;
    position: relative;
  }
  .hero-subtitle { color: rgba(255,255,255,0.75); margin-top: 0.4rem; font-size: 1rem; position: relative; }

  .main { max-width: 1180px; margin: 0 auto; padding: 2rem 1.5rem; }
  .workshops-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
`;

export const COMPONENT_STYLES = `
  .card {
    background: var(--panel-bg);
    border-radius: 14px;
    border: none;
    box-shadow: var(--shadow);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  .card-header {
    padding: 1.5rem 1.5rem 1.25rem;
    border-bottom: none;
  }
  .card-date-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--teal-soft);
    color: #1a9d6f;
    padding: 0.35rem 0.85rem;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 600;
    margin-bottom: 0.85rem;
    letter-spacing: 0.02em;
  }
  .card-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  .card-body { padding: 0 1.5rem 1.5rem; }
  .card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem 1rem;
    margin-bottom: 0.25rem;
  }
  .stat { text-align: center; }
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--teal);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .stat-value.stat-cost { color: var(--accent); }
  .stat-value.stat-over { color: #c94a3d; }
  .stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 0.2rem;
    font-weight: 500;
  }
  .progress-bar {
    height: 8px;
    background: rgba(0,0,0,0.06);
    border-radius: 4px;
    margin-top: 1.1rem;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--teal), #2ee4a8);
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 0.78rem;
    color: var(--text-muted);
    font-weight: 500;
  }
  .card-add {
    background: var(--panel-bg);
    border: 2px dashed rgba(0,0,0,0.12);
    border-radius: 14px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .card-add:hover {
    border-color: var(--teal);
    background: var(--teal-soft);
    box-shadow: var(--shadow-lg);
  }
  .card-add-content { text-align: center; color: var(--text-muted); }
  .card-add-content .card-add-icon { font-size: 2.25rem; margin-bottom: 0.5rem; color: var(--teal); }
  .card-add-content .card-add-label { font-weight: 600; color: var(--text); }

  .btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 500;
    border: none; cursor: pointer; font-size: 0.9rem; font-family: inherit;
    transition: all 0.15s;
  }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #B8431A; }
  .btn-secondary { background: var(--stone); color: var(--text); }
  .btn-secondary:hover { background: var(--tan); }
  .btn-ghost { background: transparent; color: var(--cream); border: 1px solid rgba(255,255,255,0.3); }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); }
  .btn-sm { padding: 0.4rem 0.9rem; font-size: 0.82rem; }
  .btn-danger { background: #fee; color: #c00; border: 1px solid #fcc; }
  .btn-danger:hover { background: #fcc; }

  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(44,31,14,0.55); backdrop-filter: blur(3px);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 1rem;
  }
  .modal {
    background: var(--warm-white); border-radius: 20px;
    width: 100%; max-width: 680px; max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 24px 80px rgba(44,31,14,0.25);
    animation: modalIn 0.2s ease;
  }
  @keyframes modalIn { from { opacity:0; transform: scale(0.96) translateY(10px); } to { opacity:1; transform: scale(1) translateY(0); } }
  .modal-header {
    padding: 1.5rem 2rem 1.25rem;
    border-bottom: 1px solid var(--stone);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; background: var(--warm-white); z-index: 1;
  }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; }
  .modal-body { padding: 1.5rem 2rem; }
  .modal-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--stone); display: flex; gap: 0.75rem; justify-content: flex-end; }

  .tabs { display: flex; gap: 0; border-bottom: 2px solid var(--stone); margin-bottom: 1.5rem; }
  .tab {
    padding: 0.75rem 1.25rem; font-size: 0.9rem; font-weight: 500;
    border: none; background: none; cursor: pointer; color: var(--text-muted);
    border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: all 0.15s; font-family: inherit;
  }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:hover:not(.active) { color: var(--text); }

  .form-group { margin-bottom: 1.25rem; }
  .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem; }
  .form-input, .form-select {
    width: 100%; padding: 0.65rem 0.9rem; border-radius: 8px;
    border: 1.5px solid var(--stone); background: white;
    font-family: inherit; font-size: 0.95rem; color: var(--text);
    transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus { outline: none; border-color: var(--accent); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-hint { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.3rem; }

  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--text); margin-bottom: 0.5rem; }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }

  .section-label {
    font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 1rem;
  }
  .divider { height: 1px; background: var(--stone); margin: 1.25rem 0; }
  .chip {
    display: inline-flex; align-items: center; padding: 0.25rem 0.7rem;
    border-radius: 20px; font-size: 0.8rem; font-weight: 500;
  }
  .chip-orange { background: #FEF0E8; color: var(--accent); }
  .chip-green { background: var(--green-light); color: var(--green); }

  .close-btn { background: none; border: none; cursor: pointer; font-size: 1.4rem; color: var(--text-muted); padding: 0.25rem; line-height: 1; }
  .close-btn:hover { color: var(--text); }
  
  .icon-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 0.3rem; border-radius: 6px; }
  .icon-btn:hover { background: var(--stone); color: var(--text); }

  .add-row-btn {
    display: flex; align-items: center; gap: 0.4rem;
    background: none; border: 1.5px dashed var(--tan); border-radius: 8px;
    color: var(--text-muted); font-family: inherit; font-size: 0.87rem;
    padding: 0.5rem 0.9rem; cursor: pointer; width: 100%; margin-top: 0.5rem;
    transition: all 0.15s;
  }
  .add-row-btn:hover { border-color: var(--accent); color: var(--accent); background: #FEF0E8; }
`;

export const TABLE_STYLES = `
  .ingredient-table { width: 100%; border-collapse: collapse; }
  .ingredient-table th {
    text-align: left; padding: 0.5rem 0.75rem;
    font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--text-muted); background: var(--stone); font-weight: 600;
  }
  .ingredient-table th:first-child { border-radius: 6px 0 0 6px; }
  .ingredient-table th:last-child { border-radius: 0 6px 6px 0; }
  .ingredient-table td { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--stone); }
  .ingredient-table tr:last-child td { border-bottom: none; }
  .ingredient-table input {
    width: 100%; border: 1.5px solid var(--stone); border-radius: 6px;
    padding: 0.35rem 0.5rem; font-size: 0.9rem; font-family: inherit;
    background: white;
  }
  .ingredient-table input:focus { outline: none; border-color: var(--accent); }
  .scaled-val { font-weight: 600; color: var(--accent); }
`;

export const TIMELINE_STYLES = `
  .budget-summary {
    background: var(--dark);
    border-radius: 12px; padding: 1.25rem 1.5rem;
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;
    margin-top: 1.25rem;
  }
  .budget-item { text-align: center; }
  .budget-value { font-size: 1.5rem; font-weight: 700; color: var(--cream); }
  .budget-label { font-size: 0.75rem; color: var(--tan); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem; }
  .budget-over { color: #FF7B7B; }

  .timeline { display: flex; flex-direction: column; gap: 0; }
  .timeline-section { margin-bottom: 1.5rem; }
  .timeline-heading {
    display: flex; align-items: center; gap: 0.75rem;
    font-family: 'Playfair Display', serif; font-size: 1.05rem;
    color: var(--brown); margin-bottom: 0.75rem;
    padding-bottom: 0.5rem; border-bottom: 1px dashed var(--tan);
  }
  .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .timeline-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.6rem 0.9rem; border-radius: 8px;
    background: white; border: 1px solid var(--stone);
    margin-bottom: 0.4rem;
  }
  .timeline-item-check { 
    width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0; margin-top: 1px;
    border: 2px solid var(--tan); cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .timeline-item-check.checked { background: var(--green); border-color: var(--green); }
  .timeline-item-text { font-size: 0.9rem; flex: 1; }
  .timeline-item-text.done { text-decoration: line-through; color: var(--text-muted); }
  .timeline-add { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
  .timeline-add input { flex: 1; }
`;

export const RSVP_STYLES = `
  .rsvp-banner {
    background: linear-gradient(135deg, var(--green) 0%, #3a6347 100%);
    border-radius: 12px; padding: 1.25rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .rsvp-banner-text { color: white; }
  .rsvp-banner-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; }
  .rsvp-banner-sub { font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 0.2rem; }
  .partiful-badge {
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
    color: white; padding: 0.4rem 1rem; border-radius: 20px;
    font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem;
  }
  .rsvp-manual { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .rsvp-count-input { display: flex; align-items: center; gap: 0.5rem; }
  .rsvp-count-input label { font-size: 0.9rem; font-weight: 600; }
  .stepper { display: flex; align-items: center; gap: 0; border: 1.5px solid var(--stone); border-radius: 8px; overflow: hidden; }
  .stepper button { width: 36px; height: 36px; border: none; background: var(--stone); cursor: pointer; font-size: 1.1rem; transition: background 0.1s; }
  .stepper button:hover { background: var(--tan); }
  .stepper span { width: 48px; text-align: center; font-weight: 700; font-size: 1.05rem; background: white; display: block; height: 36px; line-height: 36px; }
`;

export const SYNC_STYLES = `
  .sync-badge{display:inline-flex;align-items:center;gap:0.35rem;font-size:0.75rem;padding:0.2rem 0.6rem;border-radius:20px;transition:all 0.4s;}
  .sync-idle{color:rgba(255,255,255,0.3);}.sync-saving{color:var(--accent-light);}.sync-saved{color:#7EC89A;}.sync-error{color:#FF8A8A;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .spin{display:inline-block;animation:spin 0.7s linear infinite;}
  .loading-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:1rem;color:var(--text-muted);}
  .loading-spinner{width:36px;height:36px;border:3px solid var(--stone);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite;}
`;

export const GLOBAL_STYLES = [
  FONTS,
  BASE_STYLES,
  LAYOUT_STYLES,
  COMPONENT_STYLES,
  TABLE_STYLES,
  TIMELINE_STYLES,
  RSVP_STYLES,
  SYNC_STYLES,
].join("");

