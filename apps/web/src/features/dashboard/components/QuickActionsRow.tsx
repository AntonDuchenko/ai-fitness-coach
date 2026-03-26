import {
  ClipboardList,
  CreditCard,
  LineChart,
  MessageSquare,
  Utensils,
} from "lucide-react";
import Link from "next/link";

const actions = [
  { href: "/dashboard/workouts", icon: ClipboardList, label: "Workout Plan" },
  { href: "/dashboard/nutrition", icon: Utensils, label: "Nutrition" },
  { href: "/dashboard/progress", icon: LineChart, label: "Progress" },
  { href: "/chat", icon: MessageSquare, label: "AI Coach" },
  { href: "/dashboard/settings", icon: CreditCard, label: "Subscription" },
] as const;

export function QuickActionsRow() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-5" aria-label="Quick actions">
      {actions.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/40 p-8 transition-all hover:-translate-y-0.5 hover:bg-card hover:shadow-lg hover:shadow-primary/10"
        >
          <Icon
            className="size-8 text-muted-foreground transition-all group-hover:scale-110 group-hover:text-primary"
            aria-hidden
          />
          <span className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
            {label}
          </span>
        </Link>
      ))}
    </section>
  );
}
