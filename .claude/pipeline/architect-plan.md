# Architect Plan: Onboarding UI Redesign (Stitch)

## Scope
Rewrite all 10 onboarding UI components to match the Stitch AI-generated design while preserving all existing business logic (hooks, schemas, types, submit flow).

## Design Token Mapping (Stitch → Project M3 tokens from globals.css)
- `bg-m3-surface` (#131313) — page background
- `bg-m3-surface-lowest` (#0E0E0E) — input backgrounds
- `bg-m3-surface-low` (#1C1B1B) — section bg
- `bg-m3-surface-container` (#201F1F) — card bg
- `bg-m3-surface-high` (#2A2A2A) — elevated cards
- `bg-m3-surface-highest` (#353534) — highest surface
- `text-m3-on-surface` (#E5E2E1) — primary text
- `text-m3-primary` (#ADC6FF) — primary accent text
- `bg-m3-primary-container` (#4D8EFF) — primary buttons/active states
- `text-m3-on-primary-container` (#00285D) — text on primary container
- `text-m3-secondary` (#4AE176) — success/green accent
- `bg-m3-secondary-container` (#00B954) — green buttons
- `text-m3-outline` (#8C909F) — subtle text
- `border-m3-outline-variant` (#424754) — ghost borders
- `.glass-card` utility — glassmorphism panels
- `.glow-bg` utility — ambient background glow
- `font-heading` (Poppins) for headlines

## Files to Modify (UI only — no hooks/types/schemas changes)

### 1. `OnboardingScreen.tsx` (~140 lines)
- Full-bleed dark layout with `.glow-bg` ambient background
- Top header: back arrow + "FORGEFIT" branding centered
- Step counter (bold number + /8) + progress bar with glowing fill shadow
- Large headline per step (font-heading text-3xl font-extrabold)
- Step content area (scrollable)
- Fixed bottom nav: Back chevron left + Continue pill button center (rounded-full). Step 8 = green "Generate My Plan" button

### 2. `StepBasicInfo.tsx` (~100 lines)
- Gender: 3 pill toggles in bg-m3-surface-lowest rounded-2xl p-1.5 container
- Inputs: bg-m3-surface-lowest rounded-xl py-4 px-5 font-heading text-xl font-bold
- Height unit toggle: small segmented control (bg-m3-surface-high)
- Suffix text (years, cm, kg) positioned absolute right-5

### 3. `StepGoals.tsx` (~100 lines)
- Primary: 2x2 grid of glass-card goal cards with lucide icons
- Selected: bg-m3-primary-container/10 border-2 border-m3-primary-container + checkmark
- Unselected: border border-white/5 glass-card hover:border-m3-primary-container/40
- Secondary: horizontal chip row, multi-select, rounded-full

### 4. `StepExperience.tsx` (~110 lines)
- Two sections with lucide icon + title headers
- Fitness level: 4 stacked radio cards (glass-card, selected: border-m3-primary-container/60 bg-m3-primary-container/10)
- Nutrition knowledge: 4 stacked radio cards (green accent: border-m3-secondary/60 bg-m3-secondary/10)

### 5. `StepSchedule.tsx` (~100 lines)
- Days: 7 square glass-card buttons in a row, selected: bg-m3-primary-container/20 border-m3-primary-container/30
- Duration: glass-card select dropdown h-16 rounded-2xl
- Time: 2x2 pill grid with lucide icons (rounded-full)

### 6. `StepEquipment.tsx` (~100 lines)
- Location: 3 cards with lucide icons, selected: border-2 border-m3-primary ring-2 ring-m3-primary/20
- Equipment: checkbox list with circle indicators in glass-card rows

### 7. `StepLimitations.tsx` (~85 lines)
- Info banner: bg-m3-primary/10 border-m3-primary/20 with Info icon
- Textareas: bg-m3-surface-lowest rounded-xl
- Dietary: 2x2 card grid bg-m3-surface-high, selected: border-m3-secondary/40 bg-m3-secondary/10

### 8. `StepNutrition.tsx` (~120 lines)
- Meals/day: circle number selector in bg-m3-surface-lowest rounded-full container
- Cooking + budget: glass-panel card sections
- Cuisine: flex-wrap chip buttons (selected: bg-m3-primary-container text-m3-on-primary-container)
- Disliked foods: text input

### 9. `StepMotivation.tsx` (~110 lines)
- Large textarea for motivation
- Yes/No pill toggle in bg-m3-surface-lowest container
- Expansion glass-panel for "what happened" details
- Challenge chips: rounded-full multi-select

### 10. `GeneratingScreen.tsx` (~130 lines)
- glass-panel rounded-2xl centered card
- SVG circular progress ring (stroke m3-secondary)
- 5 status checklist items with check circles
- Percentage display: text-4xl font-heading text-m3-secondary
- "Go to Dashboard" button: bg-m3-secondary-container on complete
- Error state with retry button

### Unchanged files
- `OnboardingStepContent.tsx` — router only, no visual changes
- `OptionButton.tsx` / `CheckRow.tsx` — will no longer be imported (can remain)
- All hooks, types, schemas — completely untouched

## Convention Compliance
- All components < 150 lines
- Business logic stays in hooks (zero API calls in components)
- Use shadcn/ui `Button` for primary actions (Continue, Back, Generate)
- Semantic M3 tokens only (no hardcoded hex)
- `cn()` for conditional classes
- ARIA: role="radio", aria-checked, aria-label on all interactive elements
- Keyboard-accessible: all interactive elements are button/input elements
