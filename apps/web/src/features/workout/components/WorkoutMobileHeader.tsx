"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface WorkoutMobileHeaderProps {
  onOpenMenu: () => void;
  /** Defaults to "Workouts" */
  title?: string;
}

export function WorkoutMobileHeader({
  onOpenMenu,
  title = "Workouts",
}: WorkoutMobileHeaderProps) {
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
    </header>
  );
}
