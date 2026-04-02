"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { useAuth } from "@/features/auth";
import { cn } from "@/lib/utils";
import {
  Bot,
  Dumbbell,
  LayoutDashboard,
  LineChart,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: Utensils },
  { href: "/dashboard/progress", label: "Progress", icon: LineChart },
  { href: "/chat", label: "AI Coach", icon: Bot },
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
  const planLabel = user?.isPremium ? "Pro Member" : "Free Plan";

  return (
    <aside
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 pb-10 pt-8">
        <BrandLogo size={40} />
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tighter text-primary">
            ForgeFit
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            AI Fitness Coach
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-2 py-3" aria-label="Main">
        {nav.map(({ href, label, icon: Icon }) => {
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
                "flex h-11 items-center gap-3 rounded-lg px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200",
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-sidebar-border/50 pt-6">
        <Link
          href="/dashboard/settings"
          className={cn(
            "mx-2 flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200",
            pathname?.startsWith("/dashboard/settings")
              ? "bg-primary/10"
              : "hover:bg-secondary",
          )}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium">{displayName}</p>
            <p
              className={cn(
                "truncate text-[9px] font-bold uppercase tracking-widest",
                user?.isPremium ? "text-success" : "text-muted-foreground",
              )}
            >
              {planLabel}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
