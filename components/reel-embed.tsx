"use client";

import { useState } from "react";
import AutoVideo from "./auto-video";

/**
 * Our own clip loops until someone taps play. Only then does Instagram's player load,
 * so nobody gets Instagram's scripts or tracking just for scrolling past.
 */
export default function ReelEmbed({
  embed,
  sources,
  poster,
  label,
}: {
  embed: string;
  sources: { src: string; type: string }[];
  poster: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="reel-frame">
        <iframe
          src={embed}
          title="OTL on Instagram"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className="reel-teaser">
      <AutoVideo sources={sources} poster={poster} label={label} />
      <button type="button" className="reel-play" onClick={() => setOpen(true)}>
        <span className="reel-play-dot" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
        </span>
        Play the full reel
      </button>
    </div>
  );
}
