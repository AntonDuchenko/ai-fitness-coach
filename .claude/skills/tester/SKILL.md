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

### Output

Write `.claude/pipeline/test-report.md`:

```markdown
# Test Report

## Verdict: PASSED | FAILED

## Summary
Brief overall test assessment.

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
- **PASSED** = 0 critical issues, implementation matches design/spec
- **FAILED** = any critical mismatch between design and implementation

Update `.claude/pipeline/state.json` with test phase status and verdict.

### Allowed Tools
Read, Glob, Grep, Bash, mcp__pencil__open_document, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__get_editor_state, mcp__pencil__snapshot_layout, mcp__pencil__export_nodes, mcp__pencil__get_style_guide, mcp__pencil__get_guidelines
