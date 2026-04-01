# Architect Plan: AI Coach Chat Page Redesign (Stitch)

## Scope
Complete visual redesign of all chat page components to match Stitch AI-generated designs (6 screens: desktop chat, mobile chat, desktop empty, mobile empty, desktop limit, mobile limit). All business logic (hooks, types, utils) remains untouched.

## Design Token Mapping (Stitch → Project M3 tokens from globals.css)
- `bg-m3-surface` (#131313) — page/main background
- `bg-m3-surface-lowest` (#0E0E0E) — input backgrounds, lowest layer
- `bg-m3-surface-low` (#1C1B1B) — sidebar active bg, AI message bg, composer bg
- `bg-m3-surface-container` (#201F1F) — card/section bg
- `bg-m3-surface-high` (#2A2A2A) — elevated cards, header elements, starter cards
- `bg-m3-surface-highest` (#353534) — scrollbar, highest elevation
- `text-m3-on-surface` (#E5E2E1) — primary text
- `text-m3-primary` (#ADC6FF) — primary accent text
- `bg-m3-primary-container` (#4D8EFF) — user messages, CTAs, send button, sidebar active
- `text-m3-on-primary-container` (#00285D) — text on primary container
- `text-m3-secondary` (#4AE176) — green online dot, success accent
- `text-m3-outline` (#8C909F) — muted/subtitle text
- `border-m3-outline-variant` (#424754) — ghost borders at low opacity
- `text-m3-tertiary` (#FFB786) — tertiary accent (fats, recovery)
- `.glass-card` utility — glassmorphism for overlays
- `.glow-bg` utility — ambient background glow

## Files to Modify (UI only — no hooks/types/schemas changes)

### 1. `ChatScreen.tsx` (~150 lines)
- Keep exact same hook usage and state management
- Update layout: `flex h-[100dvh]` with `bg-m3-surface-lowest` main area
- Add decorative glow div (absolute positioned radial gradient)
- Desktop: sidebar fixed left, main content with `ml-64`
- Mobile: no sidebar, fixed header + fixed bottom composer

### 2. `ChatSidebar.tsx` (~130 lines)
- Brand: "ForgeFit" h1 text-2xl font-black + "The Luminous Mentor" subtitle
- "Start New Session" button: `bg-m3-primary-container text-m3-on-primary-container rounded-xl`
- Nav items: Dashboard, AI Coach (active), Training Plan, Settings
- Active nav: `text-m3-primary-container bg-m3-surface-low rounded-xl`
- Inactive nav: `text-m3-outline hover:text-white hover:bg-m3-surface-low`
- User profile at bottom with avatar circle + name + plan label
- Width: w-64, fixed, `bg-m3-surface border-r border-white/5`

### 3. `ChatDesktopHeader.tsx` (~90 lines)
- Left: AI Coach icon in rounded-xl bg + title "AI Coach" + green pulse dot + subtitle
- Right: usage badge (rounded-full pill) + action buttons (history, notifications)
- Background: `bg-m3-surface/80 backdrop-blur-xl`
- Bottom border via absolute div `bg-m3-surface-low h-[1px]`

### 4. `ChatMobileHeader.tsx` (~80 lines)
- Left: hamburger button + "AI Coach" title + green pulse dot + "Online Mentor"
- Right: usage badge (pill with bolt icon) + AI avatar circle
- Fixed top, `bg-m3-surface`, gradient fade below

### 5. `ChatEmptyState.tsx` (~140 lines)
- Centered layout with decorative glow background
- Large AI badge: gradient circle with "AI" text (or bolt icon on mobile)
- "Welcome to ForgeFit" heading (text-4xl font-extrabold on desktop, text-3xl on mobile)
- Descriptive paragraph
- 4 starter prompt cards in 2x2 grid:
  - Each: icon in colored bg + title + subtitle
  - Colors: primary (workout), secondary (meals), tertiary (progress), error (recovery)
  - `bg-m3-surface-high border border-white/5 rounded-2xl hover:bg-m3-surface-highest`
- Still calls `onPick` on click

### 6. `ChatMessageList.tsx` (~140 lines)
- Date divider: centered pill "TODAY" in `bg-m3-surface-low text-m3-outline`
- AI messages: left-aligned, robot icon in `bg-m3-primary-container/20`, message in `bg-m3-surface-high rounded-2xl rounded-tl-none border border-white/5`
- User messages: right-aligned, `bg-m3-primary-container text-m3-on-primary-container rounded-2xl rounded-tr-none`
- Timestamps: `text-[10px] text-m3-outline font-bold uppercase`
- Keep copy button, markdown rendering

### 7. `ChatComposer.tsx` (~100 lines)
- Desktop: max-w-4xl centered, `bg-m3-surface-high rounded-2xl border border-white/5`
- Inner layout: attach button + textarea + mic button (hidden for now) + send button
- Send button: `bg-m3-primary-container text-m3-on-primary-container rounded-xl w-10 h-10`
- Disclaimer text below: `text-[10px] text-m3-outline uppercase tracking-widest`
- Mobile: full-width, fixed bottom with `bg-m3-surface/80 backdrop-blur-xl`

### 8. `ChatTypingIndicator.tsx` (~30 lines)
- Match AI message style: robot icon + bouncing dots in `bg-m3-surface-high`

### 9. `ChatLoadingSkeleton.tsx` (~30 lines)
- Match new message layout with Skeleton components

### 10. `ChatLimitDialog.tsx` (~100 lines)
- Full overlay: `bg-m3-surface-lowest/80 backdrop-blur-md`
- Modal: `glass-card rounded-[2rem] border border-white/5`
- Bolt icon in `bg-m3-surface-high rounded-[1.5rem]`
- Title: "Daily Message Limit Reached" (text-2xl font-black)
- Progress bars: 5 bars in `bg-m3-primary-container`
- "5 OF 5 FREE MESSAGES USED" label
- "Upgrade to Pro" CTA button
- "Maybe later" ghost button

### 11. `ChatErrorState.tsx` (~25 lines)
- Minimal changes: match M3 token colors

### 12. `ScrollToBottomButton.tsx` (~20 lines)
- Match M3 styling

### 13. `MarkdownContent.tsx` — No changes
### 14. `MobileDrawer.tsx` — No changes
### 15. All hooks, types, utils — No changes

## Convention Compliance
- All components < 150 lines
- Business logic stays in hooks (zero API calls in components)
- Use shadcn/ui `Button`, `Dialog`, `Textarea`, `Skeleton` for base components
- Semantic M3 tokens only (no hardcoded hex)
- `cn()` for conditional classes
- ARIA labels on all interactive elements
- Keyboard navigation preserved
