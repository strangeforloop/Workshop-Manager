# Workshop Manager V1 - Project Context

## What this project does

Workshop Manager V1 is a single-page web app for planning and managing creative workshops. It helps a host:

- Create and track workshops (name, date, capacity, budget)
- Manage RSVP counts and capacity utilization
- Plan ingredient quantities and budget impact
- Track prep tasks with a timeline/checklist
- Open a detailed modal per workshop for editing operational details

The homepage is a dashboard-style view with:

- A search bar and quick filters
- Workshop type cards (top category cards)
- A pinned "New Workshop" card
- A grid of workshop summary cards with key metrics

## How it works

### 1. App lifecycle and state

Main state is managed in `src/App.jsx`:

- `workshops`: in-memory list of all workshop objects
- `showCreate`: controls the create-workshop dialog
- `activeWorkshop`: selected workshop in the detail modal
- `activeTab`: active tab in the workshop modal (`rsvp`, `ingredients`, etc.)
- `query` and `filter`: homepage search/filter UI state
- `syncStatus`: save status badge state (`idle`, `saving`, `saved`, `error`)

On load:

1. Workshops are loaded via `loadWorkshops()`
2. App renders dashboard cards

On updates:

1. Workshop edits update local React state immediately
2. Changes are debounced and persisted via `saveWorkshops()`

### 2. Workshop creation/editing flow

- `CreateModal` creates a new workshop object from form data.
- Clicking a workshop card opens `WorkshopModal`.
- `WorkshopModal` routes editing through tab components:
  - `RsvpTab` for attendee and event details
  - `IngredientsBudgetTab` for ingredient scaling and cost calculations
  - `TimelineTab` for prep checklist tasks

### 3. Data shape and calculations

Each workshop includes values such as:

- `name`, `date`, `capacity`, `rsvpCount`
- `budget`, `baseServings`
- `ingredients[]` (with `baseQty`, `unit`, `costPer`, `packageSize`)
- `timeline` sections with checklist items

Core calculations used in cards and modal tabs:

- RSVP fill percentage (`rsvpCount / capacity`)
- Scale factor (`rsvpCount / baseServings`, fallback to `1`)
- Total ingredient cost from scaled quantities and cost-per-unit
- Budget over/under state

### 4. Persistence and backend behavior

Data utilities live in `src/data/workshops` and related modules.

- Supabase is used when valid environment values are provided.
- App gracefully handles fallback behavior if backend config is missing/invalid.
- Save operations are debounced to avoid excessive writes.

## Technologies used

### Frontend

- **React 18** (functional components + hooks)
- **Vite** (dev/build tooling)
- **MUI (Material UI)** for component primitives and layout
- **Emotion** (`@emotion/react`, `@emotion/styled`) for MUI styling engine

### Styling and design system

- Central MUI theme in `src/theme/workshopTheme.js`
- Custom palette tokens (warm neutrals, greens, accents)
- Typography stack includes:
  - Lora (serif display)
  - Plus Jakarta Sans (main UI/body)
  - Poppins (secondary text roles)

### Data/backend

- **Supabase JS client** (`@supabase/supabase-js`)
- Environment-based configuration (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### Build and runtime

- Node/npm scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`

## Key files

- `src/App.jsx` - dashboard layout, filtering, card rendering, modal orchestration
- `src/components/CreateModal.jsx` - new workshop form dialog
- `src/components/WorkshopModal.jsx` - detailed workshop editing modal
- `src/components/RsvpTab.jsx` - RSVP and event details tab
- `src/components/IngredientsBudgetTab.jsx` - ingredients, scaling, and budget tab
- `src/components/TimelineTab.jsx` - checklist/timeline tab
- `src/components/WorkshopTypeCards.jsx` - top category card strip
- `src/theme/workshopTheme.js` - MUI theme, colors, and typography

