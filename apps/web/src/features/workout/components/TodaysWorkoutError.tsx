import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TodaysWorkoutErrorProps {
  onRetry: () => void;
}

export function TodaysWorkoutError({ onRetry }: TodaysWorkoutErrorProps) {
  return (
    <Card className="min-h-[320px] border-destructive/40">
      <CardHeader>
        <CardTitle className="font-heading text-lg">
          Today&apos;s workout
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load today&apos;s session. Try again.
        </p>
      </CardHeader>
      <CardFooter className="justify-end border-t border-border pt-6">
        <Button type="button" variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      </CardFooter>
    </Card>
  );
}
