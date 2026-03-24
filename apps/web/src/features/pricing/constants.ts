import type { PricingPlan } from "./types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "forever",
    badge: "FREE FOREVER",
    monthlyLabel: "$0",
    features: [
      "5 AI messages per day",
      "Basic workout plan",
      "Calorie calculator",
      "Progress tracking",
    ],
    excludedFeatures: [
      "Unlimited AI chat",
      "Advanced nutrition",
      "Recipe generator",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "per month or $200/year",
    badge: "MOST POPULAR",
    monthlyLabel: "$20/mo",
    annualLabel: "$200/year",
    highlighted: true,
    features: [
      "Unlimited AI messages",
      "Advanced workout plans",
      "Complete nutrition plans",
      "Unlimited recipes",
      "Meal prep planner",
      "Advanced analytics",
      "Priority support (24h)",
      "Progress photos",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Contact us for enterprise pricing",
    badge: "FOR TEAMS",
    monthlyLabel: "Custom",
    features: [
      "All Premium features",
      "Team management",
      "Bulk billing",
      "Custom integration",
      "Dedicated support",
      "Analytics dashboard",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Can I switch between monthly and annual billing later?",
    answer:
      "Yes. You can change billing interval any time in Stripe Customer Portal.",
  },
  {
    question: "Do I need a credit card for the free plan?",
    answer:
      "No. Free plan starts immediately and does not require payment details.",
  },
  {
    question: "What happens when I hit free plan limits?",
    answer:
      "You can continue using free features tomorrow or upgrade to Premium for unlimited access.",
  },
  {
    question: "Can I cancel Premium anytime?",
    answer:
      "Yes. Cancellation is self-serve and your access remains until the end of the paid period.",
  },
];
