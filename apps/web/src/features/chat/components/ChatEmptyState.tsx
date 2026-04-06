"use client";

import { cn } from "@/lib/utils";
import { Activity, Dumbbell, HeartPulse, Utensils } from "lucide-react";

const STARTERS = [
  {
    icon: Dumbbell,
    label: "Create a workout plan",
    subtitle: "Personalized routines based on your goals",
    colorClass: "bg-m3-primary/10 text-m3-primary group-hover:bg-m3-primary group-hover:text-white",
  },
  {
    icon: Utensils,
    label: "Plan my meals",
    subtitle: "Nutrition strategies tailored to your metabolism",
    colorClass: "bg-m3-secondary/10 text-m3-secondary group-hover:bg-m3-secondary group-hover:text-m3-surface",
  },
  {
    icon: Activity,
    label: "Track my progress",
    subtitle: "Visualize your gains and health metrics",
    colorClass: "bg-m3-tertiary/10 text-m3-tertiary group-hover:bg-m3-tertiary group-hover:text-m3-surface",
  },
  {
    icon: HeartPulse,
    label: "Recovery tips",
    subtitle: "Optimize rest and injury prevention",
    colorClass: "bg-m3-error/10 text-m3-error group-hover:bg-m3-error group-hover:text-white",
  },
] as const;

interface ChatEmptyStateProps {
  onPick: (text: string) => void;
  disabled?: boolean;
}

export function ChatEmptyState({ onPick, disabled }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
      {/* AI Badge */}
      <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-m3-primary-container to-m3-primary shadow-[0_0_50px_rgba(77,142,255,0.3)]">
        <span className="text-4xl font-black tracking-tighter text-white">
          AI
        </span>
      </div>

      {/* Heading */}
      <h3 className="mb-4 text-center font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Welcome to ForgeFit
      </h3>
      <p className="mb-10 max-w-md text-center text-m3-on-surface leading-relaxed sm:text-lg">
        Your personal AI fitness coach is ready to help you push boundaries
        and achieve your peak performance.
      </p>

      {/* Starter Prompt Grid */}
      <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
        {STARTERS.map(({ icon: Icon, label, subtitle, colorClass }) => (
          <button
            key={label}
            type="button"
            disabled={disabled}
            className={cn(
              "group flex items-start gap-4 rounded-2xl border border-white/5 bg-m3-surface-high p-5 text-left transition-all duration-300 hover:bg-m3-surface-highest disabled:opacity-50",
              "max-sm:flex-col max-sm:gap-3",
            )}
            onClick={() => onPick(label)}
          >
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:size-12",
                colorClass,
              )}
            >
              <Icon className="size-5 sm:size-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold text-white">
                {label}
              </p>
              <p className="mt-1 text-xs leading-snug text-m3-outline sm:text-sm">
                {subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
