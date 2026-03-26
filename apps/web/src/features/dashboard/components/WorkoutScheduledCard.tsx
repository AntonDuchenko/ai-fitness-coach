import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { WorkoutDaySchedule } from "@/features/workout/types";
import { Clock, Play } from "lucide-react";

interface WorkoutScheduledCardProps {
  workout: WorkoutDaySchedule;
  onStart: () => void;
}

export function WorkoutScheduledCard({ workout, onStart }: WorkoutScheduledCardProps) {
  const muscles = [
    ...new Set(workout.exercises.map((e) => e.muscleGroup).filter(Boolean)),
  ];

  return (
    <Card className="border-0 rounded-2xl">
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1.5 flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Next Up
              </Badge>
              {workout.duration && (
                <Badge variant="outline" className="gap-1">
                  <Clock className="size-3" aria-hidden />~{workout.duration} min
                </Badge>
              )}
            </div>
            <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-foreground lg:text-4xl">
              {workout.focus}
            </h3>
            {muscles.length > 0 && (
              <div className="mt-3 flex gap-2">
                {muscles.map((m) => (
                  <Badge key={m} variant="outline" className="text-xs font-semibold">
                    {m}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button
            size="lg"
            className="gap-3 px-8 py-4 text-base font-bold shadow-lg shadow-primary/25"
            onClick={onStart}
          >
            <Play className="size-5" aria-hidden />
            Start Workout
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background/30">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Order
                </th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Exercise Name
                </th>
                <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Target (Sets x Reps)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workout.exercises.map((ex, i) => (
                <tr
                  key={`${ex.name}-${i}`}
                  className="transition-colors hover:bg-muted/20"
                >
                  <td className="px-6 py-3.5 text-sm font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-3.5 text-base font-semibold">
                    {ex.name}
                  </td>
                  <td className="px-6 py-3.5 text-right font-heading text-lg font-bold text-primary">
                    {ex.sets} x {ex.reps}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
