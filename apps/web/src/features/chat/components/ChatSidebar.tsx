"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dumbbell, LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChatSidebarProps {
  conversationTitle: string;
  hasMessages: boolean;
  userInitials: string;
  displayName: string;
  planLabel: string;
  onNewChat: () => void;
  className?: string;
}

export function ChatSidebar({
  conversationTitle,
  hasMessages,
  userInitials,
  displayName,
  planLabel,
  onNewChat,
  className,
}: ChatSidebarProps) {
  const pathname = usePathname();

  const appNav = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  ] as const;

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
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="ml-auto rounded-lg border-0 bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
          aria-label="New chat"
          onClick={onNewChat}
          disabled={!hasMessages}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="h-px w-full bg-sidebar-border" />
      <nav
        className="flex flex-col gap-1 px-2 py-2"
        aria-label="App navigation"
      >
        {appNav.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard/workouts"
              ? pathname?.startsWith("/dashboard/workouts")
              : pathname === "/dashboard" || pathname === "/dashboard/";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-11 items-center gap-2 rounded-lg px-3 text-[13px] transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="h-px w-full bg-sidebar-border" />
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 py-3">
        {hasMessages ? (
          <div
            className={cn(
              "flex h-11 items-center rounded-lg bg-sidebar-accent px-3 text-[13px] text-sidebar-foreground",
            )}
          >
            <span className="truncate">{conversationTitle}</span>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-6 text-center text-[13px] text-muted-foreground">
            No conversations yet
          </div>
        )}
      </div>
      <div className="h-px w-full bg-sidebar-border" />
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {userInitials}
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
