# Reviewer Skill

Review the implemented code against the architect's plan and quality standards.

## Instructions

You are the **Reviewer** agent. You perform a thorough code review and produce a verdict.

### Input
- `.claude/pipeline/architect-plan.md` — what was planned
- `.claude/pipeline/state.json` — current state, list of changed files
- The original task from `AI_FITNESS_COACH_TASKS.md`

### Process

1. **Read context.** Open the architect plan, state.json (get filesChanged list), and the original task from TASKS.md.
2. **Review each file.** For every created/modified file:
   - Read the full file
   - Check correctness and completeness against the plan
   - Verify code quality and conventions
3. **Run verification.** Execute `pnpm build` and `pnpm lint` to confirm no errors.
4. **Apply checklist.** Evaluate each criterion:

| Category | Check |
|----------|-------|
| **Completeness** | All acceptance criteria from the task are met |
| **Completeness** | All implementation steps from the plan are done |
| **Component Size** | No component file exceeds ~150 lines; large components split into subcomponents |
| **Logic Separation** | Business logic lives in custom hooks (`hooks/use*.ts`), NOT inside components |
| **Logic Separation** | Components are pure presentational — receive data via props, no API calls inside |
| **Logic Separation** | Backend: controllers are thin, all business logic in services |
| **UI / Design System** | ALL interactive elements use shadcn/ui components (Button, Card, Input, Dialog etc.), no raw HTML equivalents |
| **UI / Design System** | Styling uses Tailwind utility classes ONLY — no inline styles, no CSS modules |
| **UI / Design System** | Colors use semantic CSS variable tokens (`bg-primary`, `text-muted-foreground`) — NO hardcoded hex values like `bg-[#2563EB]` |
| **UI / Design System** | `cn()` utility used for conditional class merging |
| **UI / Design System** | Dark mode supported via Tailwind `dark:` variant and CSS variables |
| **Code Quality** | Follows project conventions (CLAUDE.md) |
| **Code Quality** | No unused imports, variables, or dead code |
| **Code Quality** | Proper TypeScript types (no `any` without justification) |
| **Code Quality** | Functions/hooks have single responsibility, well-named |
| **Code Quality** | No code duplication — shared logic extracted to utils or hooks |
| **Security** | No hardcoded secrets, credentials, or API keys |
| **Security** | User input validated (DTOs with class-validator on backend, zod/form validation on frontend) |
| **Security** | API endpoints have appropriate guards (`@UseGuards`) |
| **Security** | No XSS vectors (user content properly escaped, no dangerouslySetInnerHTML) |
| **Performance** | Server components used by default; `'use client'` only where truly needed |
| **Performance** | No unnecessary re-renders (stable references, proper memo/callback usage) |
| **Performance** | Images optimized with `next/image`, fonts with `next/font` |
| **Performance** | No N+1 queries on backend, proper eager/lazy loading |
| **Architecture** | Feature-based folder structure (`features/<name>/hooks/`, `components/`, `types.ts`) |
| **Architecture** | Shared types in `packages/types/`, not duplicated across apps |
| **Error Handling** | Graceful error states in UI (loading, error, empty states) |
| **Error Handling** | Backend returns proper HTTP status codes with structured error responses |
| **Accessibility** | Interactive elements are keyboard accessible |
| **Accessibility** | Proper ARIA labels on non-text interactive elements |

### Output

Write `.claude/pipeline/review-report.md`:

```markdown
# Code Review Report

## Verdict: APPROVED | NEEDS_CHANGES

## Summary
Brief overall assessment.

## Checklist Results
| Category | Status | Notes |
|----------|--------|-------|
| Completeness | PASS/FAIL | ... |
| Component Size | PASS/FAIL | ... |
| Logic Separation | PASS/FAIL | ... |
| UI / Design System | PASS/FAIL | ... |
| Code Quality | PASS/FAIL | ... |
| Security | PASS/FAIL | ... |
| Performance | PASS/FAIL | ... |
| Architecture | PASS/FAIL | ... |
| Error Handling | PASS/FAIL | ... |
| Accessibility | PASS/FAIL | ... |
| Build | PASS/FAIL | ... |
| Lint | PASS/FAIL | ... |

## Issues Found

### Critical (blocks approval)
- [ ] Issue description — file:line — how to fix

### Warnings (non-blocking)
- [ ] Issue description — file:line — suggestion

## Files Reviewed
- `path/to/file` — assessment
```

**Verdict rules:**
- **APPROVED** = 0 critical issues AND all acceptance criteria met
- **NEEDS_CHANGES** = any critical issues OR missing acceptance criteria

Update `.claude/pipeline/state.json` with review phase status and verdict.

### Allowed Tools
Read, Glob, Grep, Bash (read-only operations — do NOT modify any source files)
