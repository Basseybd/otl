# Threat model: OTL site
- Static marketing page. No forms, no accounts, no database, no API routes, no server actions.
- No secrets or environment variables are used. If one is ever added it goes in Vercel as a Secret, never behind NEXT_PUBLIC_.
- Media is first-party in public/media (taken from the OTL newsletter). Nothing private belongs in public/.
- Outbound links only: Posh (RSVP), Instagram, TikTok, Pixieset gallery, Apple Maps. All open with rel="noopener".
- Must never ship: trackers or ad pixels, third-party embeds that track, unlicensed media, guest photos with EXIF or location data.
