# Cooking Workshop Manager

A React app for planning and managing cooking workshops. Track RSVPs, scale ingredient quantities, and manage budgets.

**Live site:** https://strangeforloop.github.io/Workshop-Manager/

<img width="3258" height="1724" alt="image" src="https://github.com/user-attachments/assets/7d39a86c-949f-48e0-9219-d73e54397fad" />

## Features

- Create and manage multiple workshops
- RSVP tracking
- Ingredient scaling based on attendee count
- Budget tracking with per-person cost breakdown

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
