import Hero, { WaveIcon } from "@/components/hero";
import Countdown from "@/components/countdown";
import LineMap from "@/components/line-map";
import Mark from "@/components/mark";
import AutoVideo from "@/components/auto-video";
import RsvpLink from "@/components/rsvp-link";
import { feed, line, lineTitle, nextStop, recap, sessions, site } from "@/lib/content";

const eta = (() => {
  const d = new Date(nextStop.start);
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", timeZone: "America/New_York" }).replace(",", "");
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }).replace(":00", "").replace(" ", "");
  return `${day} | ${time}`.toUpperCase();
})();

const mapsHref = `https://maps.apple.com/?q=${encodeURIComponent(`${nextStop.venue}, ${nextStop.address}`)}`;

export default function Page() {
  return (
    <>
      <a className="skip" href="#board">Skip to the next party</a>
      <SiteBar />
      <main id="top">
        <Hero>
          <section id="board" className="wrap board-wrap" aria-labelledby="board-title" tabIndex={-1}>
            <div className="board">
              <div className="board-row">
                <span className="bullet" aria-hidden="true">L</span>
                <h2 id="board-title" className="board-dest">OTL Presents: {nextStop.name}</h2>
                <p className="board-eta">
                  {eta}
                  <small><Countdown start={nextStop.start} end={nextStop.end} /></small>
                </p>
              </div>
              <p className="board-sub">{nextStop.venue} · {nextStop.address}</p>
            </div>

            <div className="stop-grid">
              <figure className="poster">
                <img
                  src={nextStop.poster.src}
                  srcSet={nextStop.poster.srcSet}
                  sizes="(min-width: 900px) 560px, 100vw"
                  width={nextStop.poster.width}
                  height={nextStop.poster.height}
                  alt={nextStop.poster.alt}
                  decoding="async"
                />
              </figure>
              <div className="stop-copy">
                <p className="lede">{nextStop.blurb}</p>
                <dl className="facts">
                  <div><dt>Sounds by</dt><dd>{nextStop.sounds.join(", ")}</dd></div>
                  <div><dt>Where</dt><dd>{nextStop.venue}<br />{nextStop.address}</dd></div>
                  <div><dt>Doors</dt><dd>{eta.replace(" | ", ", ")}</dd></div>
                  <div><dt>On the decks</dt><dd>{nextStop.genres.join(", ")}</dd></div>
                </dl>
                <div className="actions">
                  <RsvpLink className="cta" after={site.afterParty}>
                    <WaveIcon />
                    Tap in to RSVP
                  </RsvpLink>
                  <a className="cta cta-ghost" href={mapsHref} target="_blank" rel="noopener">
                    Get directions
                  </a>
                </div>
                <p className="note">{nextStop.note}</p>
              </div>
            </div>
          </section>
        </Hero>

        <section className="wrap block feed" aria-labelledby="feed-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="feed-title" className="sign-name">{feed.title}</h2>
          </div>
          <div className="feed-body">
            <figure className="screen">
              <AutoVideo sources={feed.sources} poster={feed.poster} label={feed.alt} />
            </figure>
            <div className="feed-copy">
              <p className="lede">{feed.line}</p>
              <a className="cta cta-ghost" href={feed.href} target="_blank" rel="noopener">
                <InstagramIcon />
                Watch on Instagram
              </a>
            </div>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="recap-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="recap-title" className="sign-name">{recap.name} recap</h2>
            <p className="sign-eta">{recap.status}<small>{recap.where}</small></p>
          </div>
          <p className="lede recap-line">{recap.line}</p>
          <ul className="prints" role="list">
            {recap.photos.map((p) => (
              <li key={p.src}>
                <a href={recap.href} target="_blank" rel="noopener" aria-label={`${p.alt} Opens the full gallery.`}>
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
                </a>
              </li>
            ))}
          </ul>
          <a className="cta" href={recap.href} target="_blank" rel="noopener">
            <CameraIcon />
            See all the photos
          </a>
        </section>

        <section className="wrap block" aria-labelledby="sessions-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="sessions-title" className="sign-name">{sessions.name}</h2>
            <p className="sign-eta">{sessions.status}<small>{sessions.statusNote}</small></p>
          </div>
          <div className="sessions">
            <p className="lede">{sessions.line}</p>
            <a className="cta cta-ghost" href={site.instagram.href} target="_blank" rel="noopener">
              <InstagramIcon />
              Follow {site.instagram.handle}
            </a>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="line-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="line-title" className="sign-name">{lineTitle}</h2>
          </div>
          <LineMap stops={line} start={nextStop.start} end={nextStop.end} />
        </section>
      </main>

      <footer className="wrap footer">
        <Mark className="footer-mark" />
        <h2 className="footer-line">{site.footerLine}</h2>
        <div className="social">
          <a href={site.instagram.href} target="_blank" rel="noopener" aria-label={`Instagram ${site.instagram.handle}`}><InstagramIcon /></a>
          <a href={site.tiktok.href} target="_blank" rel="noopener" aria-label={`TikTok ${site.tiktok.handle}`}><TikTokIcon /></a>
        </div>
        <p className="fine">{site.fine}</p>
      </footer>
    </>
  );
}

function SiteBar() {
  return (
    <header className="sitebar">
      <div className="wrap sitebar-inner">
        <a href="#top" className="sitebar-home" aria-label="Back to top">
          <Mark className="sitebar-mark" title="Off The L, back to top" />
        </a>
        <RsvpLink className="cta cta-mini" after="Follow">
          RSVP
        </RsvpLink>
      </div>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3h-2.7v12.4a2.6 2.6 0 1 1-2.1-2.55V10.0a5.5 5.5 0 1 0 4.8 5.45V9.3a6.3 6.3 0 0 0 3.7 1.18V7.7c-1.9 0-3.5-1.6-3.7-4.7z" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.8A1 1 0 0 1 9 4.7h6a1 1 0 0 1 .8.5L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="12.6" r="3.1" />
    </svg>
  );
}
