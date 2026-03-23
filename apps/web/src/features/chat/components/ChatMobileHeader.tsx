"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";

interface ChatMobileHeaderProps {
  title: string;
  usageCompact: string | null;
  isLimitReached: boolean;
  onOpenMenu: () => void;
}

export function ChatMobileHeader({
  title,
  usageCompact,
  isLimitReached,
  onOpenMenu,
}: ChatMobileHeaderProps) {
  return (
    <header className="flex h-[60px] shrink-0 items-center gap-3 border-b border-border bg-sidebar px-4 lg:hidden">
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        className="rounded-lg border-0 bg-sidebar-accent text-sidebar-foreground"
        aria-label="Open menu"
        onClick={onOpenMenu}
      >
        <Menu className="size-4" />
      </Button>
      <div className="size-7 shrink-0 rounded-md bg-primary" aria-hidden />
      <span className="min-w-0 flex-1 truncate font-heading text-sm font-semibold">
        {title}
      </span>
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        className="shrink-0 rounded-lg border-0 bg-sidebar-accent text-sidebar-foreground"
        aria-label="Open dashboard"
        asChild
      >
        <Link href="/dashboard">
          <LayoutDashboard className="size-4" />
        </Link>
      </Button>
      {usageCompact ? (
        <div
          className={cn(
            "shrink-0 rounded-xl px-2.5 py-1 text-[11px] font-medium",
            isLimitReached
              ? "bg-secondary text-destructive"
              : "bg-secondary text-muted-foreground",
          )}
        >
          {usageCompact}
        </div>
      ) : null}
    </header>
  );
}
