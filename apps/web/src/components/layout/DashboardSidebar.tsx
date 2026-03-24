"use client";

import { useAuth } from "@/features/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/workouts", label: "Workouts" },
  { href: "/dashboard/nutrition", label: "Nutrition" },
  { href: "/dashboard/progress", label: "Progress" },
  { href: "/chat", label: "AI Chat" },
  { href: "/pricing", label: "Pricing" },
] as const;

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const initials =
    user?.name
      ?.split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ME";
  const displayName = user?.name?.trim() || "Member";
  const planLabel = user?.isPremium ? "Pro Plan" : "Free Plan";

  return (
    <aside
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex h-[72px] items-center gap-3 px-5">
        <div className="size-8 shrink-0 rounded-lg bg-primary" aria-hidden />
        <span className="font-heading text-[15px] font-semibold tracking-tight">
          AI Pocket Trainer
        </span>
      </div>
      <div className="h-px w-full bg-sidebar-border" />
      <nav className="flex flex-col gap-1 px-2 py-3" aria-label="Main">
        {nav.map(({ href, label }) => {
          const active =
            href === "/dashboard/workouts"
              ? pathname?.startsWith("/dashboard/workouts")
              : href === "/dashboard/progress"
                ? pathname?.startsWith("/dashboard/progress")
                : href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/dashboard/"
                  : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-11 items-center rounded-lg px-3 text-[13px] transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto h-px w-full bg-sidebar-border" />
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium">{displayName}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {planLabel}
          </p>
        </div>
      </div>
    </aside>
  );
}
