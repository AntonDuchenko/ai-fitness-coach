"use client";

import { cn } from "@/lib/utils";

interface ChatDesktopHeaderProps {
  title: string;
  usageLabel: string | null;
  isLimitReached: boolean;
}

export function ChatDesktopHeader({
  title,
  usageLabel,
  isLimitReached,
}: ChatDesktopHeaderProps) {
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-3 border-b border-border px-6">
      <div className="min-w-0 flex-1">
        <h1 className="font-heading text-base font-semibold tracking-tight">
          {title}
        </h1>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-success" aria-hidden />
          <span>AI Online</span>
        </div>
      </div>
      {usageLabel ? (
        <div
          className={cn(
            "shrink-0 rounded-2xl px-3 py-1.5 text-xs font-medium",
            isLimitReached
              ? "bg-secondary text-destructive"
              : "bg-secondary text-muted-foreground",
          )}
        >
          {usageLabel}
        </div>
      ) : null}
    </header>
  );
}
