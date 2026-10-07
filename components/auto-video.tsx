"use client";

import { useEffect, useRef } from "react";

/** Muted loop that plays only on screen, and never for reduced motion. */
export default function AutoVideo({ sources, poster, label }: { sources: { src: string; type: string }[]; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !motion.matches) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.25 });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);
  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="metadata" aria-label={label}>
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
