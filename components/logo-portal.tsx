"use client";

/**
 * Logo Portal, adapted from Glyph Portal © 2026 Christian Katzmann. MIT.
 * Origin: UsefulPortal.astro on https://ktzm.dk → UsefulPortal.tsx → ClarityPortal.tsx → GlyphPortal.tsx.
 * A scroll-driven camera through live type. Keep this notice with copies.
 *
 * OTL changes: the window is the traced OTL mark from the newsletter instead of
 * live text, the camera dives into the foot of the L, and the track under the
 * letters rides along as an outline layer.
 */
import { useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { MARK_FILL, MARK_RAILS, MARK_SKEW, MARK_STROKES, MARK_TIES, MARK_VIEWBOX } from "@/lib/paths";

type Props = {
  label: string;
  /** Fills the window. Decorative, mounted once. */
  field: ReactNode;
  /** Opening-frame composition above the scene. */
  front?: ReactNode;
  /** What you land in on the other side. */
  children: ReactNode;
  /** Scroll travel in screen heights. */
  scrollLength?: number;
  onProgress?: (progress: number) => void;
};

const VB_W = 251.17;
const VB_H = 161;
/** Peak camera bank in degrees, from Glyph Portal. Negative tilts counterclockwise. */
const ROLL = -4;
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type Target = { x: number; y: number; radius: number };

/** Largest opaque square inside the foot of the L, measured on a raster of the mark. */
function measureTarget(): Target | null {
  const k = 6;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(VB_W * k);
  canvas.height = Math.ceil(VB_H * k);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const m = MARK_SKEW;
  ctx.setTransform(k * m.a, k * m.b, k * m.c, k * m.d, k * m.e, k * m.f);
  ctx.fill(new Path2D(MARK_FILL), "evenodd");
  const { width, height } = canvas;
  const px = ctx.getImageData(0, 0, width, height).data;
  const rows = new Uint16Array(width + 1);
  let size = 0, bx = 0, by = 0;
  for (let y = 0; y < height; y++) {
    let diagonal = 0;
    for (let x = 0; x < width; x++) {
      const above = rows[x + 1];
      rows[x + 1] = px[(y * width + x) * 4 + 3] > 245 ? Math.min(above, rows[x], diagonal) + 1 : 0;
      diagonal = above;
      const s = rows[x + 1];
      if (s > size) {
        // Keep the camera on the L: undo the skew and check the letter's x range.
        const cx = (x + 1 - s / 2) / k, cy = (y + 1 - s / 2) / k;
        const preX = cx - m.c * (cy - m.f) - m.e;
        if (preX > 150) { size = s; bx = x; by = y; }
      }
    }
  }
  if (size < 3) return null;
  return { x: (bx + 1 - size / 2) / k, y: (by + 1 - size / 2) / k, radius: (size / 2 - 1) / k };
}

export default function LogoPortal({ label, field, front, children, scrollLength = 2.2, onProgress }: Props) {
  const uid = `lp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const clipId = `${uid}-clip`;
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(onProgress);
  useLayoutEffect(() => { progressRef.current = onProgress; }, [onProgress]);
  const length = clamp(scrollLength, 1, 6);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const pin = section.querySelector<HTMLElement>("[data-lp-pin]")!;
    const fieldEl = section.querySelector<HTMLElement>("[data-lp-field]")!;
    const clipPath = section.querySelector<SVGPathElement>(`#${clipId} path`)!;
    const overlay = section.querySelector<SVGGElement>("[data-lp-overlay]")!;
    const probe = section.querySelector<HTMLElement>("[data-lp-viewport]")!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = measureTarget();
    const center = { x: VB_W / 2, y: VB_H / 2 };
    let W = 1, H = 1, travel = 1, startScale = 1, endScale = 1, raf = 0, active = true, disposed = false, last = -1;
    let anchorY = 0.44;

    const isStatic = () => motion.matches || !target;

    const layout = () => {
      W = pin.clientWidth || window.innerWidth;
      const vh = Math.max(1, probe.offsetHeight || window.innerHeight);
      H = isStatic() ? Math.max(520, Math.min(vh * 0.86, 760)) : vh;
      section.style.setProperty("--lp-height", `${H}px`);
      travel = H * length;
      const narrow = W < 640;
      anchorY = narrow ? 0.4 : 0.45;
      const markH = H * (narrow ? 0.34 : 0.46);
      startScale = Math.min((W * (narrow ? 0.94 : 0.72)) / VB_W, markH / VB_H);
      endScale = target ? Math.max(startScale, Math.hypot(W, H) / (target.radius * 1.2)) : startScale;
      section.style.setProperty("--lp-mark-top", `${H * anchorY - (VB_H * startScale) / 2}px`);
      section.style.setProperty("--lp-mark-bottom", `${H * anchorY + (VB_H * startScale) / 2}px`);
      section.dataset.lpMotion = isStatic() ? "off" : "on";
      section.dataset.lpReady = "true";
    };

    const position = () => clamp(-section.getBoundingClientRect().top / travel);

    const paint = (progress: number) => {
      const p = isStatic() ? 0 : progress;
      const t = clamp(p / 0.78);
      // Sine in-out: a soft start and a soft landing, no sudden rush in the middle.
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
      const scale = Math.exp(Math.log(startScale) + Math.log(endScale / startScale) * eased);
      const blend = endScale === startScale ? 0 : (1 / scale - 1 / startScale) / (1 / endScale - 1 / startScale);
      const cx = center.x + ((target?.x ?? center.x) - center.x) * blend;
      const cy = center.y + ((target?.y ?? center.y) - center.y) * blend;
      const ty = H * anchorY + H * 0.04 * eased;
      // The camera banks into the dive and levels out before it lands, so the board arrives straight.
      const roll = ROLL * smooth(0.06, 0.5, t) * (1 - smooth(0.62, 0.92, t));
      const m = MARK_SKEW;
      const base = `translate(${W / 2} ${ty}) scale(${scale}) rotate(${roll}) translate(${-cx} ${-cy})`;
      clipPath.setAttribute("transform", `${base} matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`);
      overlay.setAttribute("transform", base);
      overlay.style.opacity = String(1 - smooth(0.01, 0.12, p));
      fieldEl.style.clipPath = t >= 1 ? "none" : `url(#${clipId})`;
      section.style.setProperty("--lp-front", String(1 - smooth(0.005, 0.1, p)));
      section.style.setProperty("--lp-reveal", String(isStatic() ? 1 : smooth(0.72, 0.94, p)));
      section.style.setProperty("--lp-hit", p < 0.06 ? "auto" : "none");
      section.dataset.lpEntered = String(p >= 0.92);
      if (p !== last) { last = p; progressRef.current?.(p); }
    };

    // The camera eases toward the scroll position instead of snapping to it,
    // so wheel steps and flicks glide. Frame-rate independent.
    let current = position();
    let lastTime = 0;
    const frame = (time: number) => {
      raf = 0;
      if (disposed) return;
      const target = position();
      const dt = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      const k = 1 - Math.exp(-dt / 90);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) current = target;
      paint(current);
      if (current !== target) raf = requestAnimationFrame(frame);
      else lastTime = 0;
    };
    const schedule = () => { if (!raf && active) raf = requestAnimationFrame(frame); };
    const resize = () => { layout(); current = position(); paint(current); };
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) schedule();
    }, { rootMargin: "100% 0px" });
    const ro = new ResizeObserver(resize);

    layout();
    current = position();
    paint(current);
    io.observe(section);
    ro.observe(pin);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    motion.addEventListener("change", resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", resize);
    };
  }, [clipId, length]);

  return (
    <section ref={sectionRef} id={uid} aria-label={label} className="lp" style={{ "--lp-length": length } as CSSProperties}>
      <div data-lp-viewport aria-hidden="true" />
      <div data-lp-pin>
        <div data-lp-field aria-hidden="true">
          {field}
          <div data-lp-dim />
        </div>
        <svg data-lp-art aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={MARK_FILL} clipRule="evenodd" />
            </clipPath>
          </defs>
          <g data-lp-overlay fill="none" stroke="#9a9a9a" strokeLinecap="round" strokeLinejoin="round">
            <path d={MARK_RAILS} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={MARK_TIES} strokeWidth="1.6" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
            <g transform={`matrix(${MARK_SKEW.a} ${MARK_SKEW.b} ${MARK_SKEW.c} ${MARK_SKEW.d} ${MARK_SKEW.e} ${MARK_SKEW.f})`}>
              {MARK_STROKES.map((d) => (
                <path key={d.slice(0, 24)} d={d} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          </g>
        </svg>
        <svg data-lp-fallback viewBox={MARK_VIEWBOX} aria-hidden="true">
          <path d={MARK_RAILS} stroke="#9a9a9a" strokeWidth="3" fill="none" />
          <path d={MARK_TIES} stroke="#9a9a9a" strokeWidth="2.4" fill="none" />
          <path d={MARK_FILL} transform={`matrix(${MARK_SKEW.a} ${MARK_SKEW.b} ${MARK_SKEW.c} ${MARK_SKEW.d} ${MARK_SKEW.e} ${MARK_SKEW.f})`} fill="#fff" fillRule="evenodd" />
        </svg>
        {front && <div data-lp-front>{front}</div>}
      </div>
      <div data-lp-content id={`${uid}-content`}>{children}</div>
    </section>
  );
}
