# Orchestrate Skill

Run the full development pipeline for a task: Architect -> Developer -> Reviewer -> Tester.

## Instructions

You are the **Orchestrator**. You execute the entire development pipeline inline (within this single context), coordinating all phases automatically. You enforce all project conventions from CLAUDE.md throughout every phase.

### Input
`$ARGUMENTS` — a task reference like "Task 0.1" or a free-text feature description.

### Pipeline

```
[Init] -> [Architect] -> [Developer] -> [Reviewer]
                              ^              |
                              +-- NEEDS_CHANGES (max 3)
                                             |
                                         APPROVED
                                             |
                                         [Tester]
                              ^              |
                              +-- FAILED (max 3)
                                             |
                                          PASSED
                                             |
                                      [Summary + Commit]
```

### Execution Rules

1. **All phases execute inline** — do NOT delegate via Skill tool. You perform each role yourself within this conversation.
2. **Max 3 review loops** — if the reviewer says NEEDS_CHANGES 3 times, stop and report.
3. **Max 3 test loops** — if tester says FAILED 3 times, stop and report.
4. **Announce each phase** — print a clear status message before starting each phase so the user can track progress.
5. **State tracking** — update `.claude/pipeline/state.json` after each phase.
6. **Convention enforcement** — every phase MUST follow CLAUDE.md conventions. Specifically enforce:
   - Component files max ~150 lines, split if larger
   - Business logic in hooks (frontend) / services (backend), NOT in components / controllers
   - ALL UI uses shadcn/ui components + Tailwind utility classes with semantic design tokens
   - No hardcoded hex colors — only CSS variable tokens (`bg-primary`, `text-muted-foreground`)
   - 4 async UI states: loading, error, empty, success
   - Accessible: semantic HTML, ARIA labels, keyboard navigation

### Phase Details

#### Phase 1: Init
- Announce: `## [1/5] Initializing pipeline for: <task>`
- **Read CLAUDE.md** to load all project conventions into context.
- **Pre-flight check:**
  - Read `AI_FITNESS_COACH_TASKS.md` and validate the task reference exists (or parse free-text).
  - Check current project state with Glob — what already exists in `apps/`, `packages/`.
  - If `package.json` exists at root, run `pnpm install` to ensure deps are fresh.
  - Note: if the project is not yet initialized (e.g. Task 0.1), skip build/lint checks in later phases and note this in state.
- Create `.claude/pipeline/state.json`:
```json
{
  "task": "<from $ARGUMENTS>",
  "taskTitle": "<human-readable title from TASKS.md>",
  "phase": "init",
  "status": "running",
  "iterations": { "review": 0, "test": 0 },
  "maxIterations": { "review": 3, "test": 3 },
  "startedAt": "<ISO timestamp>",
  "projectInitialized": true|false,
  "phases": {}
}
```

#### Phase 2: Architect
- Announce: `## [2/5] Architect: Designing implementation plan`
- Follow the full process from `.claude/skills/architect/SKILL.md`:
  - Parse task from TASKS.md (priority, subtasks, acceptance criteria, API endpoints)
  - Read PRD for product context
  - Analyze codebase patterns (Glob/Grep for existing conventions)
  - Read design system (`design-system/` files)
  - For UI tasks: open Pencil design, get screenshots and layouts
- **Architecture must enforce conventions:**
  - Plan the feature-based folder structure (`features/<name>/hooks/`, `components/`, `types.ts`)
  - Explicitly list which custom hooks will hold business logic and what each returns
  - Specify which shadcn/ui components to use for each UI element
  - Identify server vs client components with justification
  - Plan error/loading/empty states for async UI
- Write `.claude/pipeline/architect-plan.md`
- Update state.json: phase = "architect", status = "completed"

#### Phase 3: Developer
- Announce: `## [3/5] Developer: Implementing code`
- **First iteration:** follow the full architect plan step by step.
- **Fix iteration (after review):** read `review-report.md`, fix ONLY the flagged critical issues. Do not re-implement working code. List each issue being fixed.
- **Fix iteration (after test):** read `test-report.md`, fix ONLY the failed checks. Do not re-implement working code. List each failure being fixed.
- Implementation rules:
  - Follow the code conventions in CLAUDE.md strictly
  - Create hooks for business logic FIRST, then build presentational components on top
  - Use shadcn/ui components — never raw `<button>`, `<input>`, `<div class="card">` etc.
  - Use only Tailwind classes with semantic tokens — grep your own output for hardcoded hex to self-verify
  - Handle all UI states (loading → Skeleton, error → error message, empty → empty state, success → data)
  - Add ARIA labels on icon-only buttons, use semantic HTML elements
- **Build verification** (skip if `projectInitialized === false`):
  - Run `pnpm build` — must pass
  - Run `pnpm lint` — must pass
  - If either fails, fix before completing
- Update state.json: phase = "developer", filesChanged list

