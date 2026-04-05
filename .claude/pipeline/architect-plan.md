# Architect Plan — Chat UI Fixes (QA Reports)

## Task
Fix UI discrepancies in `/chat` page (desktop + mobile) identified by stitch-browser-qa reports.

## Changes

### 1. ChatMobileHeader — Replace Bot icon with user initials avatar
- **File:** `apps/web/src/features/chat/components/ChatMobileHeader.tsx`
- Add `userInitials` prop
- Replace `<Bot>` icon with initials avatar circle (same style as sidebar profile)

### 2. ChatScreen — Pass fixed "AI Coach" title to headers
- **File:** `apps/web/src/features/chat/components/ChatScreen.tsx`
- Both `ChatMobileHeader` and `ChatDesktopHeader` should receive `"AI Coach"` as the title
- Pass `userInitials` to `ChatMobileHeader`

### 3. ChatSidebar — Change CTA text
- **File:** `apps/web/src/features/chat/components/ChatSidebar.tsx`
- Change "New Chat" → "Start New Session"

### 4. ChatComposer — Update placeholder + add suggestion chips
- **File:** `apps/web/src/features/chat/components/ChatComposer.tsx`
- Update default placeholder to "Ask your AI trainer anything..."
- Add suggestion chips section below composer (visible in active chat, not empty state)
- Chips: context-aware suggestions like "How much water?", "Pre-workout snacks", "Credits"

### 5. ChatScreen — Add quick action cards in mobile view
- **File:** `apps/web/src/features/chat/components/ChatQuickActions.tsx` (new component)
- Two cards: "Meal Ideas" and "Past Trends" with icons
- Shown in mobile view below messages, above composer
- Only visible when there are messages (active chat, not empty state)

### 6. MobileDrawer — Fix z-index for close overlay
- **File:** `apps/web/src/features/chat/components/MobileDrawer.tsx`
- Ensure the backdrop overlay has correct z-index and doesn't conflict with sidebar content
- The overlay `z-40` but sidebar content is `z-50`, need to ensure click propagation is correct

## Convention Compliance
- All components use shadcn/ui + Tailwind semantic tokens
- No hardcoded hex colors
- Components under 150 lines
- Business logic stays in hooks
