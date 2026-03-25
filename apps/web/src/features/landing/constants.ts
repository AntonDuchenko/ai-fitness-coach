import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  ChartColumnBig,
  ClipboardList,
  Dumbbell,
  MessageCircle,
  Salad,
  Sparkles,
  Target,
} from "lucide-react";

export const navItems = ["Features", "How It Works", "Pricing", "Blog"];

export const heroStats = [
  { value: "50K+", label: "ACTIVE USERS", icon: Dumbbell },
  { value: "2.4M", label: "WORKOUTS COMPLETED", icon: ChartColumnBig },
  { value: "98%", label: "SATISFACTION RATE", icon: Sparkles },
  { value: "4.9", label: "APP STORE RATING", icon: Sparkles },
] satisfies { value: string; label: string; icon: LucideIcon }[];

export const problemCards = [
  {
    title: "Trainers Cost a Fortune",
    description:
      "The average personal trainer charges $60-100 per session. At 4x per week that's over $1,600 a month - most people simply can't afford it.",
    metric: "$400+",
    metricLabel: "avg. monthly cost",
  },
  {
    title: "Generic Plans Yield Zero Results",
    description:
      "One-size-fits-all programs ignore your body type, injuries, schedule, and goals. Without real personalization, progress stalls and motivation dies.",
    metric: "73%",
    metricLabel: "quit within 6 weeks",
  },
  {
    title: "No Support When You Need It Most",
    description:
      "Stuck on form? Hit a plateau? Your trainer isn't available 24/7. You're left guessing - risking injury and losing momentum.",
    metric: "0/24h",
    metricLabel: "real-time support",
  },
];

export const solutionStats = [
  { value: "60 sec", label: "to your first plan" },
  { value: "24/7", label: "coach availability" },
  { value: "100%", label: "personalized for you" },
];

export const solutionCards = [
  {
    badge: "WORKOUTS",
    title: "Personalized Training Plans",
    icon: Dumbbell,
    image: "/images/landing/bento-workouts.jpg",
  },
  {
    badge: "NUTRITION",
    title: "Custom Meal Plans",
    icon: Salad,
    image: "/images/landing/bento-nutrition.jpg",
  },
  {
    badge: "AI COACH",
    title: "24/7 Expert Advice",
    icon: Bot,
    image: "/images/landing/bento-chat.jpg",
  },
  {
    badge: "PROGRESS",
    title: "Track Your Transformation",
    icon: ChartColumnBig,
    image: "/images/landing/bento-progress.jpg",
  },
];

export const steps = [
  {
    step: "STEP 01",
    title: "Complete Your Profile",
    description:
      "Tell us your goals, fitness level, schedule, and available equipment. Takes just 5 minutes.",
    watermark: "01",
    icon: ClipboardList,
    image: "/images/landing/step-profile.jpg",
  },
  {
    step: "STEP 02",
    title: "AI Builds Your Plan",
    description:
      "Our AI analyzes your profile and generates a fully custom workout + nutrition plan in under 60 seconds.",
    watermark: "02",
    icon: Sparkles,
    image: "/images/landing/step-plan.jpg",
  },
  {
    step: "STEP 03",
    title: "Train & Chat Anytime",
    description:
      "Follow your plan, log workouts, and ask your AI coach anything - 24/7, no waiting, instant answers.",
    watermark: "03",
    icon: MessageCircle,
    image: "/images/landing/step-train.jpg",
  },
];

export const featureCards = [
  {
    title: "Smart Workout Generator",
    description:
      "AI creates progressive plans based on your goals, equipment, and schedule - updating automatically as you improve.",
    tag: "Strength · Cardio · HIIT",
    icon: Dumbbell,
  },
  {
    title: "Nutrition & Meal Planning",
    description:
      "Personalized meal plans with exact macros, recipes, and grocery lists. Adapts to your dietary preferences.",
    tag: "Macros · Recipes · Grocery",
    icon: Salad,
  },
  {
    title: "Real-Time Progress Tracking",
    description:
      "Log workouts, track strength gains, monitor weight trends, and watch your transformation with beautiful charts.",
    tag: "Charts · Logs · Milestones",
    icon: ChartColumnBig,
  },
  {
    title: "24/7 AI Coach Chat",
    description:
      "Ask anything, anytime. Form checks, plateau-busting, motivation - your coach never sleeps and always responds instantly.",
    tag: "Instant · Personal · 24/7",
    icon: Bot,
  },
  {
    title: "Adaptive Programming",
    description:
      "Plans evolve automatically based on your progress, injuries, and feedback. Always the right workout for your current state.",
    tag: "Smart · Flexible · Evolving",
    icon: Target,
  },
  {
    title: "Science-Backed Methods",
    description:
      "Every recommendation is rooted in peer-reviewed research and proven training principles. No bro-science, ever.",
    tag: "Research · Proven · Trusted",
    icon: Brain,
  },
];

export const pricingPlans = [
  {
    name: "FREE FOREVER",
    price: "$0",
    suffix: "forever",
    cta: "Get Started",
    featured: false,
    features: [
      "5 AI messages per day",
      "Basic workout plan",
      "Calorie calculator",
      "Progress tracking",
    ],
  },
  {
    name: "PREMIUM",
    price: "$19",
    suffix: "per month",
    cta: "Start Free Trial",
    featured: true,
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
    name: "FOR TEAMS",
    price: "$49",
    suffix: "per month · per user",
    cta: "Contact Sales",
    featured: false,
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

export const testimonials = [
  {
    result: "-15kg",
    quote:
      "I tried 5 fitness apps before this. Finally found one that works. My AI coach adjusted everything when I hit a plateau. Lost 15kg in 3 months.",
    author: "Alex Martinez",
    meta: "32 years old · 3 months",
  },
  {
    result: "+5kg",
    quote:
      "The AI coach understands context. When I mentioned shoulder pain, it adjusted my entire program instantly. Better than my old trainer.",
    author: "Sarah Kim",
    meta: "28 years old · 4 months",
  },
  {
    result: "+40%",
    quote:
      "Game changer for busy professionals. I train at odd hours and the AI is always there. No more waiting for trainer replies at 6am.",
    author: "Mike Rodriguez",
    meta: "35 years old · 6 months",
  },
];

export const footerColumns = [
  { title: "PRODUCT", items: ["Features", "Pricing", "FAQ", "Changelog"] },
  { title: "COMPANY", items: ["About", "Blog", "Careers", "Contact"] },
  {
    title: "LEGAL",
    items: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Disclaimer",
    ],
  },
];

