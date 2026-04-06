# QA Report — AI Coach Empty State Mobile

**Date:** 2026-04-06  
**Environment:** `http://localhost:3000/chat`, viewport **390×893** (window), live full-page capture **391×906**, Cursor Browser MCP  
**Stitch:** project `7923897073544346409`, screen `6373f333037a440b8c3fe80deed4c17c`, «AI Coach Empty State Mobile» (`deviceType`: MOBILE, design canvas `780×1786`)  
**Mode:** single | strict pixels

## 0. Mapping Stitch → application

- **`ui_kind`:** `full_page` (mobile chat route; empty state is in-flow content)
- **`primary_url`:** `http://localhost:3000/chat`
- **`open_steps`:** QA login if redirected → `browser_resize` **390×893** → open `/chat` → **Open menu** → **Start New Session** (empty state)
- **`codebase_hits`:**
  - `apps/web/src/app/chat/page.tsx`
  - `apps/web/src/features/chat/components/ChatScreen.tsx`
  - `apps/web/src/features/chat/components/ChatEmptyState.tsx`
  - `apps/web/src/features/chat/components/ChatMobileHeader.tsx`
  - `apps/web/src/features/chat/components/MobileDrawer.tsx`

## Short verdict

**PARTIAL** — Empty-state hero, welcome copy, and 2×2 starter cards match the Stitch intent on mobile; pixel diff is high partly because the **Stitch mock shows a global bottom tab bar** (Coach / Workouts / Progress / Profile) that **does not exist** on the live chat route, and because reference/live captures differ in width scaling (see §1).

## 1. Visual vs Stitch — pixelmatch (supporting)

| Metric | Value |
|--------|--------|
| Pixelmatch threshold | `0.1` |
| Differing pixels | `133,300` / `354,246` |
| Diff percent | **37.63%** |
| Preprocessing | Stitch reference PNG was **1159×906**; live PNG **391×906**. For a fair comparison, the reference was **width-resampled (nearest-neighbor) to 391×906** → `artifacts/stitch-reference-6373f333037a440b8c3fe80deed4c17c-resized.png` |
| Artifacts | `artifacts/stitch-reference-6373f333037a440b8c3fe80deed4c17c.png`, `artifacts/stitch-reference-6373f333037a440b8c3fe80deed4c17c-resized.png`, `artifacts/live-6373f333037a440b8c3fe80deed4c17c.png`, `artifacts/diff-6373f333037a440b8c3fe80deed4c17c.png` |
| Verdict vs strict threshold | **FAIL** (high %) |

## 1a. Where design diverges (required)

| Zone | Stitch expectation | Live fact | Rating |
|------|--------------------|-----------|--------|
| Global chrome / nav | Full-width **bottom tab bar** (Coach active, Workouts, Progress, Profile) | Live `/chat` uses **top** mobile header (hamburger, title, avatar) and **no** persistent bottom tabs matching the mock | **Major** |
| Header | Compact “AI Coach” + credits line + settings | Live: **AI Coach** + “Always Active • Ready to Evolve” + **Credits** chip + **SD** avatar; no settings gear | Major |
| Hero / welcome | Central lightning badge, “Welcome to **ForgeFit**” + subtitle | Live: soft glow + **Welcome to ForgeFit** + same subtitle intent | OK / Minor |
| Starter grid (2×2) | Four cards (workout / meals / metrics / recovery) with icon + title + line | Same four intents and layout; copy differs slightly (e.g. “Create a workout plan” vs shorter labels in mock) | Minor |
| Composer | Single pill input + send | Live: **attach** + placeholder + **send**; quick-reply chips appear **after** messages (hidden on empty state) | Minor |
| Footer / disclaimer | Short legal line | Live: uppercase disclaimer line present | OK |
| Typography & color | Dark surfaces, blue primary, rounded cards | Matches design-system direction; exact weights/spacing differ | Minor |
| Diff heat (from full-frame compare) | — | Large structural mismatch expected along **bottom** (tabs vs chat chrome) and **horizontal** scaling bands | — |

## 2. Theme and tokens

Stitch project: **dark** theme, **Space Grotesk** headlines / **Inter** body, primary **#2563EB**, rounded **ROUND_EIGHT**. Live chat follows the same broad token family (`designTheme` vs app).

## 3. Structure and content

- **Stitch HTML (summary):** Welcome hero, 2×2 feature cards, composer, bottom navigation.
- **Live:** Same block order for the **empty session**: hero → four actionable cards → composer row → disclaimer. **No** bottom tab strip on this route.

## 4. Exploratory (user simulation)

| # | Action | Expectation | Fact | Status |
|---|--------|-------------|------|--------|
| 1 | Open menu → Start New Session | Empty state visible | Welcome + 4 cards + composer | PASS |
| 2 | Tap **Create a workout plan** | Sends starter / loads AI reply | Composer briefly read-only; long workout plan reply appears | PASS |
| 3 | Type **Hello** in composer | Send enables when non-empty | Send enabled with text | PASS |

## 5. Issues found

| # | Severity | Description | Reproduction |
|---|----------|-------------|--------------|
| 1 | Major | Stitch “mobile app shell” (bottom tabs) is **not** implemented on `/chat` | Open mobile empty state vs Stitch `AI Coach Empty State Mobile` |
| 2 | Minor | Strict pixel % inflated by different **capture width** and mock vs live **header** content | Compare `*-resized.png` vs `live-*` + §1a |

## 6. Checklist

- [x] Pixelmatch (with documented resize)
- [x] Zone-by-zone design delta (§1a)
- [x] Theme / typography (high level)
- [x] Structure / copy for main blocks
- [x] Primary controls (menu, new session, starter card, composer)

## 7. Coverage progress (`coverage.json`)

| Stitch title | ui_kind | primary_url | status | last_verdict |
|--------------|---------|-------------|--------|--------------|
| AI Coach Empty State Mobile | full_page | `/chat` | done | PARTIAL |
| *(remaining rows — see `coverage.json`)* | | | | |

**Pending after this run:** 60 screens; next **`order` 4** — «AI Coach Widget». (Total Stitch rows: 64; **done:** 4.)
