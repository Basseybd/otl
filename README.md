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

Before launch: set the domain, remove the `robots` noindex in `app/layout.tsx`, and add the OTL Sessions links when the set is up.
