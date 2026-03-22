import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";

interface WorkoutPlanErrorProps {
  message: string;
  onRetry: () => void;
}

export function WorkoutPlanError({ message, onRetry }: WorkoutPlanErrorProps) {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-sm text-destructive">{message}</p>
        <Button type="button" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}
