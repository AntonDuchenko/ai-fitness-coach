#!/usr/bin/env node
/**
 * Last-resort fallback when Browser MCP cannot load screenshot.downloadUrl (e.g. 403).
 * Primary path for QA agents: cursor-ide-browser — new tab → navigate URL → browser_take_screenshot.
 *
 * Usage: node scripts/download-stitch-reference.mjs <url> [outPath]
 */
import fs from "node:fs";
import path from "node:path";

const urlRaw = process.argv[2];
const outPath =
  process.argv[3] ||
  path.join(".cursor", "stitch-browser-qa", "artifacts", "reference.png");

if (!urlRaw || urlRaw.startsWith("-")) {
  console.error(
    "Usage: node scripts/download-stitch-reference.mjs <screenshot.downloadUrl> [outPath]",
  );
  process.exit(1);
}

const url = urlRaw.startsWith("//") ? `https:${urlRaw}` : urlRaw;

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const referrers = [
  "https://stitch.withgoogle.com/",
  "https://stitch.withgoogle.com",
  "https://labs.google/",
  "https://www.google.com/",
];

function mkdirFor(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

async function fetchOnce(targetUrl, referer) {
  const headers = {
    "User-Agent": userAgent,
    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: referer,
  };
  const res = await fetch(targetUrl, {
    method: "GET",
    headers,
    redirect: "follow",
  });
  const buf = Buffer.from(await res.arrayBuffer());
  return { res, buf };
}

function urlVariants(base) {
  const variants = [base];
  try {
    const u = new URL(base);
    if (!/googleusercontent|ggpht|gstatic/i.test(u.hostname)) {
      return variants;
    }
    const p = u.pathname;
    if (!/=[a-z0-9]+$/i.test(p)) {
      variants.push(`${u.origin}${p}=s0`);
      variants.push(`${u.origin}${p}=w2048`);
    }
  } catch {
    /* ignore */
  }
  return [...new Set(variants)];
}

async function main() {
  mkdirFor(outPath);

  const attempts = [];
  for (const variant of urlVariants(url)) {
    for (const referer of referrers) {
      try {
        const { res, buf } = await fetchOnce(variant, referer);
        attempts.push({
          variant,
          referer,
          status: res.status,
          bytes: buf.length,
        });
        if (res.ok && buf.length > 100) {
          const ct = (res.headers.get("content-type") || "").toLowerCase();
          const looksPng = buf[0] === 0x89 && buf[1] === 0x50;
          const looksJpeg = buf[0] === 0xff && buf[1] === 0xd8;
          const looksWebp = buf.slice(8, 12).toString() === "WEBP";
          if (ct.includes("image") || looksPng || looksJpeg || looksWebp) {
            fs.writeFileSync(outPath, buf);
            console.log(
              JSON.stringify({
                ok: true,
                outPath,
                bytes: buf.length,
                contentType: ct || "unknown",
                usedUrl: variant,
                referer,
              }),
            );
            return;
          }
        }
      } catch (e) {
        attempts.push({
          variant,
          referer,
          error: String(e?.message || e),
        });
      }
    }
  }

  console.error(
    JSON.stringify({
      ok: false,
      message:
        "Could not download Stitch reference image. Try Browser MCP on the URL or save PNG manually.",
      attempts,
    }),
  );
  process.exit(2);
}

main().catch((e) => {
  console.error(e);
  process.exit(3);
});
