import { LandingPage } from "@/features/landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ForgeFit — Your AI Trainer, Always On",
  description:
    "Get personalized workout plans, nutrition guidance, and 24/7 expert advice for $20/month instead of $400. Join 50,000+ people transforming their lives.",
  openGraph: {
    title: "ForgeFit — Your AI Trainer, Always On",
    description:
      "Personalized workout plans, nutrition guidance, and 24/7 AI coaching. Start your free trial today.",
    type: "website",
  },
};

export default function Home() {
  return <LandingPage />;
}
