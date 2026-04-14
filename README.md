# Portfolio — Markson Rebelo Marcolino

Personal portfolio website. Data Engineer based in Madrid with 15+ years of experience spanning data platforms, academia, and full-stack product development.

**Live:** [marksonmarcolino.com](https://marksonmarcolino.com) (or wherever you deploy it)

## Stack

- **Vue 3** (Composition API + `<script setup>`)
- **Vite** — build tool
- **Tailwind CSS** — utility-first styling
- **GSAP + ScrollTrigger** — scroll-triggered animations and entrance sequences
- **Lenis** — smooth scrolling
- **Lucide Vue Next** — icons
- **vue-i18n** — internationalization (EN, PT, ES, FR)
- **html2pdf.js** — client-side CV generation

## Features

- Dark terminal aesthetic with Bebas Neue display typography
- Horizontal scrollable career timeline with drag momentum
- Projects section with status badges (Live, Open Source)
- Publications list with role badges and expandable details
- Tech stack grid with production vs knowledge tiers
- Downloadable CV that respects active language
- Auto-detects browser language on first visit
- Cursor glow effect (desktop only)
- GSAP scroll reveal animations across all sections
- Fully responsive (mobile-first)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Deploy

Zero-config on Vercel:

```bash
vercel
```

Or push to a connected GitHub repo and Vercel deploys on every push.

## Project Structure

```
src/
  components/       Vue components (Hero, Nav, Timeline, etc.)
  composables/      Shared logic (useFilters, useCV, useLenis, useScrollReveal)
  data/             Content data files (timeline, projects, publications, stack)
  i18n/locales/     Translation files (en, pt, es, fr)
  views/            Page views (HomeView)
  assets/           Global CSS
public/             Static assets (photos, favicon)
```

## Content

All content lives in `src/data/` and `src/i18n/locales/`. To add a new job, project, or publication, edit the corresponding data file. Translations are in the locale files.

## License

MIT
