# OTL design

The site is the OTL Dispatch newsletter turned into a place: a night platform on the L. Black ground, station signs, an amber LED board, and the subway call button.

## Tokens (app/globals.css, @theme)
| Token | Value | Use |
|---|---|---|
| ground | #000000 | page |
| raised / sign | #0a0c10 / #050505 | station signs, departure board |
| hair / bezel | #22252c / #3c3d43 | hairlines, sign borders |
| ink / body / muted | #f1f2f5 / #c4cad4 / #8b8f9a | text |
| rail | #a7a9ac | L bullet, sign top rule, line map |
| led | #ffb000 | the one accent: ticker, ETAs, the lit stop, focus rings, selection |
| cta / cta-ink | #f1ede3 / #0a0a0a | call button |

## Type
- Archivo 800 and 900 for display (board destination, hero line). Arimo for sign names and body. Share Tech Mono only for LED data (times, countdown, ticker, addresses on the board).
- Signs and labels are uppercase like the newsletter; body is sentence case.

## Components
- Station sign: L bullet, uppercase name, optional LED ETA. It is the section heading. No eyebrows above it.
- Call button: cream face, grey bezel, drop shadow, presses down 2 px.
- Departure board: the landing view after the dive.
- Line map: done stops filled, the next party lit amber, the future dashed. Vertical on phones.
- Mark: the traced OTL masthead SVG in `lib/paths.ts`, reused for the portal, footer, site bar, favicon and preview image.

## Motion
One authored moment: the logo portal. The mark is a window onto the party clip, redrawn as a silver halftone like the Full Circle poster (Three.js shader). Scrolling flies the camera into the foot of the L; the dots open up as you dive, then the field dims and becomes the texture behind the board. Everything else is still except the LED ticker.
Reduced motion: no pin, a still halftone frame, no ticker motion.
