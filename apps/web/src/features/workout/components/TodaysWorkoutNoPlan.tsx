import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function TodaysWorkoutNoPlan() {
  return (
    <Card className="min-h-[320px] border-border">
      <CardHeader>
        <CardTitle className="font-heading text-lg">
          Today&apos;s workout
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate a plan to see your sessions and start training.
        </p>
      </CardHeader>
      <CardFooter className="justify-end border-t border-border pt-6">
        <Button type="button" asChild>
          <Link href="/dashboard/workouts">Create workout plan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
