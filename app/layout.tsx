import type { Metadata, Viewport } from "next";
import "@fontsource/archivo/latin-800.css";
import "@fontsource/archivo/latin-900.css";
import "@fontsource/arimo/latin-400.css";
import "@fontsource/arimo/latin-700.css";
import "@fontsource/share-tech-mono/latin-400.css";
import "./globals.css";
import { site } from "@/lib/content";

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: "Off The L",
  description: site.description,
  openGraph: {
    title: "Off The L",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.shareAlt }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Preview until the domain and launch are set.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
