import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WorkoutPlanEmpty() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-heading text-xl font-semibold">
          No workout plan yet
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Complete onboarding and generate a plan, or create one from your
          dashboard.
        </p>
        <Button asChild>
          <Link href="/onboarding">Go to onboarding</Link>
        </Button>
      </div>
    </div>
  );
}
