# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Production build
npm run preview   # Preview production build
```

No test suite is configured.

## Environment

Supabase credentials are required for data persistence. Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Without valid credentials the app still runs — `loadWorkshops()` returns `[]` and save operations no-op silently.

## Architecture

Single-page React 18 app (Vite) with MUI components and Supabase as the backend.

### File layout quirk

There are two component/data locations — the **root-level directories are canonical**:

- `components/*.jsx` — actual component implementations
- `data/workshops.js` + `data/supabaseClient.js` — actual data logic

The `src/components/*.jsx` and `src/data/workshops.js` files are thin re-export stubs that forward everything from the root directories. Always edit the root-level files.

### State and data flow

All workshop state lives in `src/App.jsx`:
- `workshops` array is the single source of truth
- Any edit updates local state immediately, then a 600 ms debounce triggers `saveWorkshops()` to Supabase
- `deleteWorkshopById()` is called directly (no debounce)

### Workshop data shape

```js
{
  id: string,           // UUID
  name: string,
  date: string,         // "YYYY-MM-DD"
  capacity: number,
  budget: number,       // total dollar budget
  rsvpCount: number,
  baseServings: number, // recipe base (default 4)
  ingredients: [{ id, name, baseQty, unit, costPer, packageSize }],
  timeline: { week: [...], day_before: [...], day_of: [...] }  // checklist items
}
```

Key derived values (computed inline, not stored):
- `scale = rsvpCount / baseServings` (fallback 1) — multiplier for ingredient quantities
- `totalCost = sum(costPer * baseQty * scale)`
- Fill % = `rsvpCount / capacity`

### Supabase schema

Two tables: `workshops` (snake_case columns) and `ingredients` (with `workshop_id` FK). The data layer maps between camelCase (JS) and snake_case (DB) in `toWorkshopRow` / `fromWorkshopRow` / `toIngredientRows` / `fromIngredientRow`.

### Component responsibilities

- `App.jsx` — dashboard, card grid, filtering/search, modal orchestration
- `CreateModal` — new workshop form (name, date, capacity, budget)
- `WorkshopModal` — tabbed detail/edit view per workshop; tabs: RSVPs, Ingredients & Budget, Timeline
- `RsvpTab` — edit rsvpCount, capacity, date, name
- `IngredientsBudgetTab` — ingredient CRUD, scaled cost display, budget tracking
- `TimelineTab` — three-section prep checklist (week-before, day-before, day-of)

### Theme

Central MUI theme in `src/theme/workshopTheme.js`. Use the exported `workshopPalette` object for raw color tokens (e.g. `workshopPalette.tealSolid`, `workshopPalette.accent`). Typography: Lora for headings, Plus Jakarta Sans for body, Poppins for captions/subtitles.

## Working Principles

### Scope and Feature Control
- **Implement only what is explicitly requested** — do not add features, optimizations, or "nice to haves" unless specifically asked
- If you see an opportunity for improvement, **describe it and ask first** rather than implementing it
- Stick to the minimal change needed to complete the request

### Styling and Formatting
- **NEVER make inline style changes** unless explicitly requested to modify styles
- Use the existing theme system (`workshopTheme.js` and `workshopPalette`) — do not add inline styles or style props
- If styling improvements are needed, ask first and point to the theme file for any changes

### Architectural Changes
- **Always confirm before making architectural changes**, including:
  - Changing component structure or responsibilities
  - Adding new dependencies or libraries
  - Modifying data flow or state management patterns
  - Restructuring file organization
  - Changing the database schema or Supabase structure
- When proposing architectural changes, explain the reasoning and wait for approval

### Workflow for Changes
1. Understand the specific request
2. If the request is ambiguous or could benefit from architectural changes, **ask clarifying questions first**
3. Propose a plan for complex changes before implementing
4. Make the minimal change needed
5. Confirm completion without adding unrequested features