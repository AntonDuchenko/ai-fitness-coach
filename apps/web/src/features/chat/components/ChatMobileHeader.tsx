"use client";

import { cn } from "@/lib/utils";
import { Menu, Zap } from "lucide-react";

interface ChatMobileHeaderProps {
  title: string;
  usageCompact: string | null;
  isLimitReached: boolean;
  onOpenMenu: () => void;
  userInitials: string;
}

export function ChatMobileHeader({
  title,
  usageCompact,
  isLimitReached,
  onOpenMenu,
  userInitials,
}: ChatMobileHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-m3-surface px-4 py-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="-ml-1 rounded-lg p-2 text-m3-on-surface transition-opacity hover:opacity-80 active:scale-95"
          aria-label="Open menu"
          onClick={onOpenMenu}
        >
          <Menu className="size-5" />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold tracking-tight text-m3-on-surface">
              {title}
            </span>
            <span
              className="size-2 rounded-full bg-m3-secondary shadow-[0_0_8px_rgba(74,225,118,0.5)]"
              aria-hidden
            />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-m3-outline">
            Online Mentor
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {usageCompact ? (
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-m3-outline-variant/15 px-3 py-1.5",
              isLimitReached
                ? "bg-m3-error-container/20 text-m3-error"
                : "bg-m3-surface-high text-m3-on-surface",
            )}
          >
            <Zap className="size-3.5 text-m3-primary" aria-hidden />
            <span className="text-xs font-semibold tracking-wide">
              {usageCompact}
            </span>
          </div>
        ) : null}
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-m3-primary-container text-xs font-bold text-m3-on-primary-container">
          {userInitials}
        </div>
      </div>
    </header>
  );
}
