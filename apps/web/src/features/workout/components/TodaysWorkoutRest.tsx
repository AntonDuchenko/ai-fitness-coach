import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Moon } from "lucide-react";
import Link from "next/link";

export function TodaysWorkoutRest() {
  return (
    <Card
      className={cn(
        "flex min-h-[320px] flex-col border-2 border-success/50 bg-card shadow-sm",
      )}
    >
      <CardHeader className="gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-success/15 text-success">
            <Moon className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Today
            </p>
            <CardTitle className="font-heading text-lg">
              Rest & recovery
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Recovery day — no session scheduled
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Tips</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Stay hydrated</li>
          <li>Light walk or mobility work</li>
          <li>Prioritize sleep tonight</li>
        </ul>
      </CardContent>
      <CardFooter className="mt-auto justify-end border-t border-border pt-6">
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard/workouts">View week plan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
