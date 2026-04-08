/* Serif-only: Fraunces (soft, bubbly display) + Literata (readable body). Warm kitchen palette — no generic sans stack. */
export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,400&display=swap');
`;

export const BASE_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FFF5EF;
    --warm-white: #FFFBF8;
    --panel-bg: #FFFCFA;
    --stone: #EDD8CD;
    --tan: #D4B8A8;
    --brown: #7A5C4E;
    --dark: #5A3E42;
    --accent: #E8706A;
    --accent-light: #FFC9C1;
    --green: #6A9B7D;
    --green-light: #E8F4EC;
    --teal: #6EB88A;
    --teal-solid: #5A9E7A;
    --teal-soft: #DFF5EA;
    --kimchi: #D94E1F;
    --kimchi-deep: #B84018;
    --yellow: #FFE8A8;
    --text: #4A3728;
    --text-muted: #8B7264;
    --shadow: 0 6px 24px rgba(90, 62, 66, 0.08);
    --shadow-lg: 0 14px 40px rgba(90, 62, 66, 0.12);
    --radius-bubble: 22px;
    --radius-pill: 9999px;
    --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
    --font-serif: 'Literata', Georgia, 'Times New Roman', serif;
  }
  body {
    background: var(--cream);
    font-family: var(--font-serif);
    font-size: 17px;
    line-height: 1.65;
    color: var(--text);
    font-optical-sizing: auto;
  }
  
  .app { min-height: 100vh; }
`;

export const LAYOUT_STYLES = `
  .header {
    background: var(--dark);
    padding: 0 1.75rem;
    display: flex; align-items: center; justify-content: space-between;
    min-height: 72px;
    position: sticky; top: 0; z-index: 100;
    border-bottom: 3px solid rgba(255,255,255,0.12);
  }
  .header-brand {
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--cream);
    font-size: 1.65rem;
    letter-spacing: 0.01em;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .header-brand span { color: var(--accent-light); font-style: italic; font-weight: 500; }
  .header-right { display: flex; gap: 0.75rem; align-items: center; }

  .hero-band {
    background: linear-gradient(145deg, #FFD9C9 0%, #FFCAB5 42%, #FFB8A8 100%);
    padding: 2.75rem 2rem 2.25rem;
    position: relative; overflow: hidden;
    border-bottom: 4px solid rgba(255, 200, 180, 0.6);
  }
  .hero-band::before {
    content: '';
    position: absolute; inset: -20% -10% auto auto;
    width: 55%;
    height: 120%;
    background: radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 68%);
    pointer-events: none;
  }
  .hero-band::after {
    content: '';
    position: absolute; inset: auto auto -30% -15%;
    width: 50%;
    height: 90%;
    background: radial-gradient(circle, rgba(255, 232, 210, 0.7) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-title {
    font-family: var(--font-display);
    color: var(--text);
    font-size: clamp(1.85rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: 0.01em;
    position: relative;
    max-width: 20ch;
  }
  .hero-subtitle {
    font-family: var(--font-serif);
    color: var(--brown);
    margin-top: 0.65rem;
    font-size: 1.05rem;
    line-height: 1.65;
    font-weight: 400;
    position: relative;
    max-width: 36ch;
  }

  .main { max-width: 1120px; margin: 0 auto; padding: 2rem 1.5rem 3rem; }
  .workshops-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.35rem 1.25rem; margin-top: 1.35rem; }
`;

