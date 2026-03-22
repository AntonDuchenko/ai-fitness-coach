import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkoutPlanSkeleton() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="min-h-0 flex-1 space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-2 w-full" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}
