"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { relativeLabel } from "./countdown";
import LogoPortal from "./logo-portal";
import RsvpLink from "./rsvp-link";
import HalftoneField from "./halftone-field";
import { feed, nextStop, site } from "@/lib/content";

function Ticker() {
  const [status, setStatus] = useState("Now boarding");
  useEffect(() => {
    const tick = () => {
      const label = relativeLabel(nextStop.start, nextStop.end);
      setStatus(label === "Arrived" ? "Arrived" : "Now boarding");
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  const d = new Date(nextStop.start);
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", timeZone: "America/New_York" }).replace(",", "");
  const text = `${status}: ${nextStop.name}  ·  ${day}  ·  ${nextStop.venue}      |      Sounds by ${nextStop.sounds.join(", ")}      |      ${nextStop.genres.join("  ·  ")}      |      `;
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default function Hero({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  const onProgress = useCallback((p: number) => {
    progress.current = p;
    document.documentElement.dataset.entered = p > 0.9 ? "true" : "false";
  }, []);

  // Reduced motion has no dive, so show the bar once the opening frame scrolls away.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      if (motion.matches) document.documentElement.dataset.entered = window.scrollY > window.innerHeight * 0.7 ? "true" : "false";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LogoPortal
      label={`${site.name}. Scroll to board.`}
      onProgress={onProgress}
      field={<HalftoneField sources={feed.sources} poster={feed.poster} progressRef={progress} />}
      front={
        <>
          <div className="hero-top">
            <Ticker />
            <div className="wrap hero-bar">
              <span className="hero-brand">
                <span className="bullet bullet-sm" aria-hidden="true">L</span>
                <span>{site.name}</span>
              </span>
              <span className="hero-where">{site.where}</span>
            </div>
          </div>
          <h1 className="hero-line">{site.tagline}</h1>
          <div className="hero-actions">
            <RsvpLink className="cta" after={site.afterParty}>
              <WaveIcon />
              RSVP to {nextStop.name}
            </RsvpLink>
          </div>
          <a className="hero-hint" href="#board">
            Scroll to board
            <ArrowDown />
          </a>
        </>
      }
    >
      {children}
    </LogoPortal>
  );
}

export function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M7 8.5a6 6 0 0 1 0 7" />
      <path d="M10.5 6a10 10 0 0 1 0 12" />
      <path d="M14 3.5a14 14 0 0 1 0 17" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14">
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}
