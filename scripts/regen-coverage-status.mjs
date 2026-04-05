#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.join(".cursor", "stitch-browser-qa");
const j = JSON.parse(fs.readFileSync(path.join(root, "coverage.json"), "utf8"));

let md = "# QA coverage — статус экранов Stitch\n\n";
md +=
  "Источник: [`coverage.json`](./coverage.json). **Сброс 2026-04-05:** все строки в `pending`.\n\n";
md +=
  "| # | Stitch title | screenId | Status | Last run | Verdict |\n|---|--------------|----------|--------|----------|---------|\n";

for (const it of j.items) {
  const id = `${(it.stitch_screen_id || "").slice(0, 8)}…`;
  const title = (it.stitch_title || "").replace(/\|/g, "/");
  md += `| ${it.order} | ${title} | \`${id}\` | ${it.status} | — | — |\n`;
}

md += `\nСледующий прогон команды stitch-qa: **order 0** — «${j.items[0]?.stitch_title ?? "?"}».\n`;
md +=
  "\n**Агенту:** референс Stitch — **Browser MCP**: новая вкладка → navigate `screenshot.downloadUrl` → `browser_take_screenshot` в `artifacts/`. Потом live + `browser_resize` (числа) + wait + reload.\n";

fs.writeFileSync(path.join(root, "coverage-status.md"), md);
console.log("Wrote coverage-status.md", j.items.length, "rows");
