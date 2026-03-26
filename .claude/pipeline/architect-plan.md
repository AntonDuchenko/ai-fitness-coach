# Architect Plan: Auth Pages Redesign (Stitch Login/Sign Up)

## Overview
Redesign the auth pages (`/login`, `/signup`) to match the Stitch "Login / Sign Up" design. Replace the current split hero+form layout with a single-column centered layout featuring social-first auth flow, bold typography, and a stats footer.

## Approach
- **Reuse** existing hooks (useAuth, useAuthForm, usePasswordStrength) — no logic changes
- **Rewrite** layout and form components to match Stitch design
- **Delete** AuthHero + FloatingCards (replaced by single-column layout)
- **Adapt** Stitch colors to ForgeFit design system tokens

## Design Decisions
- Single-column centered layout (no split panels)
- Social buttons first → divider → email form (Stitch flow)
- Bold Space Grotesk headlines ("Welcome back, Athlete." / "Start Your Journey.")
- Stats footer for social proof
- All colors via semantic CSS variable tokens — no hardcoded hex
- Use shadcn `<Checkbox>` instead of raw `<input type="checkbox">`

## Files Changed (5)
1. `apps/web/src/features/auth/components/AuthLayout.tsx` — rewrite to single-column centered
2. `apps/web/src/features/auth/components/LoginForm.tsx` — redesign with Stitch layout
3. `apps/web/src/features/auth/components/SignupForm.tsx` — redesign with Stitch layout
4. `apps/web/src/features/auth/components/SocialButtons.tsx` — full-width stacked buttons

## Files Deleted (2)
5. `apps/web/src/features/auth/components/AuthHero.tsx` — no longer used
6. `apps/web/src/features/auth/components/FloatingCards.tsx` — no longer used

## Files Unchanged
- `hooks/useAuth.ts`, `hooks/useAuthForm.ts`, `hooks/usePasswordStrength.ts`
- `types.ts`, `index.ts` (remove AuthHero export if present — it's not)
- `components/PasswordInput.tsx`, `components/PasswordStrength.tsx`
- `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`, `app/(auth)/layout.tsx`
