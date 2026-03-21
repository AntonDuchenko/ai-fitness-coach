# Tester Skill

Test the implementation against design specifications and functional requirements.

## Instructions

You are the **Tester** agent. You verify the implementation matches the design and works correctly.

### Input
- `.claude/pipeline/architect-plan.md` — planned implementation
- `.claude/pipeline/state.json` — current state
- The original task from `AI_FITNESS_COACH_TASKS.md`

### Process — UI Tasks

1. **Open Pencil design.** Use `mcp__pencil__open_document` to open `production_ai_landing.pen`.
2. **Get design reference.** Use `mcp__pencil__batch_get` to retrieve the relevant screens/frames for this task. Use `mcp__pencil__get_screenshot` for visual reference. Use `mcp__pencil__snapshot_layout` for precise layout data.
3. **Read implemented components.** Read all UI files created/modified by the developer.
4. **Compare design vs implementation.** Check:
   - **Colors:** Do implemented colors match design tokens? Are CSS variables used correctly?
   - **Layout:** Does spacing, alignment, and grid structure match the design?
   - **Typography:** Correct font family, size, weight, line-height?
   - **Components:** Are the right shadcn/ui components used? Do they match the design patterns?
   - **Responsive:** Does the layout handle different viewports as designed?
   - **Dark mode:** Are both themes correctly implemented?

5. **Run Playwright visual regression tests (MANDATORY for all frontend tasks):**
   - If visual tests don't exist for the new pages/components, CREATE them in `apps/web/e2e/`.
   - Each new page MUST have a visual test that:
     - Navigates to the page
     - Waits for `networkidle`
     - Asserts key elements are visible (headings, buttons, inputs)
     - Takes a `toHaveScreenshot()` with `maxDiffPixelRatio: 0.05`
   - Test BOTH `desktop` (1440x900) and `mobile` (Pixel 7) viewports.
   - Test key UI states: default, validation errors, loading, interactive states.
   - Run tests: `cd apps/web && npx playwright test --update-snapshots` (first run creates baselines).
   - **After screenshots are captured, READ the screenshot PNGs and visually compare them against the Pencil design screenshots** obtained in step 2. This is the critical validation step — look for:
     - Missing UI elements that are in the design
     - Wrong colors, spacing, or typography
     - Layout differences (element positioning, sizes)
     - Missing decorative elements (gradients, cards, icons)
   - If discrepancies are found, report them as critical issues.

### Process — API Tasks

1. **Check endpoints.** Verify all planned routes exist with correct HTTP methods and paths.
2. **Verify DTOs.** Check that request/response DTOs match the API design with proper validation decorators.
3. **Check guards/auth.** Verify authentication and authorization are applied correctly.
4. **Check Swagger.** Ensure all endpoints have proper Swagger decorators for documentation.
5. **Verify error handling.** Check that errors are handled gracefully with proper HTTP status codes.
6. **Check database operations.** Verify entities, repositories, and migrations are correct.

### Process — Code Quality (Both UI and API)

1. **Component size check.** Verify no component file exceeds ~150 lines.
2. **Logic separation check.** Verify business logic is in hooks (frontend) or services (backend), NOT in components or controllers.
3. **Design system compliance.** Verify no hardcoded hex colors — only Tailwind tokens (`bg-primary`, not `bg-[#2563EB]`). All interactive elements use shadcn/ui.
4. **Error states.** Verify loading, error, and empty states are handled in UI.
5. **Accessibility.** Check for ARIA labels on icon buttons, semantic HTML, keyboard navigation.
6. **Run build verification.** Execute `pnpm build` to ensure no compile errors.
7. **Run tests if they exist.** Execute `pnpm test` if test files were created.

### Playwright Visual Test Template

When creating visual tests for a new feature page, follow this pattern:

```typescript
import { expect, test } from "@playwright/test";

test.describe("<Feature> pages — visual regression", () => {
  test("<page> renders correctly", async ({ page }) => {
    await page.goto("/<route>");
    await page.waitForLoadState("networkidle");

    // Assert key elements are visible
    await expect(page.getByRole("heading", { name: /expected heading/i })).toBeVisible();
    // ... more element checks

    // Visual screenshot comparison
    await expect(page).toHaveScreenshot("<page-name>.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  // Test interactive states (validation, loading, etc.)
  test("<page> — <state>", async ({ page }) => {
    await page.goto("/<route>");
    await page.waitForLoadState("networkidle");
    // trigger state...
    await expect(page).toHaveScreenshot("<page-state>.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
```

Playwright config is at `apps/web/playwright.config.ts` with two projects: `desktop` (1440x900 Chrome) and `mobile` (Pixel 7 Chrome). Screenshots are saved to `e2e/screenshots/{projectName}/`.

### Output

Write `.claude/pipeline/test-report.md`:

```markdown
# Test Report

## Verdict: PASSED | FAILED

## Summary
Brief overall test assessment.

## Visual Regression Tests (MANDATORY for UI tasks)
| Test | Desktop | Mobile | Details |
|------|---------|--------|---------|
| Page renders | PASS/FAIL | PASS/FAIL | ... |
| State X | PASS/FAIL | PASS/FAIL | ... |

## Design Comparison (Pencil vs Implementation)
| Element | Design | Implementation | Match? |
|---------|--------|----------------|--------|
| Layout | ... | ... | YES/NO |
| Colors | ... | ... | YES/NO |
| Typography | ... | ... | YES/NO |
| Components | ... | ... | YES/NO |
| Decorative elements | ... | ... | YES/NO |

## UI Tests (if applicable)
| Check | Status | Details |
|-------|--------|---------|
| Colors match design | PASS/FAIL | ... |
| Layout matches design | PASS/FAIL | ... |
| Typography correct | PASS/FAIL | ... |
| Components correct | PASS/FAIL | ... |
| Responsive behavior | PASS/FAIL | ... |
| Dark mode | PASS/FAIL | ... |

## API Tests (if applicable)
| Check | Status | Details |
|-------|--------|---------|
| Routes exist | PASS/FAIL | ... |
| DTOs validated | PASS/FAIL | ... |
| Auth/Guards | PASS/FAIL | ... |
| Swagger docs | PASS/FAIL | ... |
| Error handling | PASS/FAIL | ... |
| DB operations | PASS/FAIL | ... |

## Code Quality Tests
| Check | Status | Details |
|-------|--------|---------|
| Component size (<150 lines) | PASS/FAIL | ... |
| Logic separated from UI | PASS/FAIL | ... |
| shadcn/ui used (no raw HTML) | PASS/FAIL | ... |
| Design tokens (no hardcoded hex) | PASS/FAIL | ... |
| Error/loading/empty states | PASS/FAIL | ... |
| Accessibility basics | PASS/FAIL | ... |

## Issues Found

### Critical (blocks passing)
- [ ] Issue description — expected vs actual — how to fix

### Minor (non-blocking)
- [ ] Issue description — suggestion

## Design References
Screenshots or layout snapshots used for comparison.
```

**Verdict rules:**
- **PASSED** = 0 critical issues, implementation matches design/spec, Playwright visual tests pass
- **FAILED** = any critical mismatch between design and implementation, or Playwright tests fail

Update `.claude/pipeline/state.json` with test phase status and verdict.

### Allowed Tools
Read, Glob, Grep, Bash, mcp__pencil__open_document, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__get_editor_state, mcp__pencil__snapshot_layout, mcp__pencil__export_nodes, mcp__pencil__get_style_guide, mcp__pencil__get_guidelines
