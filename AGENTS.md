# AGENTS.md

Notes for agents working in this repo. Setup specifics only — what the manifests
already say is not repeated here.

## What this is

Single-page React + Vite + Tailwind marketing site. **No backend, no database,
no migrations, no seeds, no test runner, no linter.** `npm run build` is the only
extra script.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build   # http://localhost:3000
docker compose -f docker-compose.base44.yml logs -f web
```

The `web` service uses a plain `node:22` image, bind-mounts the repo, and runs
`npm ci && npm run dev` on startup. `node_modules` lives in an anonymous volume,
so it is installed inside the container rather than on the sandbox host.

**After editing `package.json`**, refresh the committed lockfile or the container
startup (`npm ci`) will fail:

```bash
docker run --rm -v "$PWD":/app -w /app node:22 npm install --package-lock-only
```

## Sandbox-only overrides (BASE44_PREVIEW_MODE)

`vite.config.js` adds two things *only* when `BASE44_PREVIEW_MODE === '1'`:

1. `server.allowedHosts` — the preview proxy reaches the dev server as
   `<port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN` and the browser's Origin is
   `https://3000-$BASE44_PUBLIC_HOST_SUFFIX`, so both are allow-listed.
2. `server.watch.usePolling` — bind mounts do not emit inotify events reliably
   in the sandbox.

With the flag unset (any other value, or absent) neither is applied and Vite's
defaults are untouched. The three `BASE44_*` variables are passed to the service
from the sandbox via compose `environment:`; never hardcode their resolved values.

## Verifying the app is up and serving live source

```bash
curl -s http://localhost:3000/ | grep -c '@vite/client'   # dev server, not a build
curl -s http://localhost:3000/src/main.jsx | head -3      # served from the bind mount
docker compose -f docker-compose.base44.yml ps            # web should be healthy
```

If the root document has no `/@vite/client` script, the port is being served by a
prebuilt bundle and the edit loop is broken.

## Gotchas

- **Media is external.** Photos are hot-linked from `images.unsplash.com`, and
  `VideoModal.jsx` plays a public sample MP4. Verify any replacement URL with
  `curl -r 0-1000` before committing — Google's `gtv-videos-bucket` sample
  clips return **403** and are not usable here.
- **Brand name is Aurelia** throughout. (The reference mock this was built from
  used "Nexora"; that name survives only in the mock, not in the code.)
- **Anchors are load-bearing.** The nav links point at section ids
  (`#home`, `#properties`, `#about`, `#services`, `#contact`); renaming an id
  silently breaks navigation.
- `[id] { scroll-margin-top }` in `src/index.css` compensates for the fixed
  nav, so in-page anchors don't land under the header.

## Scroll-driven hero

`src/components/Hero.jsx` is a 600vh section holding a sticky 100vh stage. GSAP
ScrollTrigger (driven through Lenis smooth scrolling) reports progress, and a
rAF loop eases it into `video.currentTime` — the video is **never played**: it is
muted, paused and only seeked. All copy timings live in the `TIMELINE` constant
at the top of that file.

- Assets in `public/`: `hero.mp4` (desktop), `hero-mobile.mp4` (used below 768px,
  chosen once at mount) and `hero-poster.jpg` (first frame, shown if the video
  errors). The MP4s must be `-movflags +faststart` or scrubbing stutters.
- `gsap` and `lenis` are runtime dependencies — after changing them, refresh
  `package-lock.json` or the container's `npm ci` fails.
- Lenis owns the scroll, so in-page anchors rely on its `anchors` option.
- `prefers-reduced-motion` collapses the hero to 100vh with a static composition
  and the video parked on its last frame.

Verify the scrub by scrolling to a fraction of the hero and reading
`document.querySelector('video').currentTime`; it should track
`progress × duration` and end at ~`duration` just before the hero un-sticks.
