"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, Utensils } from "lucide-react";

const QUICK_ACTIONS = [
  {
    icon: Utensils,
    label: "Meal Ideas",
    prompt: "Give me some healthy meal ideas",
    colorClass: "bg-m3-primary/10 text-m3-primary",
  },
  {
    icon: TrendingUp,
    label: "Past Trends",
    prompt: "Show me my past workout trends",
    colorClass: "bg-m3-secondary/10 text-m3-secondary",
  },
] as const;

interface ChatQuickActionsProps {
  onPick: (text: string) => void;
  disabled?: boolean;
}

export function ChatQuickActions({ onPick, disabled }: ChatQuickActionsProps) {
  return (
    <div className="flex gap-3 px-4 py-3 lg:hidden">
      {QUICK_ACTIONS.map(({ icon: Icon, label, prompt, colorClass }) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          className="flex flex-1 items-center gap-3 rounded-2xl border border-white/5 bg-m3-surface-high p-4 text-left transition-colors hover:bg-m3-surface-highest disabled:opacity-50"
          onClick={() => onPick(prompt)}
        >
          <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", colorClass)}>
            <Icon className="size-5" aria-hidden />
          </div>
          <span className="text-sm font-bold text-m3-on-surface">{label}</span>
        </button>
      ))}
    </div>
  );
}
