"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Party footage redrawn as a silver halftone, like the Full Circle poster.
 * Three.js renders one full-screen quad; the dots open up a little as the camera dives.
 * Tiers: WebGL halftone, then the graded clip, then the graded poster frame.
 * Reduced motion holds one bright frame. Everything pauses offscreen and in hidden tabs.
 */
export default function HalftoneField({
  sources,
  poster,
  progressRef,
}: {
  sources: { src: string; type: string }[];
  poster: string;
  progressRef: MutableRefObject<number>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const video = videoRef.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const STILL_AT = 1.9; // a bright frame: the pink shirt on the checkered floor
    let disposed = false;
    let visible = false;
    let gl: { start: () => void; stop: () => void; dispose: () => void; refresh: () => void } | null = null;

    // ---- Video playback, shared by every tier ----
    const holdStill = () => {
      video.pause();
      const seek = () => { if (Math.abs(video.currentTime - STILL_AT) > 0.05) video.currentTime = STILL_AT; };
      if (video.readyState >= 1) seek();
      else video.addEventListener("loadedmetadata", seek, { once: true });
    };
    const sync = () => {
      if (disposed) return;
      const run = visible && !document.hidden && !motion.matches;
      if (motion.matches) holdStill();
      else if (run) video.play().catch(() => {});
      else video.pause();
      if (gl) {
        if (run) gl.start();
        else gl.stop();
        if (motion.matches && visible) gl.refresh();
      }
    };

    const fallback = () => {
      if (disposed) return;
      host.dataset.mode = "video";
      gl?.dispose();
      gl = null;
      sync();
    };

    // Media can fail before React attaches handlers: check now, and listen on the last source.
    const lastSource = video.querySelector("source:last-of-type");
    const onSourceError = () => {
      host.dataset.mode = "poster";
      gl?.dispose();
      gl = null;
    };
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) onSourceError();
    lastSource?.addEventListener("error", onSourceError);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    // ---- WebGL tier ----
    (async () => {
      if (host.dataset.mode === "poster") return;
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return fallback();
      }
      if (disposed || host.dataset.mode === "poster") return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
      } catch {
        return fallback();
      }
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const uniforms = {
        uTex: { value: texture },
        uRes: { value: new THREE.Vector2(1, 1) },
        uVid: { value: new THREE.Vector2(480, 384) },
        uCell: { value: 7 },
        uTime: { value: 0 },
        uPaper: { value: new THREE.Color("#eceef1") },
        uInk: { value: new THREE.Color("#0a0b0d") },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uTex;
          uniform vec2 uRes, uVid;
          uniform float uCell, uTime;
          uniform vec3 uPaper, uInk;
          varying vec2 vUv;
          vec2 cover(vec2 uv) {
            float rs = uRes.x / uRes.y, rv = uVid.x / uVid.y;
            vec2 s = rs > rv ? vec2(1.0, rv / rs) : vec2(rs / rv, 1.0);
            return clamp((uv - 0.5) * s + 0.5, 0.0, 1.0);
          }
          float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
          // Average a small neighbourhood so big cells read shapes, not macroblocks.
          vec3 soft(vec2 uv) {
            vec2 px = 1.6 / uVid;
            vec3 c = vec3(0.0);
            for (int x = -1; x <= 1; x++)
              for (int y = -1; y <= 1; y++)
                c += texture2D(uTex, cover(uv) + vec2(float(x), float(y)) * px).rgb;
            return c / 9.0;
          }
          void main() {
            vec2 frag = vUv * uRes;
            float a = 0.2618; // 15 degree screen, like print
            mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
            vec2 g = rot * frag / uCell;
            vec2 cell = floor(g) + 0.5;
            vec2 centre = (transpose(rot) * (cell * uCell)) / uRes;
            vec3 src = soft(centre);
            float lum = dot(src, vec3(0.299, 0.587, 0.114));
            lum = smoothstep(0.03, 0.7, lum);
            float r = sqrt(1.0 - lum) * 0.6;
            float d = length(fract(g) - 0.5);
            float aa = 1.2 / uCell;
            float ink = 1.0 - smoothstep(r - aa, r + aa, d);
            vec3 col = mix(uPaper, uInk, ink);
            col += (hash(frag + uTime) - 0.5) * 0.03;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
        depthTest: false,
        depthWrite: false,
      });
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      let dpr = 1;
      const size = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = host.clientWidth || 1, h = host.clientHeight || 1;
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w * dpr, h * dpr);
      };
      size();

      let raf = 0;
      const draw = (time = 0) => {
        if (video.videoWidth) uniforms.uVid.value.set(video.videoWidth, video.videoHeight);
        const p = progressRef.current;
        // Dots open up as you dive, capped so people stay readable.
        uniforms.uCell.value = (6.5 + 7.5 * Math.pow(Math.min(1, p / 0.8), 1.6)) * dpr;
        uniforms.uTime.value = Math.floor(time / 90);
        renderer.render(scene, camera);
        if (host.dataset.mode !== "gl" && video.readyState >= 2) host.dataset.mode = "gl";
      };
      const loop = (time: number) => {
        raf = 0;
        if (disposed || !gl) return;
        draw(time);
        raf = requestAnimationFrame(loop);
      };
      // A paused video never re-uploads on its own; push the current frame.
      const refresh = () => {
        texture.needsUpdate = true;
        draw();
      };
      const onFrame = () => refresh();
      const onScroll = () => { if (!raf) draw(); };
      const onLost = (e: Event) => {
        e.preventDefault();
        fallback();
      };
      const ro = new ResizeObserver(() => { size(); draw(); });

      video.addEventListener("loadeddata", onFrame);
      video.addEventListener("seeked", onFrame);
      window.addEventListener("scroll", onScroll, { passive: true });
      canvas.addEventListener("webglcontextlost", onLost);
      ro.observe(host);

      gl = {
        start: () => { if (!raf) raf = requestAnimationFrame(loop); },
        stop: () => { cancelAnimationFrame(raf); raf = 0; },
        refresh,
        dispose: () => {
          cancelAnimationFrame(raf);
          raf = 0;
          ro.disconnect();
          video.removeEventListener("loadeddata", onFrame);
          video.removeEventListener("seeked", onFrame);
          window.removeEventListener("scroll", onScroll);
          canvas.removeEventListener("webglcontextlost", onLost);
          texture.dispose();
          material.dispose();
          quad.geometry.dispose();
          renderer.dispose();
          canvas.remove();
        },
      };
      if (disposed) return gl.dispose();
      sync();
    })();

    return () => {
      disposed = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      lastSource?.removeEventListener("error", onSourceError);
      video.pause();
      gl?.dispose();
      gl = null;
    };
  }, [progressRef]);

  return (
    <div ref={hostRef} className="halftone" data-mode="init">
      <video ref={videoRef} poster={poster} muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
