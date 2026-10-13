"use client";

import { useEffect, useState, type ReactNode } from "react";
import { relativeLabel } from "./countdown";
import { nextStop, site } from "@/lib/content";

/** RSVP until the party ends; after that, or between parties, it points people to the feed for the next stop. */
export default function RsvpLink({ className, children, after }: { className: string; children: ReactNode; after: ReactNode }) {
  const [over, setOver] = useState(!nextStop);
  useEffect(() => {
    if (!nextStop) return;
    const { start, end } = nextStop;
    const tick = () => setOver(relativeLabel(start, end) === "Arrived");
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  const href = over || !nextStop ? site.instagram.href : nextStop.rsvp;
  return (
    <a className={className} href={href} target="_blank" rel="noopener">
      {over ? after : children}
    </a>
  );
}
