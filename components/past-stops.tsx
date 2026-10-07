"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import type { PastStop } from "@/lib/content";

const day = (iso: string) =>
  new Date(`${iso}T12:00:00-04:00`)
    .toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", timeZone: "America/New_York" })
    .replace(",", "")
    .toUpperCase();

/** An arrivals board of past parties. Pick a row, the platform shows its photos. */
export default function PastStops({ stops, cta }: { stops: PastStop[]; cta: string }) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const stop = stops[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = i;
    if (e.key in keys) next = (i + keys[e.key] + stops.length) % stops.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stops.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div className="arrivals">
      <div className="arrivals-list" role="tablist" aria-label="Past parties" aria-orientation="vertical">
        {stops.map((s, i) => (
          <button
            key={s.slug}
            id={`${uid}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="arrivals-row"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="arrivals-dot" aria-hidden="true" />
            <span className="arrivals-name">{s.name}</span>
            <span className="arrivals-date">{day(s.date)}</span>
          </button>
        ))}
      </div>

      <div className="arrivals-panel" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`}>
        <div className="arrivals-photos" data-count={Math.min(stop.photos.length, 5)} key={stop.slug}>
          {stop.photos.slice(0, 5).map((p, i) => (
            <a
              key={p.src}
              className={i === 0 ? "arrivals-photo is-lead" : "arrivals-photo"}
              href={stop.gallery}
              target="_blank"
              rel="noopener"
              aria-label={`${p.alt} Opens the full gallery.`}
            >
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={i === 0 ? "(min-width: 900px) 440px, 64vw" : "(min-width: 900px) 220px, 34vw"}
              />
            </a>
          ))}
        </div>
        <div className="arrivals-foot">
          {stop.note && <p className="lede">{stop.note}</p>}
          <a className="cta" href={stop.gallery} target="_blank" rel="noopener">
            <CameraIcon />
            {cta}
          </a>
        </div>
      </div>
    </div>
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
