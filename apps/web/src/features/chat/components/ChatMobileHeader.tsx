"use client";

import { cn } from "@/lib/utils";
import { Menu, Settings } from "lucide-react";

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
          <span className={cn(
            "text-[10px] font-medium uppercase tracking-wider",
            isLimitReached ? "text-m3-error" : "text-m3-outline",
          )}>
            {usageCompact ?? "Always Active"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-m3-primary-container text-xs font-bold text-m3-on-primary-container">
          {userInitials}
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-m3-outline transition-colors hover:text-m3-on-surface"
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </button>
      </div>
    </header>
  );
}