export const COMPONENT_STYLES = `
  .card {
    background: var(--panel-bg);
    border-radius: var(--radius-bubble);
    border: 2px solid rgba(237, 216, 205, 0.85);
    box-shadow: var(--shadow);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s ease;
  }
  .card:hover { transform: translateY(-4px) scale(1.01); box-shadow: var(--shadow-lg); border-color: var(--accent-light); }
  .card-header {
    padding: 1.5rem 1.5rem 1.25rem;
    border-bottom: none;
  }
  .card-date-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--teal-soft);
    color: #2d6b4e;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-serif);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
    border: 1px solid rgba(110, 184, 138, 0.35);
  }
  .card-title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 0.01em;
    line-height: 1.22;
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
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--teal);
    letter-spacing: 0.02em;
    line-height: 1.15;
  }
  /* Cost should be neutral unless it's actually over budget */
  .stat-value.stat-cost { color: var(--text); }
  .stat-value.stat-over { color: var(--accent); }
  .stat-label {
    font-family: var(--font-serif);
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
    font-weight: 600;
  }
  .progress-bar {
    height: 10px;
    background: rgba(237, 216, 205, 0.65);
    border-radius: var(--radius-pill);
    margin-top: 1.1rem;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, var(--teal) 100%);
    border-radius: var(--radius-pill);
    transition: width 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
  }
  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    font-family: var(--font-serif);
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--text-muted);
    font-weight: 500;
  }
  .card-meta-right {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }
  .mini-progress {
    width: 84px;
    height: 6px;
    border-radius: 999px;
    background: rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .mini-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--teal));
    border-radius: 999px;
    transition: width 0.4s ease;
  }
  .card-add {
    background: linear-gradient(180deg, rgba(255,252,250,0.95), rgba(255,245,239,0.5));
    border: 3px dashed var(--stone);
    border-radius: var(--radius-bubble);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .card-add:hover {
    border-color: var(--accent);
    background: rgba(255, 201, 193, 0.35);
    box-shadow: var(--shadow-lg);
  }
  .card-add-content { text-align: center; color: var(--text-muted); }
  .card-add-content .card-add-icon { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 0.35rem; color: var(--accent); line-height: 1; }
  .card-add-content .card-add-label { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; color: var(--text); }

  .btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.55rem 1.35rem;
    border-radius: var(--radius-pill);
    font-weight: 600;
    border: none; cursor: pointer; font-size: 0.95rem;
    font-family: var(--font-serif);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  }
  .btn-primary { background: var(--accent); color: #fff; box-shadow: 0 4px 0 rgba(180, 80, 72, 0.35); }
  .btn-primary:hover { background: #d95a52; transform: translateY(-1px); }
  .btn-secondary { background: var(--stone); color: var(--text); border: 2px solid rgba(212, 184, 168, 0.6); }
  .btn-secondary:hover { background: var(--tan); }
  .btn-ghost { background: rgba(255,255,255,0.12); color: var(--cream); border: 2px solid rgba(255,255,255,0.35); }
  .btn-ghost:hover { background: rgba(255,255,255,0.22); }
  .btn-sm { padding: 0.38rem 1rem; font-size: 0.88rem; }
  .btn-danger { background: #FFE8E8; color: #a23434; border: 2px solid #F5C4C4; }
  .btn-danger:hover { background: #FFD4D4; }

  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(74, 55, 40, 0.42); backdrop-filter: blur(4px);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 1rem;
  }
  .modal {
    background: var(--warm-white);
    border-radius: calc(var(--radius-bubble) + 6px);
    border: 3px solid var(--stone);
    width: 100%; max-width: 680px; max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 28px 64px rgba(90, 62, 66, 0.18);
    animation: modalIn 0.2s ease;
  }
  @keyframes modalIn { from { opacity:0; transform: scale(0.96) translateY(10px); } to { opacity:1; transform: scale(1) translateY(0); } }
  .modal-header {
    padding: 1.5rem 2rem 1.25rem;
    border-bottom: 1px solid var(--stone);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; background: var(--warm-white); z-index: 1;
  }
  .modal-title {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: 0.01em;
  }
  .modal-body { padding: 1.5rem 2rem; }
  .modal-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--stone); display: flex; gap: 0.75rem; justify-content: flex-end; }

  .tabs { display: flex; gap: 0.35rem; flex-wrap: wrap; border-bottom: none; margin-bottom: 1.35rem; }
  .tab {
    padding: 0.55rem 1.1rem; font-size: 0.95rem; font-weight: 600;
    border: none;
    background: rgba(237, 216, 205, 0.45);
    color: #8B7264;
    cursor: pointer;
    border-radius: var(--radius-pill);
    transition: background 0.15s, color 0.15s, transform 0.12s;
    font-family: var(--font-serif);
  }
  .tab.active {
    background: var(--kimchi);
    color: #fff;
    box-shadow: none;
  }
  .tab:hover:not(.active) {
    color: #8B7264;
    background: rgba(237, 216, 205, 0.72);
  }

  .form-group { margin-bottom: 1.25rem; }
  .form-label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--brown); letter-spacing: 0.02em; margin-bottom: 0.45rem; font-family: var(--font-display); }
  .form-input, .form-select {
    width: 100%; padding: 0.7rem 1rem; border-radius: 14px;
    border: 2px solid var(--stone); background: white;
    font-family: var(--font-serif);
    font-size: 16px;
    line-height: 1.5;
    color: var(--text);
    transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus { outline: none; border-color: var(--accent); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-hint { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.3rem; }

  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
  .empty-state h3 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  .empty-state p { font-family: var(--font-serif); font-size: 16px; line-height: 1.7; }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }

  .section-label {
    font-family: var(--font-display);
    font-size: 0.95rem; font-weight: 600;
    letter-spacing: 0.04em; color: var(--brown); margin-bottom: 1rem;
  }
  .divider { height: 1px; background: var(--stone); margin: 1.25rem 0; }
  .chip {
    display: inline-flex; align-items: center; padding: 0.3rem 0.85rem;
    border-radius: var(--radius-pill); font-size: 0.85rem; font-weight: 600;
    font-family: var(--font-serif);
  }
  .chip-orange { background: #FEF0E8; color: var(--accent); }
  .chip-green { background: var(--green-light); color: var(--green); }

  .close-btn {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-serif);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    padding: 0.35rem 0.5rem;
    line-height: 1.4;
  }
  .close-btn:hover { color: var(--text); }
  
  .icon-btn {
    background: none; border: none; cursor: pointer; color: var(--text-muted);
    padding: 0.3rem; border-radius: 6px;
    font-family: var(--font-serif);
    font-size: 0.8125rem;
  }
  .icon-btn:hover { background: var(--stone); color: var(--text); }

  .add-row-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.45rem;
    background: rgba(255, 232, 210, 0.45);
    border: 2px dashed var(--accent-light); border-radius: var(--radius-pill);
    color: var(--brown); font-family: var(--font-display); font-size: 0.95rem; font-weight: 600;
    padding: 0.65rem 1rem; cursor: pointer; width: 100%; margin-top: 0.65rem;
    transition: all 0.18s ease;
  }
  .add-row-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(255, 201, 193, 0.4); transform: scale(1.01); }
`;

