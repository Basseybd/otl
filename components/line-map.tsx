"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Stop = { label: string; when: string; isNext?: boolean };
type State = "done" | "now" | "next";

function states(stops: Stop[], start: string, end: string, now: number): State[] {
  const i = stops.findIndex((s) => s.isNext);
  const passed = now >= new Date(end).getTime();
  return stops.map((_, j) => {
    if (j < i) return "done";
    if (j === i) return passed ? "done" : "now";
    return passed && j === i + 1 ? "now" : "next";
  });
}

/** The newsletter's line map: done stops filled, the next party lit, the future dashed. */
export default function LineMap({ stops, start, end }: { stops: Stop[]; start: string; end: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const s = states(stops, start, end, now ?? 0);
  return (
    <ol className="lm" style={{ "--stops": stops.length } as CSSProperties}>
      {stops.map((stop, i) => (
        <li key={stop.label} className="lm-stop" aria-current={s[i] === "now" ? "step" : undefined}>
          <span className="lm-dot" data-state={s[i]} aria-hidden="true" />
          <span className="lm-label" data-state={s[i]}>
            {stop.label}
            <span className="lm-when">{stop.when}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
