import { Bell } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const initials = userName
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-5 backdrop-blur-xl lg:px-10">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground">
          {getGreeting()}, {userName}
        </h2>
        <p className="text-sm text-muted-foreground">Today is {formatDate()}</p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/settings"
          className="relative rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full border-2 border-background bg-success" />
        </Link>
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
      </div>
    </header>
  );
}
