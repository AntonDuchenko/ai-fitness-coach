"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STARTERS = [
  { icon: "💪", label: "Create a workout plan" },
  { icon: "🥗", label: "Plan my meals" },
  { icon: "📊", label: "Track my progress" },
  { icon: "🧘", label: "Recovery tips" },
] as const;

interface ChatEmptyStateProps {
  onPick: (text: string) => void;
  disabled?: boolean;
}

export function ChatEmptyState({ onPick, disabled }: ChatEmptyStateProps) {
  const row1 = STARTERS.slice(0, 2);
  const row2 = STARTERS.slice(2, 4);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 sm:px-20">
      <div className="flex size-[72px] items-center justify-center rounded-full bg-card">
        <span className="font-heading text-2xl font-bold text-primary">AI</span>
      </div>
      <div className="max-w-lg space-y-3 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-[28px]">
          Welcome to AI Pocket Trainer
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Your personal AI fitness coach is ready to help.
          <br className="hidden sm:block" /> Ask me about workouts, nutrition,
          or recovery.
        </p>
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <div className="flex flex-wrap justify-center gap-3">
          {row1.map((s) => (
            <StarterChip
              key={s.label}
              {...s}
              disabled={disabled}
              onPick={onPick}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {row2.map((s) => (
            <StarterChip
              key={s.label}
              {...s}
              disabled={disabled}
              onPick={onPick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarterChip({
  icon,
  label,
  onPick,
  disabled,
}: {
  icon: string;
  label: string;
  onPick: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      className={cn(
        "h-auto gap-2 rounded-[10px] border-border bg-card px-4 py-2.5 text-[13px] font-medium text-foreground hover:bg-accent",
      )}
      onClick={() => onPick(label)}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </Button>
  );
}
