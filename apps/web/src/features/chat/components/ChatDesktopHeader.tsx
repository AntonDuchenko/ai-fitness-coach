"use client";

import { cn } from "@/lib/utils";
import { Bot, LayoutDashboard, Settings, Zap } from "lucide-react";
import Link from "next/link";

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
    <header className="relative flex items-center justify-between bg-m3-surface/80 px-8 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-m3-surface-high">
          <Bot className="size-5 text-m3-primary" aria-hidden />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-bold text-white">
              {title}
            </h2>
            <span
              className="size-2 animate-pulse rounded-full bg-m3-secondary"
              aria-hidden
            />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-m3-outline">
            Always Active &bull; Ready to Evolve
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {usageLabel ? (
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5",
              isLimitReached
                ? "bg-m3-error-container/20 text-m3-error"
                : "bg-m3-surface-high text-m3-on-surface",
            )}
          >
            <Zap className="size-3.5" aria-hidden />
            <span className="text-xs font-bold tracking-tight">
              {usageLabel}
            </span>
          </div>
        ) : null}
        <button
          type="button"
          className="rounded-full p-2 text-m3-outline transition-all hover:bg-white/5 active:opacity-70"
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </button>
        <Link
          href="/dashboard"
          className="rounded-full p-2 text-m3-outline transition-all hover:bg-white/5 active:opacity-70"
          aria-label="Dashboard"
        >
          <LayoutDashboard className="size-5" />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-m3-surface-low" />
    </header>
  );
}
