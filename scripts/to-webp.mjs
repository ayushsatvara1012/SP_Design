// Converts source JPEG/PNG artwork under a directory to WebP alongside the original.
// Photographic renders have no business shipping as PNG - q90 is visually lossless
// here and roughly 90% smaller.
//
//   node scripts/to-webp.mjs [dir] [--quality=90] [--replace]
//
// dir defaults to public/images. Originals are KEPT unless --replace is passed;
// either way you must update the /images/... references in src yourself, and keep
// og:image as JPEG (some social scrapers still choke on WebP).

import fs from "fs";
import path from "path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const dir = args.find((a) => !a.startsWith("--")) ?? "public/images";
const quality = Number(
  args.find((a) => a.startsWith("--quality="))?.split("=")[1] ?? 90
);
const replaceOriginal = flags.has("--replace");

const CONVERTIBLE = /\.(jpe?g|png)$/i;

async function walk(current) {
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const full = path.join(current, entry.name);

    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!CONVERTIBLE.test(entry.name)) continue;

    const out = full.replace(CONVERTIBLE, ".webp");
    if (fs.existsSync(out)) {
      console.log(`skip   ${full} (${path.basename(out)} exists)`);
      continue;
    }

    const before = fs.statSync(full).size;
    const { size: after } = await sharp(full).webp({ quality }).toFile(out);
    if (replaceOriginal) fs.unlinkSync(full);

    const saved = (100 - (after / before) * 100).toFixed(1);
    console.log(
      `webp   ${full} -> ${(before / 1024).toFixed(0)}KB to ${(after / 1024).toFixed(0)}KB (${saved}% smaller)`
    );
  }
}

if (!fs.existsSync(dir)) {
  console.error(`No such directory: ${dir}`);
  process.exit(1);
}

await walk(dir);
console.log("Done.");
