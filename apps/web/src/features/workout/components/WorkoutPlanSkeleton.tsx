import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export function WorkoutPlanSkeleton() {
  return (
    <div className="flex h-[100dvh] flex-col bg-m3-surface lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="min-h-0 flex-1 space-y-6 p-6 lg:p-8">
        {/* Header skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-64 bg-m3-surface-high" />
          <Skeleton className="h-2 w-full max-w-lg bg-m3-surface-high" />
        </div>

        {/* Two-panel skeleton */}
        <div className="flex gap-8">
          <div className="hidden w-[35%] space-y-3 lg:block">
            {SKELETON_DAYS.map((day) => (
              <Skeleton
                key={day}
                className="h-20 rounded-xl bg-m3-surface-low"
              />
            ))}
          </div>
          <div className="flex-1 lg:w-[65%]">
            <Skeleton className="h-[500px] rounded-3xl bg-m3-surface-high/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
