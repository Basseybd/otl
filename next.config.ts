import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";

// Static marketing site: no user input, no secrets, no third-party scripts.
// Inline scripts are Next's own bootstrap, so 'unsafe-inline' is the tradeoff
// for keeping every page static instead of nonce-rendered.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${dev ? " ws:" : ""}`,
  // Instagram's player loads only after a visitor taps play on the reel.
  "frame-src https://www.instagram.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// OTL's own Pixieset galleries, one folder per party. Exact host and folders, never a wildcard host.
const galleries = ["305125321", "769986911", "789986911", "049986911", "445721411"];

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: galleries.map((folder) => ({
      protocol: "https" as const,
      hostname: "images.pixieset.com",
      pathname: `/${folder}/**`,
    })),
  },
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "X-Frame-Options", value: "DENY" },
          // Preview: keep media and the share image out of search too. Remove at launch.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default config;
