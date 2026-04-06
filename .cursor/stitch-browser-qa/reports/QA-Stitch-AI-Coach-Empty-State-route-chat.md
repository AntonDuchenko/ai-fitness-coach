# QA Report - AI Coach Empty State

**Date:** 2026-04-06T06:58:54.271Z  
**Environment:** `http://localhost:3000/chat`, viewport approx `1280x1024` window (`1256x906` captured), Cursor Browser MCP  
**Stitch:** project `7923897073544346409`, screen `4654aa4bc95f4591952d1659642730e6`, "AI Coach Empty State"  
**Mode:** single | strict pixels

## 0. Mapping Stitch -> app

- **`ui_kind`:** `full_page`
- **`primary_url`:** `http://localhost:3000/chat`
- **`open_steps`:** Login (if redirected) -> open `/chat` -> click **Start New Session** to reveal empty state
- **`codebase_hits`:**
  - `apps/web/src/app/chat/page.tsx`
  - `apps/web/src/features/chat/components/ChatScreen.tsx`
  - `apps/web/src/features/chat/components/ChatEmptyState.tsx`

## Short verdict

**PARTIAL** - Empty-state layout and core IA match Stitch well, but pixel diff remains significant due to dynamic chat/session content and header/composer styling/state differences.

## 1. Visual vs Stitch - pixelmatch (supporting metric)

| Metric | Value |
|--------|-------|
| Pixelmatch threshold | `0.1` |
| Differing pixels | `164,059` |
| Diff percent | `14.42%` |
| Artifacts | `artifacts/stitch-reference-4654aa4bc95f4591952d1659642730e6.png`, `artifacts/live-4654aa4bc95f4591952d1659642730e6.png`, `artifacts/diff-4654aa4bc95f4591952d1659642730e6.png` |
| Verdict vs strict threshold | **FAIL** |

## 1a. Where design diverges (required)

| Zone | Stitch expectation | Live fact | Rating |
|------|--------------------|-----------|--------|
| Sidebar branding + nav | Branded left rail, CTA, nav links | Structure and placement match; text rendering slightly heavier | Minor |
| Header area | "AI Coach" title + status line + right icon | Same structure; spacing and weight differ slightly | Minor |
| Hero (AI badge + welcome copy) | Centered AI circle, title, subtitle | Same hierarchy and center alignment | OK |
| Starter cards grid (2x2) | Four prompt cards, icon + title + subtitle | Same 2x2 grid and content order; card radius/padding not pixel-identical | Minor |
| Composer row / bottom area | Message input + send affordance + disclaimer | Same components, but proportion and contrast differ; main diff hotspot in lower band | Major |
| Main canvas right side | Balanced content distribution from Stitch canvas | In live, right half has more empty dark area at sampled state | Major |
| Typography | Bold heading + compact supporting text | Hierarchy matches; exact weights and antialiasing differ | Minor |
| Color tokens | Dark surfaces + blue primary accents + muted text | Token family aligned (`m3-*`), small luminance/contrast differences | Minor |

Diff concentration (from analyzer): strongest in **lower composer/footer** zone and **right side main chat area**; top branding has lowest mismatch.

## 2. Theme and tokens

Stitch project theme is dark, blue-primary (`#2563EB`), `Space Grotesk` headlines + `Inter` body, rounded components. Live chat empty state follows same theme family and typography intent; observed differences are mostly fine-grain tone, spacing, and text rendering.

## 3. Structure and content

Expected block order from Stitch is preserved in live:
1) sidebar + nav, 2) AI coach header, 3) empty-state hero/title/subtitle, 4) 2x2 starter prompts, 5) composer/disclaimer footer.

## 4. Exploratory (user simulation)

| # | Action | Expected | Actual | Status |
|---|--------|----------|--------|--------|
| 1 | Click `Start New Session` | Empty state appears | Empty hero + 4 starter cards rendered | PASS |
| 2 | Click starter `Create a workout plan` | Prompt is sent into chat | New conversation request created and assistant response starts | PASS |
| 3 | Check send button with empty input | Send remains disabled | Disabled as expected | PASS |
| 4 | Click `Start New Session` again | Return to empty state | Empty state restored in desktop run | PASS |

## 5. Found issues

| # | Severity | Description | Reproduction |
|---|----------|-------------|--------------|
| 1 | Major | Strict visual mismatch around composer/footer and right content area (`14.42%`) | Open `/chat` -> `Start New Session` -> compare artifacts |
| 2 | Minor | Header/typography/card spacing differs from Stitch | Same steps; inspect top/header and card paddings |

## 6. Checklist

- [x] Pixelmatch executed
- [x] Zone-by-zone visual delta documented
- [x] Theme / typography checked
- [x] Structure / copy checked
- [x] Main interactive controls clicked
- [x] Basic input/send edge state checked

## 7. Coverage progress (`coverage.json`)

Snapshot after this run: **3 done / 64 total, 61 pending**.

| # | Stitch title | screenId | Status | Last run | Verdict |
|---|--------------|----------|--------|----------|---------|
| 0 | AI Coach Chat | `b62f1e67…` | done | — | — |
| 1 | AI Coach Chat Mobile | `c0b7613b…` | done | — | — |
| 2 | AI Coach Empty State | `4654aa4b…` | done | — | — |
| 3 | AI Coach Empty State Mobile | `6373f333…` | pending | — | — |
| 4 | AI Coach Widget | `93bdd1db…` | pending | — | — |
| 5 | AI Coach Widget Mobile | `808189c5…` | pending | — | — |
| ... | ... | ... | ... | ... | ... |
| 63 | Workout Plan View | `a88f1785…` | pending | — | — |

Full current coverage table: `.cursor/stitch-browser-qa/coverage-status.md`.
