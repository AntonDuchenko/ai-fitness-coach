"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkoutMobileHeaderProps {
  /** "workout" renders Stitch-style fixed header; "generic" renders sidebar-style header */
  variant?: "workout" | "generic";
  title?: string;
  onOpenMenu?: () => void;
  onMoreClick?: () => void;
}

export function WorkoutMobileHeader({
  variant = "workout",
  title = "Workout Plan",
  onOpenMenu,
  onMoreClick,
}: WorkoutMobileHeaderProps) {
  const router = useRouter();

  if (variant === "generic") {
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

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-m3-surface px-6 py-4 lg:hidden">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full p-2 text-m3-primary-container transition-colors hover:bg-m3-surface-high active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-heading text-lg font-bold tracking-tight text-m3-on-surface">
          {title}
        </h1>
      </div>
      <button
        type="button"
        onClick={onMoreClick ?? onOpenMenu}
        className="rounded-full p-2 text-m3-primary-container transition-colors hover:bg-m3-surface-high active:scale-95"
        aria-label="More options"
      >
        <MoreVertical className="size-5" />
      </button>
    </header>
  );
}
