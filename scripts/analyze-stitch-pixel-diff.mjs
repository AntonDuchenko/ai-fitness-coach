#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = process.argv[2] || ".cursor/stitch-browser-qa/artifacts";
const refName =
  process.argv[3] || "stitch-reference-b62f1e67edd74697acb14bca09169ae8.png";
const liveName =
  process.argv[4] || "live-chat-b62f1e67edd74697acb14bca09169ae8.png";

const refPath = path.join(root, refName);
const livePath = path.join(root, liveName);

const img1 = PNG.sync.read(fs.readFileSync(refPath));
const img2 = PNG.sync.read(fs.readFileSync(livePath));
const { width: w, height: h } = img1;
if (img2.width !== w || img2.height !== h) {
  console.error("Size mismatch", w, h, img2.width, img2.height);
  process.exit(1);
}

/** Mask: только «реальные» отличия (без фона blended из pixelmatch). */
const diff = new PNG({ width: w, height: h });
const numDiff = pixelmatch(img1.data, img2.data, diff.data, w, h, {
  threshold: 0.1,
  diffMask: true,
});
const d = diff.data;

function isDiffPixel(idx) {
  const a = d[idx + 3];
  return a > 0;
}

const rowDiff = new Array(h).fill(0);
const colDiff = new Array(w).fill(0);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (w * y + x) << 2;
    if (isDiffPixel(i)) {
      rowDiff[y]++;
      colDiff[x]++;
    }
  }
}

function bandStatsY(name, y0, y1) {
  let c = 0;
  const t = (y1 - y0) * w;
  for (let y = y0; y < y1; y++) c += rowDiff[y];
  return { name, y0, y1, pct: t ? (100 * c) / t : 0, pixels: c };
}

function bandStatsX(name, x0, x1) {
  let c = 0;
  const t = (x1 - x0) * h;
  for (let x = x0; x < x1; x++) c += colDiff[x];
  return { name, x0, x1, pct: t ? (100 * c) / t : 0, pixels: c };
}

const bandsY = [
  bandStatsY("y_top_branding", 0, Math.floor(h * 0.12)),
  bandStatsY("y_header_chat_title", Math.floor(h * 0.12), Math.floor(h * 0.22)),
  bandStatsY("y_message_thread", Math.floor(h * 0.22), Math.floor(h * 0.78)),
  bandStatsY("y_composer", Math.floor(h * 0.78), Math.floor(h * 0.92)),
  bandStatsY("y_footer_disclaimer", Math.floor(h * 0.92), h),
];

const sidebarW = Math.floor(w * 0.24);
const bandsX = [
  bandStatsX("x_sidebar", 0, sidebarW),
  bandStatsX("x_main_chat", sidebarW, w),
];

const cols = 10;
const rows = 6;
const cw = Math.floor(w / cols);
const ch = Math.floor(h / rows);
const cells = [];
for (let gy = 0; gy < rows; gy++) {
  for (let gx = 0; gx < cols; gx++) {
    const x0 = gx * cw;
    const x1 = gx === cols - 1 ? w : (gx + 1) * cw;
    const y0 = gy * ch;
    const y1 = gy === rows - 1 ? h : (gy + 1) * ch;
    let c = 0;
    let t = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (w * y + x) << 2;
        t++;
        if (isDiffPixel(i)) c++;
      }
    }
    cells.push({
      gx,
      gy,
      x0,
      y0,
      x1,
      y1,
      pct: (100 * c) / t,
      pixels: c,
    });
  }
}

let minX = w;
let minY = h;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (w * y + x) << 2;
    if (isDiffPixel(i)) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

cells.sort((a, b) => b.pct - a.pct);

const out = {
  ref: refPath,
  live: livePath,
  dimensions: { w, h },
  totalDiffPixels: numDiff,
  diffPercent: (100 * numDiff) / (w * h),
  boundingBoxAllDiff: { minX, minY, maxX, maxY },
  horizontalBands: bandsY.sort((a, b) => b.pct - a.pct),
  verticalBands: bandsX.sort((a, b) => b.pct - a.pct),
  topCellsByDiffPct: cells.slice(0, 15),
};

console.log(JSON.stringify(out, null, 2));
