"use client";

import { useEffect, useState } from "react";

/** "4 days away", "Tomorrow", "Tonight", "Now boarding", "Arrived". Never hard-coded. */
export function relativeLabel(startISO: string, endISO: string, now = Date.now()) {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();
  if (now >= end) return "Arrived";
  if (now >= start) return "Now boarding";
  const day = (t: number) =>
    new Date(t).toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const toDate = (s: string) => new Date(`${s}T00:00:00Z`).getTime();
  const days = Math.round((toDate(day(start)) - toDate(day(now))) / 86_400_000);
  if (days <= 0) return "Tonight";
  if (days === 1) return "Tomorrow";
  return `${days} days away`;
}

export default function Countdown({ start, end }: { start: string; end: string }) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setLabel(relativeLabel(start, end));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [start, end]);
  return <span suppressHydrationWarning>{label ?? " "}</span>;
}
