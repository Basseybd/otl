# Off The L

Website for OTL, a Brooklyn party collective. Next.js App Router, TypeScript, Tailwind 4, Three.js. Static, no backend.

```bash
npm ci
npm run dev
```

- Copy, links and media: `lib/content.ts`. Update the next party there; the countdown, board and line map follow.
- The OTL mark: `lib/paths.ts`.
- Design notes: `DESIGN.md`.
- The landing dive is adapted from Glyph Portal by Christian Katzmann (MIT); the notice is kept in `components/logo-portal.tsx`.

Before launch: set the domain, remove the `robots` noindex in `app/layout.tsx`, and add the OTL Sessions links when the set is up.
