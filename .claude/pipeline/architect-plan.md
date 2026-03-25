# Architect Plan: ForgeFit Landing Page from Stitch

## Overview
Replace the current landing page with the new "Human-Centered" design from Stitch. The design features real people photography, a bento-grid solution section, glassmorphic floating cards, and a new FAQ section.

## Sections (10 components + LandingPage wrapper)

### Existing components to REWRITE:
1. **Navbar** — Fixed glassmorphic nav, mobile hamburger menu support
2. **HeroSection** — Hero photo + floating glass stat cards + avatar stack
3. **StatsBar** — 4 stats with Material Symbols icons (use lucide equivalents)
4. **ProblemSection** — 3 cards on dark gradient bg
5. **SolutionSection** → rename to **BentoGridSection** — Light bg bento grid with images
6. **HowItWorksSection** — 3 numbered steps on white bg with connecting line
7. **TestimonialsSection** — 3 testimonial cards with photos on white bg
8. **PricingSection** — 3 tiers on dark bg with glow on featured card
9. **FinalCTASection** — Blue bg, avatar photos, big CTA
10. **Footer** — 4-column dark footer

### NEW components:
11. **FAQSection** — Accordion FAQ between Pricing and Final CTA

### Components to KEEP as-is:
- `AnimatedSection` — reuse for scroll animations
- `SectionTitle` — reuse where applicable
- `BrandLogo` — used in Navbar and Footer

### Components to DELETE:
- `FeaturesSection` — replaced by BentoGridSection
- Feature-specific icons from constants (replaced by bento images)

## Constants Update (`constants.ts`)
Update all data arrays to match Stitch content:
- `heroStats` → new values (84K+, 2.9M, 99.2%, 4.96★)
- `problemCards` → new titles/descriptions matching Stitch
- `solutionCards` → replaced by `bentoItems` with Stitch image URLs
- `steps` → 3 steps matching Stitch (Tell Us Your Goals, AI Creates Plan, Start Training)
- `testimonials` → 3 new testimonials with photo URLs from Stitch
- `pricingPlans` → updated features list matching Stitch
- NEW: `faqItems` — 6 FAQ questions from Stitch

## Image Strategy
- Hero image and avatar photos: use external Stitch URLs via `next/image` with `unoptimized` prop
- Bento grid images: use external Stitch URLs
- Configure `next.config` `images.remotePatterns` for `lh3.googleusercontent.com`

## Component Size Compliance
All components must stay under ~150 lines. The BentoGridSection may need splitting into `BentoCard` subcomponent.

## File Changes
```
MODIFY: apps/web/src/features/landing/constants.ts
MODIFY: apps/web/src/features/landing/components/LandingPage.tsx
MODIFY: apps/web/src/features/landing/components/Navbar.tsx
MODIFY: apps/web/src/features/landing/components/HeroSection.tsx
MODIFY: apps/web/src/features/landing/components/StatsBar.tsx
MODIFY: apps/web/src/features/landing/components/ProblemSection.tsx
MODIFY: apps/web/src/features/landing/components/HowItWorksSection.tsx
MODIFY: apps/web/src/features/landing/components/TestimonialsSection.tsx
MODIFY: apps/web/src/features/landing/components/PricingSection.tsx
MODIFY: apps/web/src/features/landing/components/FinalCTASection.tsx
MODIFY: apps/web/src/features/landing/components/Footer.tsx
RENAME: SolutionSection.tsx → BentoGridSection.tsx
DELETE: FeaturesSection.tsx
CREATE: apps/web/src/features/landing/components/FAQSection.tsx
CREATE: apps/web/src/features/landing/components/BentoCard.tsx (if needed)
MODIFY: apps/web/next.config.mjs (add remote image patterns)
```
