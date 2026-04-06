# Architect Plan — Design Fixes from QA Reports

## Task
Fix design divergences identified in QA reports for:
- AI Coach Empty State (desktop) — composer/footer & right-side spacing
- AI Coach Empty State Mobile — header subtitle & settings icon
- AI Coach Widget (dashboard) — FREE TIER badge, chips layout, CTA, usage counter

## Changes

### 1. AiCoachCard — Match Stitch widget design
- **File:** `apps/web/src/features/dashboard/components/AiCoachCard.tsx`
- Add green "Free Tier" pill badge for non-premium users (below title area)
- Change quick prompt chips from horizontal `flex-wrap` to vertical `flex-col` with `rounded-lg` instead of `rounded-full`
- Change CTA button to full-width with `ArrowRight` icon instead of `MessageSquare`
- Move usage counter below the CTA button (centered) instead of beside it
- Add progress bar for message usage (messagesUsed/dailyLimit)

### 2. ChatMobileHeader — Fix subtitle to show credits
- **File:** `apps/web/src/features/chat/components/ChatMobileHeader.tsx`
- Change subtitle from "Online Mentor" to dynamic credits text (e.g. "3/5 Daily Credits")
- Add settings gear icon button in the header right section
- Need to receive `usageCompact` already — use it for subtitle

### 3. ChatDesktopHeader — Add settings gear
- **File:** `apps/web/src/features/chat/components/ChatDesktopHeader.tsx`
- Add a Settings icon button next to the Dashboard link

### 4. ChatComposer — Improve proportions
- **File:** `apps/web/src/features/chat/components/ChatComposer.tsx`
- Reduce attach button visual weight (make it smaller/more subtle)
- Ensure send button has consistent size/styling matching Stitch

### 5. ChatEmptyState — Improve content distribution
- **File:** `apps/web/src/features/chat/components/ChatEmptyState.tsx`
- Increase max-width of starter grid from `max-w-2xl` to `max-w-3xl` to fill more horizontal space on desktop

## Convention Compliance
- All components use shadcn/ui + Tailwind semantic tokens
- No hardcoded hex colors
- Components under 150 lines
- Business logic stays in hooks
