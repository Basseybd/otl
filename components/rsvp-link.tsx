"use client";

import { useEffect, useState, type ReactNode } from "react";
import { relativeLabel } from "./countdown";
import { nextStop, site } from "@/lib/content";

/** RSVP until the party ends; after that it points people to the feed for the next stop. */
export default function RsvpLink({ className, children, after }: { className: string; children: ReactNode; after: ReactNode }) {
  const [over, setOver] = useState(false);
  useEffect(() => {
    const tick = () => setOver(relativeLabel(nextStop.start, nextStop.end) === "Arrived");
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <a className={className} href={over ? site.instagram.href : nextStop.rsvp} target="_blank" rel="noopener">
      {over ? after : children}
    </a>
  );
}
