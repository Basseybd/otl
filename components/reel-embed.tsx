"use client";

import AutoVideo from "./auto-video";
import { MARK_FILL, MARK_SKEW } from "@/lib/paths";

/**
 * An Instagram-style post card in OTL's own material: the clip loops quietly,
 * and the whole card opens the post on Instagram. No Instagram scripts or
 * trackers load on our page.
 */
export default function ReelEmbed({
  href,
  handle,
  sources,
  poster,
  label,
}: {
  href: string;
  handle: string;
  sources: { src: string; type: string }[];
  poster: string;
  label: string;
}) {
  return (
    <a className="ig-card" href={href} target="_blank" rel="noopener" aria-label={`Watch the full reel from ${handle} on Instagram`}>
      <span className="ig-head">
        <span className="ig-avatar" aria-hidden="true">
          <svg viewBox="20 12 230 110">
            <path d={MARK_FILL} transform={`matrix(${MARK_SKEW.a} ${MARK_SKEW.b} ${MARK_SKEW.c} ${MARK_SKEW.d} ${MARK_SKEW.e} ${MARK_SKEW.f})`} fill="#fff" fillRule="evenodd" />
          </svg>
        </span>
        <span className="ig-who">
          <span className="ig-name">Off The L</span>
          <span className="ig-handle">{handle}</span>
        </span>
        <svg className="ig-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="ig-media">
        <AutoVideo sources={sources} poster={poster} label={label} />
        <span className="ig-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 5.8v12.4L18.6 12z" /></svg>
        </span>
      </span>
      <span className="ig-foot">
        <span>Watch the full reel</span>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 11 11 5M6 5h5v5" />
        </svg>
      </span>
    </a>
  );
}
