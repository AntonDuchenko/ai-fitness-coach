# QA Report — AI Coach Widget Mobile (Stitch) — dashboard

**Date:** 2026-04-06  
**Environment:** `http://localhost:3000/dashboard`, viewport **390x844** (captured frame 475x906 in MCP screenshot), Browser MCP (Chromium)  
**Stitch:** project `7923897073544346409`, screen `808189c557d0495499de8dc474db3ad3`, title "AI Coach Widget Mobile"  
**Mode:** single | strict pixels + zone-by-zone analysis

## 0. Stitch -> app mapping

- **`ui_kind`:** `embedded`
- **`primary_url`:** `http://localhost:3000/dashboard`
- **`open_steps`:** Sign in with QA account on `/login` if needed -> open `/dashboard` in mobile viewport -> locate AI Coach card in the feed
- **`codebase_hits`:**
  - `apps/web/src/features/dashboard/components/AiCoachCard.tsx`
  - `apps/web/src/features/dashboard/components/DashboardContent.tsx`
  - `apps/web/src/app/dashboard/page.tsx`

## Verdict

**PARTIAL** — AI Coach card concept and interactions are present on mobile dashboard, but strict visual parity with Stitch is low due to different page composition, dynamic content, and navigation/footer differences.

## 1. Visual vs Stitch — pixelmatch (supporting metric)

| Metric | Value |
|---|---|
| Pixelmatch threshold | `0.1` |
| Different pixels | `115,917 / 430,350` |
| Diff share | **26.94%** |
| Artifacts | `.cursor/stitch-browser-qa/artifacts/stitch-reference-808189c557d0495499de8dc474db3ad3.png`, `.cursor/stitch-browser-qa/artifacts/live-dashboard-808189c557d0495499de8dc474db3ad3.png`, `.cursor/stitch-browser-qa/artifacts/diff-808189c557d0495499de8dc474db3ad3.png` |
| Threshold verdict | PARTIAL |

## 1a. Where exactly design diverges

| Zone | Stitch expectation | Live fact | Rating |
|---|---|---|---|
| Header/top bar | Compact mobile header with AI Coach-focused context | Mobile dashboard header is "Dashboard" with menu and app icon; AI Coach is lower in page flow | Major |
| Main content focus | Screen emphasizes AI Coach card as primary focal block | Live top area starts with workout block; AI Coach card appears further down and mixed with other dashboard cards | Major |
| AI Coach card body | Bot icon, "AI Coach", active badge, prompt chips, CTA button, usage bar | Same core pattern exists (`AiCoachCard`): icon/title/status, chips, CTA, usage counters for non-premium | Minor |
| CTA and quick prompts | "Open Coach Chat" and topic chips navigate to chat context | CTA/prompt links are present; activation to chat works via keyboard/activation flow in mobile run | Minor |
| Bottom navigation/footer | Stitch reference includes mobile bottom tab bar in composition | Live dashboard flow differs and does not match the same bottom-nav composition in captured viewport | Major |
| Spacing & typography | Tight mobile composition around AI Coach module | Live spacing follows dashboard feed rhythm (`gap-6`, card stacking), not the exact mock rhythm | Minor-Major |
| Color tokens | Dark palette with blue/green accents | Live dark palette and accent tokens are visually consistent with project theme | OK |

Diff concentration is strongest in top/mid structural areas (header and non-AI cards), then in bottom navigation/footer region. The AI Coach card itself is closer than the rest of the page but not pixel-identical because content is dynamic.

## 2. Theme and tokens

`get_project` returns dark mode with Space Grotesk/Inter and blue-green accent system. Live dashboard visually aligns with this theme family, though exact token-by-token parity is not guaranteed at pixel level.

## 3. Structure and content

- Stitch mobile screen frames AI Coach as a dominant mobile widget composition.
- Live page is the production dashboard feed where AI Coach is one of several sections.
- Component mapping is correct; structural parity is partial.

## 4. Exploratory (user simulation)

| # | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Open `/dashboard` on mobile viewport after auth | Dashboard renders mobile layout | Mobile layout loaded with menu/header and stacked cards | PASS |
| 2 | Activate **Open Coach Chat** from AI Coach area | Navigate to `/chat` | Navigation to `/chat` observed in run | PASS |
| 3 | Trigger a quick prompt link path | Route to chat assistant context | Needed focused/keyboard activation in this run; eventually navigated to `/chat` | PASS |

## 5. Found issues

| # | Severity | Description | Repro |
|---|---|---|---|
| 1 | Info | Strict pixel parity is limited because Stitch composition includes different mobile framing/footer than live dashboard viewport state | Compare reference vs live artifacts |
| 2 | Minor | Some mobile link activation in card area required focus/keyboard confirmation in MCP flow instead of immediate click redirect | Mobile `/dashboard` -> AI Coach quick prompt link |

## 6. Checklist

- [x] Pixelmatch (or documented skip)
- [x] Zone-by-zone design delta section
- [x] Theme/typography check
- [x] Structure/content check
- [x] Main interactions inside target UI

## 7. Coverage progress

Current coverage after this run: **6 done / 64 total, 58 pending**.  
Source of truth: `.cursor/stitch-browser-qa/coverage.json` and `.cursor/stitch-browser-qa/coverage-status.md`.
