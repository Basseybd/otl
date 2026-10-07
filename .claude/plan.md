# OTL site v1

## The ask
A website for Off The L (OTL), Bassey's Brooklyn party collective, that looks and feels like the OTL Dispatch newsletter. The landing is a Glyph Portal style dive: scroll into the OTL mark and come out inside the OTL world.

## Size
Medium (a new single-page site, pure visuals, no forms, no data, no secrets). Built directly, plan shared with the result, light council.

## Pages and sections
One page, in this order:
1. Opening frame: LED ticker, "Off The L / Brooklyn, NY" bar, the traced OTL mark with the party clip running through the letters as a halftone (Three.js), the line "A Brooklyn party, one stop off the L.", RSVP button, "Scroll to board".
2. The dive: scroll pins the frame and the camera flies into the foot of the L until the halftone fills the screen.
3. Board (where you land): departure board for Full Circle with a live countdown, poster, facts, RSVP and directions.
4. Live from the feed: the clip from the newsletter and a link to the reel.
5. Pink Frequency recap: three frames and a link to the full gallery.
6. OTL Sessions 001: honest "soon" state, follow on Instagram (no live links yet).
7. The line so far: the newsletter's line map.
8. Footer: mark, "Come with us", Instagram and TikTok.

All copy and media come from the newsletter, held in `lib/content.ts`.

## Done means
1. At 390 x 844 and 1440 x 900 the first screen shows the OTL mark, the line, and a working RSVP button without scrolling. Check: screenshots.
2. Scrolling from the top dives into the L and lands on the Full Circle board in about two screens of scroll, with no jumps. Check: screenshots at 0, 25, 50, 80, 100 percent of the dive.
3. The halftone renders with WebGL and falls back to a graded video, then to the poster frame, when WebGL or the video fails. Check: GL and non-GL runs.
4. Reduced motion: no pin, no dive, no ticker motion, the halftone holds a still frame, and the page still looks designed. Check: screenshot with reduced motion.
5. Nothing animates offscreen or in a hidden tab (IntersectionObserver plus visibilitychange on the halftone and the feed clip). Check: code read.
6. No horizontal scroll at 390 px; touch targets at least 44 px; visible focus rings in amber. Check: scrollWidth equals clientWidth; code read.
7. The countdown is computed from the event date in New York time, never hard-coded, and the line map flips once the party ends. Check: unit check of `relativeLabel`.
8. No em dashes anywhere. Check: grep.
9. Security headers present (CSP, HSTS, nosniff, referrer, permissions, frame-ancestors). No secrets, no third-party scripts, no trackers; `robots` noindex until launch. Check: curl the headers, grep the bundle.
10. Standing items: pre-ship checklist passes, council verdict ship with no confirmed critical or high, screenshots sent.
