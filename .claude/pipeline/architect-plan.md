# Architect Plan: Task 1.2 — Authentication Frontend

## Task Summary
Build login and signup pages with auth context, JWT token management, protected routes, and form validation. Must match the Pencil design (dark theme, split-panel layout).

## Backend API Contract
- `POST /auth/signup` — body: `{ email, password, name? }` → `{ accessToken, user: { id, email, name, isPremium, createdAt } }`
- `POST /auth/login` — body: `{ email, password }` → `{ accessToken, user }`
- `GET /auth/me` — header: `Authorization: Bearer <token>` → `{ id, email, name, isPremium, createdAt }`
- Backend runs on `http://localhost:4000`

## Design Analysis (from Pencil)
**Layout:** Split-panel — left side has decorative hero (dark gradient with floating cards), right side has the form on dark background.
**Login form:** Logo icon, "Welcome back" title, subtitle, email input, password input, forgot password link, Sign In button, "or continue with" divider, Google/Apple social buttons, "Don't have an account? Sign up" link, trust badges (SSL, Secure Login, 10K+ Users).
**Signup form:** Logo icon, "Create an account" title, subtitle, full name input, email input, password input with strength indicator (4 bars + 4 requirements: 8 chars, uppercase, number, special char), confirm password input, terms checkbox, Create Account button, divider, Google/Apple social, "Already have an account? Sign in" link.
**Theme:** Dark mode forced on auth pages.

## Architecture

### Feature Structure
```
apps/web/src/
  features/auth/
    hooks/useAuth.ts              # Auth context + hook (login, signup, logout, token mgmt)
    hooks/useAuthForm.ts          # Form state, validation, submission logic
    hooks/usePasswordStrength.ts  # Password strength calculation
    components/AuthLayout.tsx     # Split-panel layout (left hero + right form)
    components/AuthHero.tsx       # Left decorative panel
    components/LoginForm.tsx      # Login form UI
    components/SignupForm.tsx     # Signup form UI
    components/PasswordStrength.tsx # Strength bars + requirements checklist
    components/SocialButtons.tsx  # Google/Apple buttons + divider
    components/AuthProviderWrapper.tsx  # Provider that wraps layout
    types.ts                      # Auth-specific types
    index.ts                      # Public exports
  app/
    (auth)/
      login/page.tsx              # Login route
      signup/page.tsx             # Signup route
      layout.tsx                  # Auth layout (forces dark mode, wraps with AuthLayout)
    layout.tsx                    # Updated to include AuthProvider
  lib/
    api-client.ts                 # Fetch wrapper with base URL + auth headers
  components/common/
    ProtectedRoute.tsx            # Redirect to /login if not authenticated
```

### Custom Hooks (Business Logic)

**useAuth()** — Auth context hook
- State: `user`, `isLoading`, `isAuthenticated`
- Methods: `login(email, password)`, `signup(email, password, name?)`, `logout()`
- Token stored in `localStorage` (simpler for MVP, per task spec)
- On mount: check localStorage for token, call `GET /auth/me` to validate
- On login/signup: store token, set user
- On logout: clear token, clear user, redirect to `/login`

**useAuthForm(mode: 'login' | 'signup')** — Form logic
- State: `fields`, `errors`, `isSubmitting`, `serverError`
- Validation: email format, password min 8 chars, passwords match (signup)
- Submit: calls `login()` or `signup()` from auth context
- Error handling: maps API errors to field/form errors

**usePasswordStrength(password)** — Password strength
- Returns: `{ score: 0-4, requirements: { minLength, hasUppercase, hasNumber, hasSpecial } }`
- Score maps to strength level + bar count filled

### UI Components (Presentational Only)

**AuthLayout** — Two-column split: left hero (hidden on mobile), right form area
**AuthHero** — Gradient background, decorative text, floating stat cards (CSS-only approximation)
**LoginForm** — Receives form state/handlers via props, renders Card with inputs
**SignupForm** — Same pattern, includes PasswordStrength + confirm password + terms checkbox
**PasswordStrength** — 4 colored bars + 4 requirement rows with check/circle icons
**SocialButtons** — Google + Apple buttons with divider (non-functional for MVP, just UI)

### shadcn/ui Components Used
- `Card`, `CardHeader`, `CardContent` — form wrapper
- `Button` — submit, social buttons
- `Input` — email, password, name fields
- `Label` (need to add) — form field labels
- Icons from `lucide-react`: `Dumbbell`, `Eye`, `EyeOff`, `ShieldCheck`, `Lock`, `Users`, `CircleCheck`, `Circle`, `Loader2`

### Server vs Client Components
- `(auth)/layout.tsx` — Server component (just HTML wrapper, forces dark class)
- `(auth)/login/page.tsx` — Server component (renders LoginForm)
- `(auth)/signup/page.tsx` — Server component (renders SignupForm)
- All `features/auth/components/*` — Client components (use hooks, event handlers)
- `features/auth/hooks/*` — Client-only (React hooks)

### Token Management
- Store JWT in `localStorage` under key `auth_token`
- API client reads token from localStorage and sets `Authorization: Bearer <token>` header
- On mount, `useAuth` checks for existing token and validates via `GET /auth/me`
- On 401 response, clear token and redirect to login

### Protected Route
- `ProtectedRoute` wraps children, checks `isAuthenticated` from `useAuth()`
- Shows loading skeleton while checking auth
- Redirects to `/login` if not authenticated

### Env Configuration
- `NEXT_PUBLIC_API_URL` — API base URL (default `http://localhost:4000`)

## Dependencies to Install
- `zod` — schema validation for forms

## shadcn/ui Components to Add
- `label` — form labels (not yet installed)

## File Changes
| Action | File | Description |
|--------|------|-------------|
| Create | `features/auth/types.ts` | Auth types (User, AuthResponse, etc.) |
| Create | `features/auth/hooks/useAuth.ts` | Auth context + provider + hook |
| Create | `features/auth/hooks/useAuthForm.ts` | Form state + validation + submission |
| Create | `features/auth/hooks/usePasswordStrength.ts` | Password strength calculator |
| Create | `features/auth/components/AuthLayout.tsx` | Split-panel auth layout |
| Create | `features/auth/components/AuthHero.tsx` | Left decorative hero |
| Create | `features/auth/components/LoginForm.tsx` | Login form UI |
| Create | `features/auth/components/SignupForm.tsx` | Signup form UI |
| Create | `features/auth/components/PasswordStrength.tsx` | Strength indicator |
| Create | `features/auth/components/SocialButtons.tsx` | Google/Apple social buttons |
| Create | `features/auth/components/AuthProviderWrapper.tsx` | Client wrapper for provider |
| Create | `features/auth/index.ts` | Public exports |
| Create | `lib/api-client.ts` | API fetch wrapper |
| Create | `components/common/ProtectedRoute.tsx` | Auth guard component |
| Create | `app/(auth)/layout.tsx` | Auth route group layout |
| Create | `app/(auth)/login/page.tsx` | Login page |
| Create | `app/(auth)/signup/page.tsx` | Signup page |
| Modify | `app/layout.tsx` | Wrap with AuthProvider |

## Key Decisions
- localStorage for JWT (simpler for MVP, task spec allows it)
- Dark mode forced on auth pages via `dark` class on html element
- Social login buttons are UI-only for MVP (no OAuth implementation)
- Forgot password link is present but non-functional (optional per task spec)
- Form validation with zod schemas
- No refresh token — single JWT with 7d expiry
- API client as simple fetch wrapper (no axios needed)
