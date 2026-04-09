# Cooking Workshop Manager

A React app for planning and managing cooking workshops. Track RSVPs, scale ingredient quantities, manage budgets, and organize prep timelines.

**Live site:** https://strangeforloop.github.io/Workshop-Manager/

## Features

- Create and manage multiple workshops
- RSVP tracking with capacity fill percentage
- Ingredient scaling based on attendee count
- Budget tracking with per-person cost breakdown
- Prep timeline checklists (week before, day before, day of)

## Tech Stack

- React 18 + Vite
- MUI (Material UI) for components
- Supabase for data persistence

## Getting Started

```bash
npm install
npm run dev
```

Supabase credentials are required for data persistence. Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Without credentials the app still runs — workshops won't be saved between sessions.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```
