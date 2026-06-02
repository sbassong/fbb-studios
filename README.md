# FBB Studios

Marketing site for FBB Studios — a San Francisco-based Francophone film production house. Built with Astro, deployed on Cloudflare Pages.

**Live:** [fbbstudios.com](https://fbbstudios.com)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output, zero client JS |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Styling | Vanilla CSS with custom properties |
| Fonts | Cormorant Garamond + EB Garamond via `@fontsource` |
| Images | Astro image pipeline (WebP + srcset via sharp) |
| i18n | Built-in Astro i18n — French default (`/`), English at `/en/` |
| Content | Astro content collections (JSON files in `src/content/`) |
| Sitemap | `@astrojs/sitemap` with hreflang alternates |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run check      # TypeScript + Astro type check
```

---

## Project structure

```
src/
├── assets/              # Images processed by Astro (WebP, srcset)
├── components/
│   ├── pages/           # Page-level layout components
│   │   ├── HomePage.astro
│   │   └── StudioPage.astro
│   ├── DlaTeaser.astro
│   ├── SiteHeader.astro
│   └── SiteFooter.astro
├── content/
│   ├── series/          # DLA series content (dla.fr.json, dla.en.json)
│   └── studio/          # Studio content (fbb.fr.json, fbb.en.json)
├── i18n/
│   ├── en.ts            # English UI strings
│   ├── fr.ts            # French UI strings (source of truth / Dictionary type)
│   ├── index.ts         # getLangFromUrl, useTranslations, localePath helpers
│   └── content.ts       # getStudio(), getDla() content helpers
├── layouts/
│   └── BaseLayout.astro # Head, meta, OG, JSON-LD, skip link
├── pages/
│   ├── index.astro      # FR home (/)
│   ├── studio.astro     # FR studio (/studio)
│   └── en/              # EN routes (/en/*)
└── styles/
    ├── tokens.css        # Design tokens (colors, spacing, type scale)
    └── global.css        # Reset, base styles, utility classes
```

---

## Content management

All editable copy lives in JSON files — no code changes needed for text updates.

### Studio info
`src/content/studio/fbb.en.json` / `fbb.fr.json`

```jsonc
{
  "name": "FBB Studios",
  "tagline": "Production house · San Francisco",
  "mission": "...",          // Multi-paragraph: separate with \n\n
  "founders": [              // Empty array = team section hidden
    { "name": "...", "role": "...", "bio": "..." }
  ],
  "contact": {
    "email": "contact@fbbstudios.com",
    "phone": "+1 341-213-9496"
  },
  "social": { "instagram": "https://www.instagram.com/FBB_STUDIOS/" },
  "location": "San Francisco, CA"
}
```

### DLA series
`src/content/series/dla.en.json` / `dla.fr.json`

```jsonc
{
  "slug": "dla",
  "title": "DLA",
  "tagline": "One city · Three sisters · One story",
  "logline": "...",
  "status": "casting",       // casting | production | post | released
  "statusLabel": "Now casting · Douala",
  "location": "Douala, Cameroon",
  "castingEmail": "casting.dla.series@gmail.com",
  "trailerUrl": "",          // Populated when trailer drops
  "watchLinks": [],          // [{ "label": "...", "url": "..." }] at release
  "instagram": "https://www.instagram.com/FBB_STUDIOS/"
}
```

The DLA teaser on the home page renders differently per `status`:
- `casting` — shows casting email
- `post` — shows trailer button (requires `trailerUrl`)
- `released` — shows watch links (requires `watchLinks`)

---

## Adding a new language

1. Add a new locale in `astro.config.mjs` under `i18n.locales`
2. Create `src/i18n/<lang>.ts` matching the `Dictionary` type from `fr.ts`
3. Create `src/content/studio/fbb.<lang>.json` and `src/content/series/dla.<lang>.json`
4. Add `src/pages/<lang>/index.astro` and `src/pages/<lang>/studio.astro`

---

## Images

Hero and OG images are processed at build time. To swap them:

- **Hero background** — replace `src/assets/cam-effect-logo.jpg`, or update the `import` in `src/components/pages/HomePage.astro`
- **OG / social preview** — replace `src/assets/logo.jpeg`, or update the `import` in `src/layouts/BaseLayout.astro`

Images in `src/assets/` are automatically converted to WebP with responsive srcsets. Images in `public/` are served as-is (not optimized).

---

## Design tokens

`src/styles/tokens.css` defines the full colour system:

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0a0908` | Dark background, body text on light |
| `--bone` | `#ebe0c2` | Light section background |
| `--gold` | `#b8954a` | Primary accent — 7.1:1 on ink (AAA) |
| `--gold-muted` | `#7a5d2c` | Accents on bone sections — 4.6:1 on bone (AA) |
| `--gold-dim` | `#9a7840` | Subdued text on ink — 5.25:1 on ink (AA) |

> **Contrast note:** `--gold-muted` fails on `--ink` (3.24:1). Use `--gold-dim` for secondary text on dark backgrounds.

---

## Deploying

### Via Wrangler (direct upload)

```bash
npm run build
wrangler pages deploy dist --project-name fbb-studios
```

### Via Cloudflare Pages (Git integration)

Push to `main` — Cloudflare Pages builds and deploys automatically.

Build settings:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** `20` (set `NODE_VERSION=20` in environment variables)