export const TABLE_STYLES = `
  .ingredient-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .ingredient-table th {
    text-align: left; padding: 0.55rem 0.8rem;
    font-family: var(--font-serif);
    font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--brown); background: rgba(237, 216, 205, 0.65); font-weight: 700;
  }
  .ingredient-table th:first-child { border-radius: 12px 0 0 12px; }
  .ingredient-table th:last-child { border-radius: 0 12px 12px 0; }
  .ingredient-table td { padding: 0.55rem 0.75rem; border-bottom: 1px solid rgba(237, 216, 205, 0.9); }
  .ingredient-table tr:last-child td { border-bottom: none; }
  .ingredient-table input {
    width: 100%; border: 2px solid var(--stone); border-radius: 12px;
    padding: 0.35rem 0.5rem;
    font-size: 15px;
    font-family: var(--font-serif);
    line-height: 1.5;
    background: white;
  }
  .ingredient-table input:focus { outline: none; border-color: var(--accent); }
  .scaled-val { font-weight: 600; color: var(--accent); }
`;

export const TIMELINE_STYLES = `
  .budget-summary {
    background: linear-gradient(135deg, #6B4E52 0%, #5A3E42 100%);
    border-radius: var(--radius-bubble);
    padding: 1.35rem 1.5rem;
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;
    margin-top: 1.25rem;
    border: 3px solid rgba(255, 255, 255, 0.12);
  }
  .budget-item { text-align: center; }
  .budget-value { font-family: var(--font-display); font-size: 1.55rem; font-weight: 700; color: var(--cream); }
  .budget-label { font-family: var(--font-serif); font-size: 0.75rem; color: var(--tan); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem; }
  .budget-over { color: #FF7B7B; }

  .timeline { display: flex; flex-direction: column; gap: 0; }
  .timeline-section { margin-bottom: 1.5rem; }
  .timeline-heading {
    display: flex; align-items: center; gap: 0.75rem;
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--brown); margin-bottom: 0.75rem;
    padding-bottom: 0.5rem; border-bottom: 1px dashed var(--tan);
  }
  .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .timeline-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.65rem 1rem; border-radius: 16px;
    background: white; border: 2px solid rgba(237, 216, 205, 0.9);
    margin-bottom: 0.45rem;
  }
  .timeline-item-check { 
    width: 22px; height: 22px; border-radius: 8px; flex-shrink: 0; margin-top: 2px;
    border: 2px solid var(--tan); cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .timeline-item-check.checked { background: var(--green); border-color: var(--green); }
  .timeline-item-text { font-family: var(--font-serif); font-size: 16px; line-height: 1.5; flex: 1; }
  .timeline-item-text.done { text-decoration: line-through; color: var(--text-muted); }
  .timeline-add { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
  .timeline-add input { flex: 1; }
`;

