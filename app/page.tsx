import Hero, { WaveIcon } from "@/components/hero";
import Countdown from "@/components/countdown";
import LineMap from "@/components/line-map";
import Mark from "@/components/mark";
import ReelEmbed from "@/components/reel-embed";
import RsvpLink from "@/components/rsvp-link";
import { feed, line, lineTitle, list, nextStop, pastStops, pastTitle, site } from "@/lib/content";
import PastStops from "@/components/past-stops";

const eta = (() => {
  const d = new Date(nextStop.start);
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", timeZone: "America/New_York" }).replace(",", "");
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }).replace(":00", "").replace(" ", "");
  return `${day} | ${time}`.toUpperCase();
})();

const firstStop = (() => {
  const [y, m, d] = pastStops[pastStops.length - 1].date.split("-");
  return `${Number(m)}/${Number(d)}/${y.slice(2)}`;
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
            <ReelEmbed href={feed.href} handle={site.instagram.handle} sources={feed.sources} poster={feed.poster} label={feed.alt} />
            <div className="feed-copy">
              <p className="lede">{feed.line}</p>
              <a className="cta" href={site.instagram.href} target="_blank" rel="noopener">
                <InstagramIcon />
                Follow {site.instagram.handle}
              </a>
            </div>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="past-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="past-title" className="sign-name">{pastTitle}</h2>
            <p className="sign-eta">{pastStops.length} stops<small>Since {firstStop}</small></p>
          </div>
          <PastStops stops={pastStops} cta="See all the photos" />
        </section>

        <section className="wrap block" aria-labelledby="line-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="line-title" className="sign-name">{lineTitle}</h2>
          </div>
          <LineMap stops={line} start={nextStop.start} end={nextStop.end} />
        </section>

        <section className="wrap block list-block" aria-labelledby="list-title">
          <div className="sign">
            <span className="bullet" aria-hidden="true">L</span>
            <h2 id="list-title" className="sign-name">{list.title}</h2>
          </div>
          <div className="sessions">
            <p className="lede">{list.line}</p>
            <a className="cta" href={list.href} target="_blank" rel="noopener">
              <WaveIcon />
              {list.cta}
            </a>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <Mark className="footer-mark" />
        <h2 className="footer-line">{site.footerLine}</h2>
        <div className="social">
          <a href={site.instagram.href} target="_blank" rel="noopener" aria-label={`Instagram ${site.instagram.handle}`}><InstagramIcon /></a>
          <a href={site.tiktok.href} target="_blank" rel="noopener" aria-label={`TikTok ${site.tiktok.handle}`}><TikTokIcon /></a>
          <a href={site.linktree.href} target="_blank" rel="noopener" aria-label="All OTL links on Linktree"><LinkIcon /></a>
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
function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
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
