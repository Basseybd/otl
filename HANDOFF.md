# HANDOFF: OTL (Off The L) website

Written Thu Oct 8, 2026 by Claude (claude.ai chat, Project "Project OTL") for a fresh Claude Code session on Bassey's Windows PC. Source of truth for everything below: the claude.ai chat "Party branch OTL website" (https://claude.ai/chat/d1fd9e61-b6a9-4c71-b145-21ba68436dd5, Oct 7, 2026, 2:23 PM to 5:47 PM ET) plus the GitHub repo as of commit `65bb10f`.

Where something is unknown or unverified it says **UNKNOWN** or **UNVERIFIED**. Do not guess past those.

---

## 1. PROJECT SNAPSHOT

**Project name:** OTL website (repo `Basseybd/otl`, Vercel project `otl`, claude.ai Project "Project OTL", description "OTL website").

**What it is:** A one-page marketing site for Off The L (OTL), a Brooklyn party collective Bassey co-runs (Afrobeats, hip hop, dancehall and global sounds). It is designed to look and feel exactly like OTL's email newsletter, the "OTL Dispatch" ("The Line"): black ground, MTA-style station signs with a grey "L" bullet, amber LED departure-board text, and a cream subway call button. The landing is a scroll-driven "logo portal": the traced OTL logo is a window onto party footage drawn as a silver WebGL halftone, and scrolling dives the camera into the foot of the L and lands on a departure board for the next party. Below that: an Instagram-style reel card, a "Past stops" arrivals board with photos from past parties, "The line so far" timeline, a "Get on the list" section, and a footer.

**Who it's for:** Party-goers and followers of @otl_nyc, mostly arriving from Instagram on a phone (often the iOS Instagram in-app browser). Secondary: Bassey's OTL team.

**End goal:** A tasteful, fast, secure public site on a real domain that drives RSVPs (Posh), Instagram follows, and mailing list signups (via Linktree), and shows off past parties.

**Current status:** **Working, deployed, pre-launch.** All 8 PRs are merged to `main` and Vercel production builds reported success. The site is intentionally hidden from search engines (`noindex`) and has no custom domain yet.

**What "done" looks like (launch):**
- A custom domain bought and attached in Vercel (none chosen yet, see section 10).
- `robots` noindex removed from `app/layout.tsx` and the `X-Robots-Tag` header removed from `next.config.ts`.
- Bassey has checked the live site on his phone: all 25 party photos load, the reel card looks right, the dive is smooth.
- OTL Sessions YouTube/SoundCloud links added once they exist.
- Vercel project on the Pro plan (commercial brand site).
- After Full Circle (Oct 11, 2026), the next party is set in `lib/content.ts` and Full Circle moves into Past stops.

---

## 2. INSTRUCTIONS & PREFERENCES

### 2a. Project custom instructions
The claude.ai Project "Project OTL" has **no custom instructions** (empty) and **no knowledge files**. Project description: "OTL website".

### 2b. Bassey's standing preferences (from his saved memory, apply everywhere)
- Never use em dashes in any writing, ever (copy, alt text, comments, commit messages, docs, PR bodies). Use periods, commas, or restructure.
- Communication style: casual and direct. His messages are typo-heavy; your output must be clean and polished.
- Prefers short, tight writing.

### 2c. His design skills (they define the standard for this site)
Two of his own skills governed this build. If they are available in Claude Code, load them before any work; if not, the key rules are summarized here.
- **`bassey-web-design`**: his build loop (size the work, `.claude/plan.md` with a numbered "Done means" list, build, council review, fix, learn, ship), security rules, pre-ship checklist. Key rules used on OTL:
  - **Client and friend brands win on color and type** (OTL is named explicitly). His personal silver/chrome Japandi palette does NOT apply to OTL. His bar, taste rules, Refuse list and security rules still apply.
  - Taste first ("he has taste"), real content only, sleek beats busy, phones first, secure by default.
  - Refuse: eyebrow/kicker labels above headings, 01/02/03 numbering, gradient text, glass/blur, icon-card grids, big-number stat heroes, emoji or unicode arrows as icons, placeholder copy.
  - All claims, links and media in one content file (`lib/content.ts`), never hard-coded in components.
  - Self-host fonts (Fontsource), never Google Fonts at runtime.
  - One authored motion moment per page; transform/opacity only; `prefers-reduced-motion` fallback that still looks designed; pause animation offscreen and in hidden tabs.
  - Images: EXIF orientation applied, WebP, width/height always set, metadata stripped.
  - Pin dependency versions exactly. `engines.node` = `24.x`. Commit `vercel.json` with `"framework": "nextjs"`.
  - Vercel Hobby is non-commercial; client/brand sites go on **Pro**.
  - Lessons from a round are proposed as an update to the skill's Lessons section (Bassey approves), never stored in a repo file (`.claude/lessons.md` is gitignored).
- **`bassey-site-audit`**: the review council (security, design/taste, mobile/a11y/perf, copy, then an independent verifier).
- **`web-graphics-kit`**: his effects kit (loaded for the portal/halftone).

### 2d. Everything he asked for in the chat (verbatim, typos and all, with what it meant)
1. Oct 7, 2:23 PM (first message, with attachments: the newsletter HTML templates, a 21st.dev "Glyph Portal" component):
   > "https://github.com/Basseybd/otl
   > mke me a website for ym partt branch otl the avbeo is the newlatter. use whater skills i haev given you and amke ti alot the teem of the news latter.
   > i liek thsi for the otl vibe liek amne the lanting page and the sroll goes intot eh otl suff geto isnpotirn and fele feel to cehck otu 21 centure dv for more insprautisn on desgin. also su you sue the taste skill impepelce skill tyaste impeccable playwirte cli awseome desgin and image 23.js if possibelif nto tlet me knwo tis not psosibel!"
   - Meaning: build a site for his party brand OTL, styled like the attached newsletter; landing like the Glyph Portal he sent, where scrolling dives into the OTL content; 21st.dev for inspiration; use the taste skill, impeccable skill, Playwright CLI, awesome-design, and "image 23.js" (interpreted as Three.js; **UNCONFIRMED**, he never said whether he meant anime.js or something else).