export const RSVP_STYLES = `
  .rsvp-banner {
    background: linear-gradient(135deg, #8BC4A0 0%, #6A9B7D 55%, #5A8A6E 100%);
    border-radius: var(--radius-bubble);
    padding: 1.35rem 1.5rem;
    border: 3px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .rsvp-banner-text { color: white; }
  .rsvp-banner-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; }
  .rsvp-banner-sub {
    font-family: var(--font-serif);
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255,255,255,0.85);
    margin-top: 0.25rem;
  }
  .partiful-badge {
    background: rgba(255,255,255,0.22); border: 2px solid rgba(255,255,255,0.4);
    color: white; padding: 0.45rem 1.1rem; border-radius: var(--radius-pill);
    font-family: var(--font-serif);
    font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem;
  }
  .rsvp-manual { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .rsvp-count-input { display: flex; align-items: center; gap: 0.5rem; }
  .rsvp-count-input label { font-size: 0.9rem; font-weight: 600; }
  .stepper { display: flex; align-items: center; gap: 0; border: 2px solid var(--stone); border-radius: var(--radius-pill); overflow: hidden; background: white; }
  .stepper button { width: 36px; height: 36px; border: none; background: var(--stone); cursor: pointer; font-size: 1.1rem; transition: background 0.1s; }
  .stepper button:hover { background: var(--tan); }
  .stepper span { width: 48px; text-align: center; font-weight: 700; font-size: 1.05rem; background: white; display: block; height: 36px; line-height: 36px; }

  .partiful-panel {
    background: var(--teal-solid);
    border: none;
    border-radius: var(--radius-bubble);
    padding: 1.1rem 1.2rem;
    margin-bottom: 1rem;
  }
  .partiful-panel-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: #fff;
    margin-bottom: 0.45rem;
  }
  .partiful-panel-copy {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.92);
    margin-bottom: 0.75rem;
  }
  .partiful-panel .form-input {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.98);
  }
  .partiful-panel .form-hint {
    color: rgba(255, 255, 255, 0.82);
  }
`;

export const SYNC_STYLES = `
  .sync-badge{display:inline-flex;align-items:center;gap:0.35rem;font-family:var(--font-serif);font-size:0.8rem;font-weight:600;padding:0.35rem 0.75rem;border-radius:var(--radius-pill);transition:all 0.4s;background:rgba(255,255,255,0.1);}
  .sync-idle{color:rgba(255,255,255,0.3);}.sync-saving{color:var(--accent-light);}.sync-saved{color:#7EC89A;}.sync-error{color:#FF8A8A;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .spin{display:inline-block;animation:spin 0.7s linear infinite;}
  .loading-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:1rem;color:var(--text-muted);font-family:var(--font-serif);font-size:16px;line-height:1.7;}
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

