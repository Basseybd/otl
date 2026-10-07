// Copies every Pixieset photo named in lib/content.ts into public/media/stops at build time,
// so visitors load them from our own domain instead of Pixieset at request time.
// Resized to 1200px wide WebP; sharp drops EXIF and GPS by default.
// Never fails the build: anything that can't be fetched stays on its Pixieset URL.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const content = await fs.readFile(path.join(root, "lib/content.ts"), "utf8");
const paths = [...new Set([...content.matchAll(/px\("([^"]+)"\)/g)].map((m) => m[1]))];
const outDir = path.join(root, "public/media/stops");
const manifestFile = path.join(root, "lib/photo-manifest.json");
await fs.mkdir(outDir, { recursive: true });

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("[photos] sharp not available, keeping Pixieset URLs");
  await fs.writeFile(manifestFile, "{}\n");
  process.exit(0);
}

const manifest = {};
let ok = 0;
for (const p of paths) {
  const name = crypto.createHash("sha1").update(p).digest("hex").slice(0, 12) + ".webp";
  const file = path.join(outDir, name);
  let done = false;
  for (let attempt = 1; attempt <= 3 && !done; attempt++) {
    try {
      // Pixieset file extensions vary in case (.JPG, .jpg, .JPEG). Try the listed one, then the others.
      const base = p.replace(/\.(jpe?g)$/i, "");
      const tries = [p, ...[".JPG", ".jpg", ".JPEG", ".jpeg"].map((e) => base + e).filter((x) => x !== p)];
      let res;
      for (const candidate of tries) {
        res = await fetch(`https://images.pixieset.com/${candidate}`, {
        signal: AbortSignal.timeout(20000),
        // Ask the way a browser on the gallery page would, in case Pixieset checks.
          headers: { "User-Agent": "Mozilla/5.0 (compatible; OTL site build)", Referer: "https://offthel.pixieset.com/", Accept: "image/*" },
        });
        if (res.ok) break;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(file);
      manifest[p] = `/media/stops/${name}`;
      ok++;
      done = true;
    } catch (err) {
      if (attempt === 3) console.log(`[photos] kept remote: ${p} (${err.message})`);
      else await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}
await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
console.log(`[photos] ${ok}/${paths.length} photos stored locally`);