2. 3:59 PM (with a registrar search results attachment): "make a list of these and price i can share with my team" (domain list, see section 10).
3. 4:00 PM: "hwo can i amke the producl rul prublic lol" (how to make the Vercel preview URL public).
4. 4:11 PM: "hgiow link tree https://linktr.ee/otl_nyc / the pixel gallery form past parties [Pixieset links] ... and stuff liek thsi to the wbeite and go to the be creatig with ti also io liekt eh zoom animtion cna you make it more seemless no nee dot deweal on that" (add Linktree and Pixieset past-party galleries; make the zoom/dive smoother).
5. 4:33 PM: "dont over the the photos!" (don't overdo the photos).
6. 4:34 PM: "put what is tasteuel and amke surte the colros are also tasteleu" (tasteful picks, tasteful colors).
7. 4:34 PM: "i can be mroe than oen sjtu pic the ebst oens and keep it teastfuel!" (more than one photo per party is fine, pick the best, keep it tasteful).
8. 4:53 PM: "is ther a wya we can get this link https://www.instagram.com/p/DcXCl5lJLpB/ liekthe video on teh wbesaite?"
9. 4:59 PM: "he wnat to embed thsi link on the video https://www.instagram.com/p/DcXCl5lJLpB/ tyso drive peoepol to out page" (embed it to drive people to the OTL Instagram).
10. 5:01 PM: "also the photo seletiosn it terribel pick better forhogt for sessiosn pleaes pelase its mant o be use recoviend DJ sets, for pink freencyen do the smaee better pohohotn the threm is peink we wnt viasuall strikeing pics. sma eof rjean and tavs beter i ahev a better pick ont ehre like visual strivign look a tthe pick on ym profiuoso wesite ther is once that ther and also on piczle that really good the kick off was good mayueb sawp otut eh topo right one and for another pip partt pick phootn with corwns and better quirlity thanks!"
11. 5:06 PM: "make a pull redut and pll them and yes ytopure right abotu these!" (make a PR and merge; confirmed "Crowned" is from Another Brit Party and "Behind the decks" is from Jean & Tav's).
12. 5:17 PM: his own Pixieset shared selections, "pick ytou favs and use those for th photos thanks!":
    - OTL Sessions: https://offthel.pixieset.com/share/6ac6b547468c3
    - Jean & Tav's Birthday: https://offthel.pixieset.com/share/6ac6b58dc5c36
    - Pink Frequency: https://offthel.pixieset.com/share/6ac6b5e1d1e0c
    - The Kick Off: https://offthel.pixieset.com/share/6ac6b65167e74 ("more than thre epcik your favs")
    - Another Brit Party: https://offthel.pixieset.com/share/6ac6b6cee10d1
13. 5:20 PM: "its 3 max per pary fyi!"
14. 5:22 PM: "soem photos arent laoding and i thin the 5 are good lol mayeb we cna do 5 per party lol" (reversed: **5 photos per party is the current rule**).
15. 5:38 PM: Brit Party gold crown and crown + red England shirt photos not rendering; Jean & Tav "i ahte th two you added use these isnted as extra https://offthel.pixieset.com/share/6ac6bb3f55ec8"; Sessions "use these https://offthel.pixieset.com/share/6ac6bba48445c plus this oen tha ti attached olkay?" (attached a portrait photo).
16. 5:43 PM (with an example image of how he pictured the embed): "also when you are doen after you pus this is how ie invisoed the embnmde vieo i ened you to celan up your impletisodn somehtig is off lol make it look slcika nd smeallinely interagted / one photo the topl riogjht on pink freqneur sint loading!"

### 2e. Design direction (OTL brand, from the newsletter)
Tokens live in `app/globals.css` (`@theme`) and `DESIGN.md`:

| Token | Value | Use |
|---|---|---|
| ground | `#000000` | page background |
| raised / sign | `#0a0c10` / `#050505` | station signs, departure board |
| hair / bezel | `#22252c` / `#3c3d43` | hairlines, sign borders |
| ink / body / muted | `#f1f2f5` / `#c4cad4` / `#8b8f9a` | text |
| rail | `#a7a9ac` | L bullet, sign top rule, line map |
| led | `#ffb000` | the ONE accent: ticker, ETAs, lit stop, focus rings, selection |
| cta / cta-ink | `#f1ede3` / `#0a0a0a` | call button |

- Type: **Archivo 800/900** (display), **Arimo 400/700** (sign names and body), **Share Tech Mono** (only LED data: times, countdown, ticker, addresses). All self-hosted via Fontsource.
- Signs and labels uppercase like the newsletter; body sentence case.
- Components: station sign (L bullet + uppercase name + optional LED ETA) is the section heading, no eyebrows; cream call button with grey bezel that presses down 2px; departure board; line map (done stops filled, next party lit amber, future dashed, vertical on phones); the traced OTL mark from `lib/paths.ts` reused for portal, footer, site bar, favicon, preview image, reel avatar.
- Motion: one authored moment (the logo portal dive). Everything else still except the LED ticker. Reduced motion: no pin, still halftone frame, no ticker motion.
- Photos: one quiet shared grade so warm/red/daylight sets sit together on black (`filter: saturate(0.92) contrast(1.03)`, full color on hover). He wanted the pinks and reds to hit, so the grade was lightened from an earlier `saturate(0.82) contrast(1.04) brightness(0.96)`.
- Photo picks must be **visually striking**; Sessions should read as **recorded DJ sets**; Pink Frequency's theme is **pink**; Brit Party should feature **crowns** and better quality.

### 2f. Things he explicitly rejected or didn't like
- **Too many photos** at first ("dont over the the photos!"). Then he wanted more than one per party, then set **3 max**, then reversed to **5 per party** (current).
- **Claude's first photo selections**: "terribel" for Sessions, Pink Frequency, Jean & Tav. Wanted DJ shots, pink, visually striking, crowns. Later replaced by his own Pixieset selections.
- **Two Jean & Tav extras** Claude added (DJ hands up `bb8a77ae...`, green top in red light `f29e08b1...`): "i ahte th two you added". Replaced with his share `6ac6bb3f55ec8`.
- **The tap-to-load Instagram iframe embed**: "somehtig is off lol make it look slcika nd smeallinely interagted". Replaced with a custom Instagram-style card that links out (no iframe, no Instagram scripts).
- Kick Off: "the kick off was good mayueb sawp otut eh topo right one" (swap the top-right photo only).
- Photos that didn't render (wrong file extension casing) were called out three times.

---

## 3. FILES & LOCATIONS

### 3a. Where the work lives
- **GitHub (the real home):** https://github.com/Basseybd/otl, branch `main`, HEAD `65bb10f00fb6badf6dac86dbc616ba840d7ecc1c` ("Merge pull request #8 from Basseybd/site-reel-card", Oct 7, 2026 17:47:45 -0400). Everything is committed and pushed.
- **Target local path on Windows:** `C:\Users\basse\Desktop\Repos\otl` (does not exist yet unless Bassey already cloned it; **UNKNOWN**).
- The Cowork build happened in a cloud sandbox at `/home/claude/otl`. That sandbox is gone; nothing from it is needed except what's in the repo.
- **This file:** written to the repo root (`HANDOFF.md`) in a fresh clone in this chat's workspace. It is **not committed** to GitHub. Copy it to `C:\Users\basse\Desktop\Repos\otl\HANDOFF.md`.

### 3b. Every tracked file in the repo (all final, on `main`)
| Path | What it is |
|---|---|
| `.claude/plan.md` | The v1 plan: the ask, sections, and the 10-item "Done means" list |
| `.claude/claude-security-guidance.md` | Threat model: static site, no forms/secrets, outbound links only, never ship trackers or EXIF |
| `.gitignore` | Ignores node_modules, .next, out, .env*, .vercel, *.tsbuildinfo, next-env.d.ts, `.claude/lessons.md`, `public/media/stops/` |
| `.npmrc` | `ignore-scripts=true` (supply-chain hardening) |
| `DESIGN.md` | Tokens, type, components, motion (summarized in 2e) |
| `README.md` | Install/run, where content lives, before-launch list |
| `app/globals.css` | Tailwind 4 `@theme` tokens and all component CSS (signs, cta, ticker, line map, arrivals board, reel card) |
| `app/icon.svg` | Favicon from the OTL mark |
| `app/layout.tsx` | Fonts, metadata, OG image, `robots: { index: false, follow: false }`, `metadataBase` from `VERCEL_PROJECT_PRODUCTION_URL` |
| `app/page.tsx` | The single page: hero/portal, board, "Last time on the L" (reel card), Past stops, The line so far, Get on the list, footer |
| `components/logo-portal.tsx` | Scroll-pinned portal through the OTL mark. Adapted from Glyph Portal by Christian Katzmann (MIT, notice kept, must stay). Inertia easing (exp, 90ms) and sine in-out curve |
| `components/halftone-field.tsx` | Three.js shader: party clip as silver halftone. Falls back to plain video, then poster. Pauses offscreen/hidden tab |
| `components/hero.tsx` | Opening frame (ticker, site bar, mark, tagline, RSVP, "Scroll to board") |
| `components/countdown.tsx` | `relativeLabel()` live countdown in America/New_York, flips after the party |
| `components/line-map.tsx` | "The line so far" map |
| `components/past-stops.tsx` | Arrivals board: tablist of parties (arrow keys work), 5-photo mosaic (lead + 2x2), "See all the photos" |
| `components/reel-embed.tsx` | Instagram-style post card (OTL mark avatar, @otl_nyc, looping clip, play button, "Watch the full reel"), whole card links to the post |
| `components/auto-video.tsx` | Muted autoplay looping video with fallbacks |
| `components/rsvp-link.tsx` | RSVP button that switches to "Catch the next stop" after the party ends |
| `components/mark.tsx` | OTL mark SVG component |
| `lib/content.ts` | ALL copy, links, dates, photos. Edit this, not components |
| `lib/paths.ts` | Traced OTL masthead SVG paths (fill, strokes, rails, ties, skew transform) |
| `lib/photo-manifest.json` | Generated by the build script. Committed as `{}`. Maps Pixieset paths to local `/media/stops/*.webp` |
| `next.config.ts` | CSP and security headers, `X-Robots-Tag: noindex`, `images.remotePatterns` for 5 Pixieset folders only |
| `package.json` / `package-lock.json` | Pinned deps (section 4) |
| `postcss.config.mjs` | `@tailwindcss/postcss` |
| `public/media/feed.mp4`, `feed.webm`, `feed-poster.webp` | The short party clip from the newsletter (480x384, ~3s) and its poster |
| `public/media/full-circle-560.webp`, `full-circle-880.webp` | Full Circle poster |
| `public/media/sessions-portrait.webp` | Bassey's attached Sessions portrait (1200x1800, EXIF stripped) |
| `public/og.png` | 1200x630 link preview image |
| `scripts/fetch-photos.mjs` | Build step: downloads every `px("...")` Pixieset photo into `public/media/stops/` as 1200px WebP (sharp, metadata stripped), tries `.JPG/.jpg/.JPEG/.jpeg`, falls back to the Pixieset URL |
| `tsconfig.json` | Strict TS, `@/*` alias |
| `vercel.json` | `{"framework": "nextjs"}` |

### 3c. Remote branches (all merged, safe to delete)
`site-v1`, `site-galleries`, `site-reel-photos`, `site-photo-picks`, `site-three-max`, `site-photos-local`, `site-photo-fixes`, `site-reel-card`.

### 3d. Files that only existed in Cowork/chat (not in the repo)
None of these are needed to run the site. Listed so nothing is assumed missing.
- `eaab5afe-OTL_Dispatch_Template.html`: the dark newsletter template (source of tokens, logo SVG, clip, poster). Lived in Cowork uploads. **Not in repo.** Ask Bassey if you need it again.
- A second, light variant of the newsletter template (diffed once, unused). **Not in repo.**
- `1d57ad3e-attachment.txt`: registrar domain search results. Data preserved in the domain board artifact (section 10).
- `bd9e117d-image.jpg`: the Sessions portrait. Already in repo as `public/media/sessions-portrait.webp`.
- Bassey's example image of the reel card he envisioned (5:43 PM). **Not saved anywhere.**
- Screenshots sent in chat (`otl-desktop.png`, `otl-phone.png`, `stops.png`, `card-m.png`): throwaway.
- The Glyph Portal source he attached from 21st.dev: adapted into `components/logo-portal.tsx`; original not saved.
- **OTL Domain Board** artifact (shareable page): https://claude.ai/artifact/ELdsqAYx41TLPSLJVdyzzv (private until he shares it).

---

## 4. CODE & TECH

### 4a. Repo
- Path (target): `C:\Users\basse\Desktop\Repos\otl`
- Remote: `https://github.com/Basseybd/otl.git`
- Branch: `main` (default). HEAD `65bb10f`.
- Status: everything committed and pushed. 8 PRs (#1 to #8), all merged.
- Git identity used for commits: `Bassey Duke <Bassey.bd@gmail.com>`.

### 4b. Stack (exact pinned versions from `package.json`)
- Node `24.x` (`engines`). Package manager: **npm** (lockfile v3, `package-lock.json`).
- `next` 16.3.8 (App Router, static), `react` 19.3.0, `react-dom` 19.3.0
- `three` 0.186.1 (needs WebGL2; older browsers get the clip fallback)
- `@fontsource/archivo` 5.3.0, `@fontsource/arimo` 5.3.0, `@fontsource/share-tech-mono` 5.3.0
- Dev: `typescript` 5.9.3, `tailwindcss` 4.3.3, `@tailwindcss/postcss` 4.3.3, `@types/node` 24.19.1, `@types/react` 19.3.0, `@types/react-dom` 19.3.0, `@types/three` 0.186.0
- `sharp` comes in transitively through Next (lockfile has `node_modules/sharp` and `@img/sharp-win32-x64`), used by `scripts/fetch-photos.mjs`. If it fails to load, the script keeps Pixieset URLs and the build continues.
- `.npmrc` has `ignore-scripts=true`. Keep it.

### 4c. Commands (PowerShell, from `C:\Users\basse\Desktop\Repos\otl`)
```powershell
git clone https://github.com/Basseybd/otl.git C:\Users\basse\Desktop\Repos\otl
cd C:\Users\basse\Desktop\Repos\otl
node -v            # must be v24.x
npm ci             # install exact lockfile versions
npm run dev        # http://localhost:3000 (no photo download step; Pixieset photos load remotely)
npm run lint       # tsc --noEmit (type check; there is no ESLint)
npm run build      # node scripts/fetch-photos.mjs && next build  (see KNOWN BUG in section 9 for Windows)
npm run start      # serve the production build
```
- **Tests:** none (no test runner). Verification so far was Playwright screenshots at 1440x900 and 390x844 plus the audit council.
- **Deploy:** push to GitHub. Vercel is connected to the repo: any branch push makes a preview deploy, merging to `main` makes a production deploy. No CLI deploy is needed.
- PR workflow used: branch off `main`, push, open PR, wait for the Vercel status check, merge (merge commit). Cowork used `gh api repos/Basseybd/otl/pulls` (POST) and `gh api -X PUT repos/Basseybd/otl/pulls/{n}/merge -f merge_method=merge`; `gh pr create` / `gh pr merge` work the same. Poll deploy status with `gh api repos/Basseybd/otl/commits/{sha}/status`.

### 4d. Hosting / deployment
- **Vercel** team slug `basseybds-projects` (team id `team_Jy0x83JjsCJCTuj6mMem2AEI`), project `otl` (id `prj_smHSQpxNjvAOCzKAw1EPu4C2Cw5I`).
- Production URL (Vercel default): `https://otl-basseybds-projects.vercel.app/` (**UNVERIFIED** that this is the exact alias; it is the URL that was tried). Preview URLs follow `https://otl-git-<branch>-basseybds-projects.vercel.app` (seen: `otl-git-site-galleries-basseybds-projects.vercel.app`).
- **Vercel Authentication (Deployment Protection) is on** by default, so previews (and possibly production) require a Vercel login. Claude could never view the live site. To open it: Vercel project, Settings, Deployment Protection, turn off Vercel Authentication, or create a Shareable Link / Protection Bypass link.
- Plan: **UNKNOWN** whether Hobby or Pro. Recommendation stands: Pro (commercial).
- Custom domain: **none yet.**
- Production status: last checked status for `main` after PR #8 merge was reported as a successful build in the chat. Today (Oct 8) the Vercel MCP connector returned 403 for team `basseybds-projects`, so current deploy state is **UNVERIFIED** from here.

### 4e. Environment variables
- **None are set or required.** The site has no secrets, no API keys, no backend.
- `VERCEL_PROJECT_PRODUCTION_URL`: Vercel system variable (auto-provided, nothing to configure). Read in `app/layout.tsx` for `metadataBase`; falls back to `http://localhost:3000`.
- Rule: if a secret is ever added, it goes in Vercel as a Sensitive/Secret env var, never prefixed `NEXT_PUBLIC_`.

### 4f. Security posture (from `next.config.ts`)
- CSP: `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (plus `'unsafe-eval'` in dev only); `style-src 'self' 'unsafe-inline'`; `img-src 'self' data: blob:`; `media-src 'self'`; `font-src 'self'`; `connect-src 'self'` (plus `ws:` in dev); `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests`. The Instagram `frame-src` was added in PR #3 and **removed** in PR #8.
- HSTS (2 years, preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geolocation, payment, usb, interest-cohort off), `X-Frame-Options: DENY`, `X-Robots-Tag: noindex, nofollow`. `poweredByHeader: false`, no production source maps.
- `images.remotePatterns`: only `https://images.pixieset.com/{folder}/**` for folders `305125321`, `769986911`, `789986911`, `049986911`, `445721411`. Never wildcard the host.
- Outbound links use `target="_blank" rel="noopener"` (no `noreferrer`, by choice).
- No trackers, no third-party scripts.

### 4g. External services and accounts
- **GitHub** `Basseybd/otl`.
- **Vercel** team `basseybds-projects`.
- **Posh** RSVP: https://posh.vip/f/e2933?t=web
- **Pixieset** galleries (photo source): https://offthel.pixieset.com/
- **Instagram** @otl_nyc (https://instagram.com/otl_nyc), reel post https://www.instagram.com/p/DcXCl5lJLpB/
- **TikTok** @otl_nyc (https://www.tiktok.com/@otl_nyc)
- **Linktree** https://linktr.ee/otl_nyc (also the mailing list destination)
- Apple Maps directions link (built from the venue address in `app/page.tsx`).

---

## 5. SCHEDULED TASKS / AUTOMATIONS
**None.** No scheduled tasks, cron jobs or recurring automations were created for this project. The only automation is Vercel's Git integration (auto preview/production deploys on push), plus the `fetch-photos` build step.

---

## 6. TOOLS, PLUGINS, SKILLS & CONNECTORS
| Tool | Used for |
|---|---|
| Skill `bassey-web-design` | Standing direction, build loop, security rules, pre-ship checklist |
| Skill `bassey-site-audit` | Light council on v1: security, design/taste, mobile/a11y/perf, copy reviewers plus an independent verifier |
| Skill `web-graphics-kit` | Effect guidance for the portal and halftone |
| Skill `built-in-browser` | Rules for the Claude desktop app browser pane |
| `taste-skill` (github.com/Leonxlnx/taste-skill) | Not installed; cloned from GitHub and its rules followed |
| `impeccable` (github.com/pbakaus/impeccable) | Not installed; cloned, followed craft-floor and persuade-mode rules |
| `awesome-design-md` (github.com/VoltAgent/awesome-design-md) | Cloned; not used (newsletter already set the brand) |
| Playwright (global install in sandbox) | All screenshots and checks (Chromium with `--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`) |
| 21st.dev Glyph Portal | Source of the landing dive (adapted, MIT) |
| Three.js | Halftone shader ("image 23.js" interpreted as Three.js, unconfirmed) |
| GitHub (`gh` CLI / REST API) | Clone, branches, PRs, merges, deploy status |
| Vercel MCP connector | Found the project id; today it returns 403 for team `basseybds-projects` (needs re-auth) |
| Claude desktop built-in browser (`mcp__remote-devices__Claude_Browser__*`) | Reading Linktree and Pixieset (blocked from the sandbox), contact sheets of gallery photos, probing image file extensions with `fetch()` |
| Remote device bridge on Bassey's PC (`bassey-pc`, Windows) | Tried curl from his machine (also blocked), requested Downloads folder access |
| WebFetch | Linktree, Pixieset, basseyduke.io |
| Artifact | Published the OTL Domain Board |
| Bassey's portfolio repo `Basseybd/portfolio` | Pulled 4 of his photos once (later removed in favor of his Pixieset picks) |
| Python/PIL, ffmpeg | Extracted newsletter images/GIFs, made `feed.mp4`/`feed.webm`, posters, OG image, stripped EXIF |

---

## 7. DECISIONS LOG
1. **Next.js 16 App Router static site on Vercel** (his default stack). One page, no backend.
2. **Newsletter brand over his personal palette.** Client/friend brands win on color and type per his skill. Tokens eyedropped from the Dispatch template.
3. **Logo portal instead of Glyph Portal's live type.** The traced OTL masthead mark is the window; camera dives into the foot of the L (largest opaque square measured on a raster of the mark). Alternative (live text) rejected as less on-brand.
4. **Three.js halftone of the party clip**, silver dots like the Full Circle poster. Fallback chain: WebGL to graded video to poster frame. Reduced motion holds one bright frame.
5. **Smoother dive (his request):** camera eases toward scroll position (exponential, 90ms time constant), sine in-out curve, board reveal starts earlier (`smooth(0.72, 0.94)`).
6. **All content in `lib/content.ts`.** Line map and countdown derive from dates; nothing hard-coded.
7. **Seeded `main` with a starter commit** because the repo was empty, then built on `site-v1` (PR #1).
8. **`noindex` until launch** (robots metadata plus `X-Robots-Tag` header).
9. **Past stops as an arrivals board** (tablist) instead of a photo dump, per "dont over the the photos!".
10. **Photo count:** 1 per party, then 3, then 5 (Kick Off and Brit), then 3 max (his rule), then **5 per party** (his final call). Layout: lead photo spanning 2 rows plus 2x2 grid (`.arrivals-photos[data-count="5"] { grid-template-columns: 1.6fr 1fr 1fr; }`).
11. **Photo source:** first hotlinked Pixieset through Next's image optimizer (exact folders only), briefly self-hosted 4 portfolio shots, then switched to **his own Pixieset shared selections**. Because photos intermittently failed, added **`scripts/fetch-photos.mjs`** to copy them onto the site's own domain at build time. Alternative (commit images to repo) not possible from the sandbox since Pixieset was blocked; still an option.
12. **File extension casing:** Pixieset mixes `.JPG`, `.jpg`, `.JPEG`. Three photos broke from this. Fixed the paths and made the build script try all four spellings.
13. **Instagram reel:** offered (a) self-hosting the real video file (recommended; needed the file, Instagram blocked in sandbox) or (b) tap-to-load embed. He chose embed; built a tap-to-load iframe (PR #3). He disliked it; **final is a custom Instagram-style card** linking to the post (PR #8). No Instagram scripts, CSP `frame-src` removed.
14. **Mailing list = Linktree** (no form, no data collection, no email provider).
15. **Sessions YouTube/SoundCloud links left out** (they were placeholders in the newsletter); copy says the mix "drops soon".
16. **Removed the guessed "First party 2025" stop**; line map starts at Another Brit Party (5/2).
17. **Kept `'unsafe-inline'` in CSP** for Next's bootstrap scripts (static site, no input); `noopener` without `noreferrer` so Posh sees the referrer. Both accepted as low risk.

---

## 8. WORK COMPLETED (Oct 7, 2026, all times ET)
1. **2:23 to ~3:55 PM, PR #1 `site-v1`** "OTL site: logo portal landing and the Dispatch look". Repo was empty; starter commit `120d93a` on `main`. Built the full site, Playwright checks, light council (4 reviewers plus verifier), fixes (dark reduced-motion frame, mushy mid-dive, seam under board, phone mark size, duplicate heading, line map sign, footer eyebrow, see-through site bar, no-WebGL fallback, 44px targets, post-party RSVP state, noindex headers). Merged.
2. **~4:00 PM:** parsed the registrar search into the **OTL Domain Board** artifact. Explained how to make Vercel previews public. (PR #1 was merged outside the chat, presumably by Bassey, between turns.)
3. **4:11 to 4:50 PM, PR #2 `site-galleries`** "Past stops, the list, Linktree, and a smoother dive": arrivals board from 5 Pixieset galleries, real-date line map, Get on the list (Linktree), Linktree in footer, smoother dive. Then cut to 1 photo, then 3 curated photos with a shared grade. Merged outside the chat (presumably by Bassey) before the next two commits landed, which is why PR #3 exists.
4. **4:59 to 5:06 PM, PR #3 `site-reel-photos`** "Instagram reel embed and stronger party photos": tap-to-load Instagram iframe, Follow @otl_nyc button, portfolio leads (later removed). Merged.
5. **5:17 PM, PR #4 `site-photo-picks`**: Bassey's shared selections; 3 each, 5 for Kick Off and Brit. Merged.
6. **5:20 PM, PR #5 `site-three-max`**: 3 max per party. Merged.
7. **5:22 PM, PR #6 `site-photos-local`**: build-time photo copy script, 5 photos per party. Merged.
8. **5:38 PM, PR #7 `site-photo-fixes`**: fixed 2 Brit Party extensions, new Jean & Tav extras, new Sessions set plus attached portrait. Merged.
9. **5:43 PM, PR #8 `site-reel-card`**: Instagram-style reel card (square 1:1 clip crop, `object-position: 12% 50%`), Pink Frequency extension fix, script tries all extension spellings. Merged. Production build reported success.
10. **Oct 8:** this handoff.

---

## 9. OPEN WORK & NEXT STEPS

### Known bugs / risks
1. **KNOWN BUG on Windows (fix first): `npm run build` will likely fail locally.** `scripts/fetch-photos.mjs` line `const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");` turns `file:///C:/Users/...` into `\C:\Users\...` (tested with `path.win32`), so `fs.readFile` of `lib/content.ts` fails and the `&&` stops the build. It works on Vercel (Linux). Fix:
   ```js
   import { fileURLToPath } from "node:url";
   const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
   ```
2. **Running `npm run build` locally rewrites `lib/photo-manifest.json`** (tracked, committed as `{}`) and fills gitignored `public/media/stops/`. Don't commit the regenerated manifest unless intended. Consider making the script write the manifest only in CI or gitignoring it with a committed default.
3. **UNVERIFIED that the build-time photo copy works on Vercel.** Pixieset may block server fetches. If it does, photos silently fall back to hotlinked Pixieset URLs (the original cause of "some photos aren't loading"). Check the Vercel build log for the line `[photos] N/25 photos stored locally`.
4. **UNVERIFIED:** Claude never saw the live site (Vercel login). Bassey has not confirmed since PR #8 that all photos load, the reel card looks right, or the Brit Party / Pink Frequency fixes worked.
5. Alt text for some photos was written from thumbnails and may be generic or slightly wrong.
6. The feed clip is the newsletter's ~3 second 480x384 preview, low-res.
7. Three r186 needs WebGL2; older browsers get the video fallback.

### Time-sensitive
- **Full Circle is Sun Oct 11, 2026, 6 PM, at The Red Pavilion.** After `2026-10-12T02:00:00-04:00` the site flips: RSVP buttons become "Catch the next stop", line map marks it done. Then: set the next party in `nextStop` (`lib/content.ts`), replace the poster in `public/media/`, and add Full Circle to `pastStops` with its gallery once photos exist (add its Pixieset folder id to `galleries` in `next.config.ts`).

### Unconfirmed content (Bassey never confirmed)
- Tagline "A Brooklyn party, one stop off the L." and "Brooklyn, NY" line (invented by Claude).
- 2 AM end time for Full Circle (drives the after-party state).
- Party dates in `pastStops` (5/2, 6/7, 7/25, 8/15, 9/27/2026) came from Pixieset galleries; not confirmed by him.
- "image 23.js" = Three.js (he was asked, no answer).

### Prioritized next steps
1. Clone and set up locally (section 11). Fix the Windows path bug in `scripts/fetch-photos.mjs` (one PR).
2. Get Bassey to open the production site on his phone (or turn off Vercel Authentication / share a bypass link) and confirm: 25 photos load, reel card, dive smoothness, no blank frames. Check the Vercel build log `[photos]` line.
3. If photos still fail: commit the 25 images (1200px WebP, metadata stripped) into `public/media/stops/` and drop the hotlink fallback, or have Bassey download his selections into the repo.
4. Ask Bassey to confirm the unconfirmed copy above.
5. Domain: decide (see section 10), buy, add to Vercel, then remove `robots` noindex in `app/layout.tsx` and the `X-Robots-Tag` header in `next.config.ts`. Also confirm the Vercel plan is Pro.
6. Before/after Oct 11: update `nextStop`, move Full Circle into Past stops.
7. Add OTL Sessions YouTube/SoundCloud links when live.
8. Optional: replace the low-res feed clip with the real reel video file (Bassey would need to provide it; Instagram downloads were blocked).
9. Not yet run: gitleaks scan of history, `/security-review`, Vercel preview check on a real phone.
10. Optional: Claude offered to propose this round's lessons as an update to the `bassey-web-design` skill; Bassey never answered. Candidate lessons: probe Pixieset extension casing instead of assuming; copy third-party gallery images at build time rather than hotlinking; ask for the photo cap before curating; build Instagram links as a native card, not an iframe; check whether a PR was already merged before pushing more commits to its branch.
11. Housekeeping: delete the 8 merged remote branches.

### Started but not finished
- Lessons proposal (offered, not answered).
- The ".nyc / .party / .live / .events / .fm / .club" domain search (registrar results only covered big TLDs and A to E).

---

## 10. KEY CONTEXT

### The next party (in `lib/content.ts`)
- **Full Circle**, OTL's one-year anniversary party. Sun 10/11/2026, 6 PM to 2 AM (end time assumed). **The Red Pavilion, 1241 Flushing Ave, Brooklyn.** Sounds: J. Surena, Killa*, Taylor Nuri, Cici Simone. Genres: Afrobeats, Hip hop, Dancehall, Global sounds. "Free, just RSVP." RSVP: https://posh.vip/f/e2933?t=web. Blurb: "One year of Off The L. Our anniversary party, and the reason we keep doing this."

### Past stops (current photos, 5 each, in order; lead first)
Pixieset image URL pattern: `https://images.pixieset.com/{folder}/{hash}-{size}.{ext}`, sizes `cover|small|medium|large|xlarge|xxlarge` (xxlarge = 1600px long side), **extension casing varies per image**.
- **OTL Sessions vol. 1** (9/27/2026), folder `305125321`, gallery https://offthel.pixieset.com/otlsessions/. Note: "Recorded DJ sets, live in the room. The first mix drops soon." Photos: `77e167eded61eb36f2d56433801a1618-xxlarge.JPG`, `0f736a4b6a3fdc621896fa37de633fc3-xxlarge.JPG`, `/media/sessions-portrait.webp` (his attached photo), `3ecfefe1e4a4e34e5ba14194f6fb1454-xxlarge.JPG`, `2ecb6e0c1b59b00aaabd27bc8dacb02e-xxlarge.JPG`.
- **Pink Frequency** (8/15/2026, The Ivory on Park), folder `769986911`, https://offthel.pixieset.com/pinkfrequency/. Photos: `142281730cba82d49ec84ce2867a464b-xxlarge.JPG`, `8378065f854344cdbf0ca3ec8504e394-xxlarge.JPG`, `08aa2af4f8be0041ee22fde97b9da70b-xxlarge.jpg` (lowercase!), `2ada60388f7c059cef0acd13814abf57-xxlarge.JPG`, `8009994c79e9879b23353b7a4806663a-xxlarge.JPG`.
- **Jean & Tav's Birthday** (7/25/2026), folder `789986911`, https://offthel.pixieset.com/jeanandtavsbirthday/. Photos: `b282ce502ce13e5e52ab2cf6878fe264-xxlarge.JPG`, `c9ec9d1afa21578d5e8d01fc4fde725d-xxlarge.JPG`, `9436d3454e38e07484c8097e8a42eee3-xxlarge.JPG`, `8639b7045ce6d9901f658f72e1be6615-xxlarge.JPG`, `fe17fe28238eb74a6653c80c32f59b62-xxlarge.JPEG`.
- **The Kick Off** (6/7/2026), folder `049986911`, https://offthel.pixieset.com/thekickoff/. Photos: `1299af3104ca3b816c7af7e1aea3f527-xxlarge.JPG`, `b07b7240dc8a2ec6baad90fd15bfbd61-xxlarge.JPG`, `a208e7833d83382ae9f95e23c5b9ef61-xxlarge.JPG`, `9436bdceb63877bd8045441521f4fdc6-xxlarge.JPG`, `94a4237491098eb8d963d6c46a30e757-xxlarge.JPG`.
- **Another Brit Party** (5/2/2026), folder `445721411`, https://offthel.pixieset.com/anotherbritparty/. Photos: `bab47add8345ec1ad5295fc65485771c-xxlarge.JPG`, `c8d46d4c89a5cb59bae969ffa07f0d66-xxlarge.jpg`, `81e75738754c6f489ec3b297b39290b7-xxlarge.JPG`, `e7c03a3825589434b808f55d53018d4f-xxlarge.jpg`, `91bfe055616af0be4182222cdf9a4ba9-xxlarge.jpg`.
- All galleries index: https://offthel.pixieset.com/

### Bassey's Pixieset shared selections (his picks)
- Sessions: https://offthel.pixieset.com/share/6ac6b547468c3 (first), https://offthel.pixieset.com/share/6ac6bba48445c (replacement set, current)
- Jean & Tav: https://offthel.pixieset.com/share/6ac6b58dc5c36 (first 3), https://offthel.pixieset.com/share/6ac6bb3f55ec8 (the 2 extras)
- Pink Frequency: https://offthel.pixieset.com/share/6ac6b5e1d1e0c
- Kick Off: https://offthel.pixieset.com/share/6ac6b65167e74
- Brit Party: https://offthel.pixieset.com/share/6ac6b6cee10d1
- Everything in Past stops comes from his shares, except Pink Frequency's two extras (headband on the pink phone `2ada6038...`, pink shirt with sunglasses `8009994c...`), which were Claude's picks that he accepted when he said 5 is good.

### Site copy (all in `lib/content.ts`)
- Name "Off The L", short "OTL". Description: "Off The L is a Brooklyn party collective. Afrobeats, hip hop, dancehall and global sounds, one stop at a time."
- Feed section title "Last time on the L"; line "Straight off the dance floor. Tap the clip for the full reel, then come find us on the feed."
- Past stops title "Past stops"; CTA "See all the photos".
- List: title "Get on the list"; "First crack at tickets, free entry drops, and the photos before anyone else. No spam."; CTA "Join the list" to https://linktr.ee/otl_nyc (line taken from Linktree).
- Footer "Come with us"; fine print "Off The L · Brooklyn, NY"; after-party label "Catch the next stop".

### Domain research (Oct 7, 2026 registrar search; prices USD, first year / renewal per year)
Full sortable list: https://claude.ai/artifact/ELdsqAYx41TLPSLJVdyzzv
- **Taken:** otl.com, .dev, .app, .io, .ai, .xyz, .org, .me, .net, .tech, .studio, .academy, .bet, .bio, .capital, .casino, .computer, .digital, .email.
- **Picks for a party brand:** otl.dance $44.99 / $28.75; otl.band $31.97 / $28.93; otl.city (Premium) $49.99 / $36.30; otl.community $53.11 / $52.93; otl.black $99.99 / $69.49; otl.cool $74.99 / $47.06.
- Others of note: otl.sh $33.00 / $61.38; otl.company $24.99 / $15.10; otl.contact $24.99 / $20.23; otl.blue $28.97 / $26.25; otl.space (Premium) $82.41 / $329.63; otl.cloud (Premium) $2,200 / $2,200.
- The search only covered major TLDs plus A to E. **Not yet checked:** .nyc, .party, .live, .events, .fm, .club. An early draft used `offthel.nyc` as a placeholder URL; it was removed and is **not owned**.
- No domain decision has been made.

### Gotchas learned
- Pixieset, Linktree and Instagram were blocked from the Cowork sandbox and from curl on Bassey's PC; the Claude desktop browser pane could read them, and `fetch()` inside a Pixieset tab could load images.
- Pixieset file extension casing is inconsistent; always probe `.JPG`, `.jpg`, `.JPEG`, `.jpeg`.
- PR #2 was merged while more commits were being pushed to its branch; always check merge state before pushing to an open PR's branch.
- Vercel previews are behind Vercel Authentication by default.
- The traced OTL mark: viewBox `0 0 251.17 161`, transform `matrix(1 0 -0.26 1 29.89 17)`.

### Credits
- Landing dive adapted from **Glyph Portal by Christian Katzmann (MIT)**, origin https://ktzm.dk. Keep the notice in `components/logo-portal.tsx`.
- All media are OTL's own (newsletter, Pixieset galleries, Bassey's photo).

---

## 11. SETUP CHECKLIST FOR CLAUDE CODE
1. [ ] Read this whole file. Load the `bassey-web-design` skill if available (and `bassey-site-audit` before any review). Follow the no em dash rule in everything.
2. [ ] Check tools: `node -v` (must be v24.x; install Node 24 LTS if not), `git --version`, `gh auth status` (log in with `gh auth login` if needed).
3. [ ] Clone: `git clone https://github.com/Basseybd/otl.git C:\Users\basse\Desktop\Repos\otl` then `cd C:\Users\basse\Desktop\Repos\otl`. If the folder already exists, `git fetch && git status` and make sure `main` is at or after `65bb10f`.
4. [ ] Copy this `HANDOFF.md` into the repo root. Ask Bassey whether to commit it (default: commit on a small docs branch, or add to `.gitignore` if he'd rather keep it local).
5. [ ] `npm ci`
6. [ ] `npm run lint` (should pass).
7. [ ] `npm run dev`, open http://localhost:3000, check the dive, board, reel card, Past stops (tap each party), line map, footer at desktop and a 390px mobile viewport.
8. [ ] Fix the Windows path bug in `scripts/fetch-photos.mjs` (section 9, item 1) on a branch, then run `npm run build` and confirm the `[photos] N/25 photos stored locally` line and a clean Next build. Revert `lib/photo-manifest.json` before committing (`git checkout lib/photo-manifest.json`). Open a PR, wait for the Vercel check, merge with Bassey's OK.
9. [ ] Ask Bassey for: (a) confirmation the live site's photos and reel card look right on his phone, or a Vercel bypass link; (b) the domain decision; (c) confirmation of the tagline, Brooklyn NY line, 2 AM end time; (d) the next party details after Full Circle (Oct 11); (e) Sessions mix links when live.
10. [ ] If the Vercel MCP or CLI is used: team `basseybds-projects` (`team_Jy0x83JjsCJCTuj6mMem2AEI`), project `otl` (`prj_smHSQpxNjvAOCzKAw1EPu4C2Cw5I`). The claude.ai Vercel connector currently returns 403 for this team and needs re-auth.
11. [ ] Continue with the prioritized next steps in section 9. Keep the workflow: branch, PR with a short summary, Vercel preview check, merge commit.
