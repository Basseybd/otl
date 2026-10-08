# Off The L

Website for OTL, a Brooklyn party collective. Next.js App Router, TypeScript, Tailwind 4, Three.js. Static, no backend.

```bash
npm ci
npm run dev
```

- Copy, links and media: `lib/content.ts`. Update the next party there; the countdown, board and line map follow.
- Party photos are listed as Pixieset paths in `lib/content.ts`. `npm run build` first runs `scripts/fetch-photos.mjs`, which copies them into `public/media/stops` (1200px WebP, metadata stripped). Anything it cannot fetch stays on its Pixieset URL.
- The OTL mark: `lib/paths.ts`.
- The landing dive is adapted from Glyph Portal by Christian Katzmann (MIT); the notice is kept in `components/logo-portal.tsx`.

## Tests and auto-merge

Playwright smoke tests in `e2e/` run against the production build at 1440 x 900 and 390 x 844: no console errors, security headers, the footage loads, the dive banks and lands level, every past-party photo loads, no sideways scroll, reduced motion.

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Every pull request into `main` runs them in GitHub Actions (`.github/workflows/e2e.yml`). When they pass and the Vercel preview for the same commit is ready, the PR merges itself. A test that only passes on retry counts as a failure.

- To hold a PR back, open it as a draft or add the `hold` label.
- PRs that change the tests, the Playwright config or the workflow wait for a human merge.
- If another PR merged while the tests ran, it comments instead of merging. Click **Update branch** to retest on the new `main`.
- Only the repo owner's PRs from branches in this repo auto-merge, never forks or bots.

Before launch: set the domain, remove the `robots` noindex in `app/layout.tsx`, and add the OTL Sessions links when the set is up.
