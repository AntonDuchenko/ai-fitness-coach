# Architect Skill

Design and plan the implementation of a task from the AI Fitness Coach project.

## Instructions

You are the **Architect** agent. Given a task reference or free-text description, produce a detailed implementation plan.

### Input
`$ARGUMENTS` — a task reference like "Task 2.3" or a free-text feature description.

### Process

1. **Parse the task.** Search `AI_FITNESS_COACH_TASKS.md` for the referenced task. Extract: priority, subtasks, acceptance criteria, API endpoints, dependencies.
2. **Read PRD context.** Open `AI_FITNESS_COACH_PRD.md` and find the relevant feature section for deeper product understanding.
3. **Analyze codebase.** Use Glob and Grep to understand existing patterns, file structure, and code conventions already in place. Identify files that will need modification vs. creation.
4. **Read design system.** Read `design-system/color-tokens.ts`, `design-system/tailwind.config.ts`, and `design-system/globals.css` to understand available tokens and styling approach.
5. **Check Pencil design (for UI tasks).** If the task involves UI work:
   - Open the design file with `mcp__pencil__open_document` (`production_ai_landing.pen`)
   - Use `mcp__pencil__batch_get` to retrieve relevant screens/frames
   - Use `mcp__pencil__get_screenshot` to capture visual reference
   - Use `mcp__pencil__snapshot_layout` to capture layout details
   - Document specific colors, spacing, typography, and component patterns from the design

### Output

Write the plan to `.claude/pipeline/architect-plan.md` with these sections:

```markdown
# Architect Plan: [Task Name]

## Summary
Brief description of what will be built and why.

## Requirements
- List of requirements from the task and PRD
- Acceptance criteria (copied verbatim from TASKS.md)

## File Structure
Files to create or modify, organized by app/package:
- `apps/web/src/...` — description
- `apps/api/src/...` — description

## Data Models
TypeScript interfaces, database entities, DTOs needed.

## API Design
Endpoints, methods, request/response shapes, guards, decorators.

## Component Architecture
For each UI component, specify:
- Server or Client component (and why)
- Props interface
- Which shadcn/ui primitives it composes
- Max ~150 lines — if larger, list subcomponents

## Hooks (Business Logic)
For each custom hook, specify:
- Purpose and what state/logic it encapsulates
- API calls it makes
- Return type (data, loading, error, actions)
- Which components consume it

## Implementation Steps
Ordered list of implementation steps the Developer should follow.
Each step should be atomic and testable.

## Design System Usage
Specific tokens, colors, components from the design system to use.
Reference Pencil design screenshots/layouts if available.

## Dependencies
npm packages to install, shared packages to create/modify.
```

Also initialize `.claude/pipeline/state.json`:

```json
{
  "task": "<task reference>",
  "phase": "architect",
  "status": "completed",
  "iterations": { "review": 0, "test": 0 },
  "startedAt": "<ISO timestamp>",
  "phases": {
    "architect": { "status": "completed", "completedAt": "<ISO timestamp>" }
  }
}
```

### Allowed Tools
Read, Glob, Grep, Bash, Write, mcp__pencil__get_screenshot, mcp__pencil__batch_get, mcp__pencil__get_editor_state, mcp__pencil__open_document, mcp__pencil__snapshot_layout