#### Phase 4: Reviewer
- Announce: `## [4/5] Reviewer: Code review (iteration N/3)`
- Follow the full process from `.claude/skills/reviewer/SKILL.md`:
  - Read plan, ALL changed files, original task
  - Apply the full 25-point checklist from the reviewer skill
  - **Pay special attention to:**
    - Component size (flag any file >150 lines)
    - Logic separation (flag any API call or business logic inside a component)
    - Design system compliance (flag any hardcoded hex, any raw HTML instead of shadcn/ui)
    - Error states (flag any async UI missing loading/error/empty handling)
  - Run build/lint verification (if project is initialized)
- Write `.claude/pipeline/review-report.md` with verdict
- **If NEEDS_CHANGES and iterations.review < 3:**
  - Increment iterations.review
  - Announce: `### Review: NEEDS_CHANGES — found N critical issues. Returning to Developer (iteration N/3)`
  - List the critical issues briefly in the announcement
  - Go back to Phase 3 (Developer fix iteration)
- **If NEEDS_CHANGES and iterations.review >= 3:**
  - Announce: `### Max review iterations reached (3/3). Stopping pipeline.`
  - Jump to Summary with status STOPPED_AT_REVIEW
- **If APPROVED:**
  - Announce: `### Review: APPROVED. Proceeding to testing.`
  - Proceed to Phase 5

#### Phase 5: Tester
- Announce: `## [5/5] Tester: Verifying implementation (iteration N/3)`
- Follow the full process from `.claude/skills/tester/SKILL.md`:
  - For UI: open Pencil design, compare screenshots/layouts with implementation
  - For API: verify endpoints, DTOs, guards, Swagger, error handling
  - **Playwright visual regression (MANDATORY for UI tasks):**
    - If visual tests don't exist for the new pages, CREATE them in `apps/web/e2e/`
    - Run `cd apps/web && npx playwright test --update-snapshots` (first run creates baselines)
    - READ the captured screenshot PNGs and compare them against Pencil design screenshots
    - Look for: missing elements, wrong colors/spacing, layout differences, missing decorative elements
    - If discrepancies are found, report them as critical issues and return to Developer
  - **Code quality tests** (always run):
    - Component size check (<150 lines)
    - Logic separation check (hooks/services vs components/controllers)
    - Design system compliance (shadcn/ui, semantic tokens, no hardcoded hex)
    - Error/loading/empty state coverage
    - Accessibility basics (ARIA, semantic HTML)
  - Run build verification (if project is initialized)
- Write `.claude/pipeline/test-report.md` with verdict
- **If FAILED and iterations.test < 3:**
  - Increment iterations.test
  - Announce: `### Tests: FAILED — found N critical issues. Returning to Developer (iteration N/3)`
  - List the critical failures briefly
  - Go back to Phase 3 (Developer fix iteration)
- **If FAILED and iterations.test >= 3:**
  - Announce: `### Max test iterations reached (3/3). Stopping pipeline.`
  - Jump to Summary with status STOPPED_AT_TEST
- **If PASSED:**
  - Announce: `### Tests: PASSED. All checks green.`
  - Proceed to Summary

#### Summary
- Announce: `## Pipeline Complete`
- Write `.claude/pipeline/summary.md`:

```markdown
# Pipeline Summary

## Task: <task reference> — <task title>
## Final Status: SUCCESS | STOPPED_AT_REVIEW | STOPPED_AT_TEST

## Timeline
| Phase | Status | Iterations |
|-------|--------|------------|
| Init | Completed | — |
| Architect | Completed | — |
| Developer | Completed | N passes |
| Reviewer | APPROVED / NEEDS_CHANGES | N/3 iterations |
| Tester | PASSED / FAILED | N/3 iterations |

## Convention Compliance
| Rule | Status |
|------|--------|
| Component size (<150 lines) | PASS/FAIL |
| Business logic separated (hooks/services) | PASS/FAIL |
| shadcn/ui used (no raw HTML) | PASS/FAIL |
| Semantic design tokens (no hardcoded hex) | PASS/FAIL |
| Error/loading/empty states | PASS/FAIL |
| Accessibility | PASS/FAIL |
| TypeScript strict (no `any`) | PASS/FAIL |

## Files Created/Modified
- `path/to/file` — description of change

## Key Decisions
- Notable architectural or implementation decisions made

## Remaining Issues (if stopped)
- Issues that were not resolved within iteration limits
```

- Update state.json: phase = "summary", status = "completed" | "stopped_at_review" | "stopped_at_test", completedAt
- **Ask user:** "Pipeline complete. Would you like me to commit these changes?" If yes, create a conventional commit: `feat(<scope>): <task title>`.

### Allowed Tools
Read, Write, Edit, Glob, Grep, Bash, mcp__pencil__open_document, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__get_editor_state, mcp__pencil__snapshot_layout, mcp__pencil__export_nodes, mcp__pencil__get_style_guide, mcp__pencil__get_guidelines
