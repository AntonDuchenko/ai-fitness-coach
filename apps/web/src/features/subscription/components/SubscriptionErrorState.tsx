import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface SubscriptionErrorStateProps {
  onRetry: () => void;
}

export function SubscriptionErrorState({
  onRetry,
}: SubscriptionErrorStateProps) {
  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-destructive/30 bg-card py-0">
          <CardContent className="flex flex-col items-center gap-3 px-6 py-8 text-center">
            <AlertCircle className="size-8 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Could not load subscription details. Please refresh and try again.
            </p>
            <Button type="button" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
