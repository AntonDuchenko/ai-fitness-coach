# Architect Plan: Profile & Settings Page

## Overview
Implement the Profile & Settings page matching the Stitch design (desktop + mobile).
Replaces the current `/dashboard/settings` page which only shows SubscriptionManagement.

## Data Source
- **GET `/users/profile`** → ProfileResponseDto (all onboarding fields + calculated TDEE/BMR/macros)
- **Auth context** → user name, email, isPremium, createdAt
- **Subscription hook** → billing info, manage subscription action
- **Auth hook** → logout action

## Feature Structure
```
features/profile/
  types.ts
  hooks/useProfileQuery.ts
  hooks/useProfilePage.ts
  components/ProfileHeader.tsx
  components/PersonalInfoCard.tsx
  components/FitnessProfileCard.tsx
  components/NutritionCard.tsx
  components/DailyTargetsCard.tsx
  components/SubscriptionCard.tsx
  components/ProfileContent.tsx
  index.ts
```

## Route
- **Path:** `/dashboard/settings` (replaces current page)
- **Pattern:** ProtectedRoute → ProfileContent

## Component Details

### ProfileContent.tsx (~100 lines)
- Layout shell: DashboardSidebar (desktop) + WorkoutMobileHeader (mobile) + scrollable main
- Renders all section components in order
- Uses useProfilePage() hook for all data

### ProfileHeader.tsx (~50 lines)
- Large avatar with initials (rounded-3xl desktop, rounded-full mobile)
- Name (font-heading text-4xl), email, Premium badge, member since date
- Glow effect background

### PersonalInfoCard.tsx (~70 lines)
- Glass card with "Personal Information" heading
- Grid: Age, Gender, Height, Weight
- Target weight progress indicator (circular 45% ring)

### FitnessProfileCard.tsx (~70 lines)
- Glass card with "Fitness Profile" heading
- Primary goal, experience level badge, frequency
- Equipment chips

### NutritionCard.tsx (~60 lines)
- Glass card with "Nutrition" heading
- Meals/day and budget stats
- Cuisine preferences, dietary restrictions warning

### DailyTargetsCard.tsx (~60 lines)
- Primary-container background (blue accent card)
- Large calorie number, macros grid (protein/carbs/fats)
- BMR + TDEE footer

### SubscriptionCard.tsx (~40 lines)
- Glass card with credit card icon
- Billing date + price
- Manage Subscription button

### Hooks

**useProfileQuery.ts**
- `useQuery` calling `GET /users/profile`
- Returns: `{ profile, isLoading, isError, refetch }`

**useProfilePage.ts**
- Combines: useProfileQuery + useAuth + useSubscriptionManagement
- Returns all data needed by components
- Handles loading/error states

## Design Tokens (M3)
- Cards: `glass-card rounded-[24px]` (mobile) / `bg-m3-surface-high rounded-[1.5rem]` (desktop)
- Accent card: `bg-m3-primary-container text-m3-on-primary-container`
- Labels: `text-[10px] text-m3-outline uppercase tracking-widest`
- Headings: `font-heading font-bold text-m3-primary`
- Chips: `bg-m3-surface-lowest border border-m3-outline-variant/20 rounded-full`

## Sidebar Update
- Add "Profile" nav item or rename "Settings" to "Profile & Settings"
- Update active state detection for `/dashboard/settings`

## States
- **Loading:** Skeleton cards
- **Error:** Error message with retry
- **Success:** Full profile display
- **Empty:** Not possible (profile always exists after onboarding)
