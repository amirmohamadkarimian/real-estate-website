# Aurelia — real estate landing page

A single-page marketing site for the fictional real estate brand **Aurelia**
(tagline: *Live a Better Tomorrow*). Editorial-minimal design: cinematic dark
hero, cream content sections, hairline dividers, generous whitespace.

No backend, no database — it is a static React page, so there is nothing to
migrate or seed.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite 6 |
| Styling | Tailwind CSS 3 (design tokens in `tailwind.config.js`) |
| Icons | Inline SVG set — `src/components/Icons.jsx` (thin 1.5px line icons) |
| Fonts | Playfair Display (headlines), Inter (UI/body), Caveat (script) — Google Fonts |

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

The site is served on <http://localhost:3000>. Dependencies are installed inside
the container on startup from `package-lock.json`, and Vite runs in dev mode, so
edits to `src/` appear without rebuilding.

For a plain local run outside Docker: `npm ci && npm run dev`.

## Structure

```
src/
  App.jsx                     page composition
  data/content.js             copy, property records, image URLs
  components/
    Nav.jsx                   transparent nav, blurs on scroll, mobile drawer
    Hero.jsx                  autoplay crossfade slider (3 slides)
    FeatureStrip.jsx          4-up feature bar (2x2 on mobile)
    FeaturedProperties.jsx    section header + card layout
    PropertyCard.jsx
    AboutSplit.jsx            video side + copy + count-up stats
    VideoModal.jsx            "Watch Our Story" modal
    CtaBanner.jsx
    Footer.jsx
    Icons.jsx / Reveal.jsx / CountUp.jsx
```

## Design tokens

- `ink` `#0F1A17` — hero, footer, dark buttons
- `cream` `#F7F4EE` — section backgrounds · cards are `white`
- `muted` `#6B6B66` — secondary text
- `gold` `#C98A4B` / `gold-soft` `#E8A45C` — the only accent (warm amber, from lit windows)

Sections are anchored for the nav: `#home`, `#properties`, `#about`, `#services`
(feature strip), `#contact` (CTA banner).

## Media

Photography is hot-linked from `images.unsplash.com` (dusk/golden-hour
architecture) and the story modal plays a public sample clip — both are
placeholders to swap for the brand's own assets.

## Sandbox notes

`docker-compose.base44.yml` and the `BASE44_PREVIEW_MODE` gate in
`vite.config.js` exist only for the Base44 sandbox preview; see `AGENTS.md`.
