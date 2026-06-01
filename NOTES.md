# Content & infrastructure gaps — needs client input

Items where I've used placeholders, invented copy, or deferred work. Confirm or correct before launch.

## Studio (FBB)
- **Mission copy**: drafted a short positioning statement in FR + EN. Likely needs the client's own voice. See `src/content/studio/fbb.fr.json` and `fbb.en.json`.
- **Founders / team**: list is empty. Add names + roles when ready (schema in `src/content.config.ts`).
- **Contact email**: placeholder `contact@fbbstudios.com`. Confirm desired inbox address (needs a real domain registered first).
- **Instagram URL**: confirmed `https://www.instagram.com/FBB_STUDIOS/`.

## DLA (series)
- **Logline (FR + EN)**: I wrote a placeholder from the casting-poster fragments. The client likely has an official synopsis — swap in their wording in `src/content/series/dla.{fr,en}.json`.
- **Status label**: "En casting · Douala" / "Now casting · Douala" — confirm phrasing.
- **Status field**: currently `casting`. Update to `production` → `post` → `released` as the project progresses; the home teaser renders differently per status (`src/components/DlaTeaser.astro`).
- **Trailer URL / watch links**: empty. Populated when post-production / release lands.

## Brand assets
- **Logo (high priority)**: only a raster JPEG (`brand-source/logo-design1.jpeg`) exists. **Need a vectorized SVG** for crisp display, clean OG cards, and a non-typographic header. Until then, the header uses a typographic "FBB Studios" placeholder. The hero uses a CSS-mirrored "B" as approximation of the logo's mirrored-B styling.
- **Light-on-cream logo variant**: needed for any `section--bone` placement (currently none, but useful future-proofing).
- **Favicon set**: `public/favicon.svg` is a minimal placeholder. Need: 32×32 PNG, 180×180 apple-touch-icon PNG, 192/512 maskable PNG. Easiest path: hand the vector SVG to a generator like https://realfavicongenerator.net.
- **OG image**: default generated at build time from `src/assets/reels-hero.jpg` (1200px wide JPEG via Astro's image pipeline). All pages include `og:image` and `twitter:card: summary_large_image`. Per-page overrides can be passed via the `ogImage` prop on `BaseLayout`.

## Contact
- Contact is via phone (+1 341-213-9496) displayed on the home page and studio page.
- Casting inquiries for DLA go to `casting.dla.series@gmail.com`, displayed in the DLA teaser and studio page.

## Hosting / infra (separate from code)
- Register `fbbstudios.com` (and `.cm` if available, as a redirect).
- Set up Cloudflare account + Pages project + custom email routing.
- Plausible or Fathom account for analytics — then add the snippet to `BaseLayout.astro` (in the `<head>`).

## Verification still to run (post-deploy, needs live URL or physical device)
- WebPageTest from a Lagos node (target: under 3s fully-loaded on 3G)
- Real-device check: iPhone Safari + Android Chrome
- Google Rich Results test for JSON-LD (https://search.google.com/test/rich-results)
- OG card preview: Twitter, Slack, iMessage (use https://opengraph.xyz once live)

## Verification completed
- Lighthouse mobile — Performance 100, Accessibility 100, Best Practices 100, SEO 100 (production build)
- axe DevTools — 0 violations on all 4 pages (FR home, FR studio, EN home, EN studio)

## Accessibility decisions baked into the code
- `--gold` (#b8954a) on `--ink` (#0a0908) — contrast 7.1:1, AAA. Safe for body text on dark backgrounds.
- `--gold-muted` (#7a5d2c) on `--bone` (#ebe0c2) — contrast 4.6:1, passes AA. Used for eyebrow, status pill, button borders on bone sections only. Fails on `--ink` — do not use there.
- `--gold-dim` (#9a7840) on `--ink` — contrast 5.25:1, passes AA. Use for subdued/secondary text on dark backgrounds (header sub, footer rights, contact labels).
- `--bone` body color on bone sections is `--ink` (15:1+) — high contrast.
- `--gold` is NOT used for body text on `--bone` — fails contrast there.
