import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { MacroRing } from "./MacroRing";

interface DailyMacrosCardProps {
  targets: { calories: number; protein: number; carbs: number; fat: number } | null;
  totals: { calories: number; protein: number; carbs: number; fat: number } | null;
  isLoading: boolean;
}

export function DailyMacrosCard({ targets, totals, isLoading }: DailyMacrosCardProps) {
  if (isLoading) {
    return (
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="size-32 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!targets || !totals) {
    return (
      <Card className="flex min-h-[200px] items-center justify-center border-0 rounded-2xl">
        <p className="text-sm text-muted-foreground">No nutrition plan yet</p>
      </Card>
    );
  }

  return (
    <Card className="border-0 rounded-2xl">
      <CardHeader>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Nutrition Tracker
        </p>
        <CardTitle className="font-heading text-2xl">Daily Macros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          <MacroRing label="Calories" current={totals.calories} target={targets.calories} colorClass="stroke-primary" size="lg" />
          <MacroRing label="Protein" current={totals.protein} target={targets.protein} colorClass="stroke-success" />
          <MacroRing label="Carbs" current={totals.carbs} target={targets.carbs} colorClass="stroke-orange-500" />
          <MacroRing label="Fat" current={totals.fat} target={targets.fat} colorClass="stroke-purple-500" />
        </div>
        <Link
          href="/dashboard/nutrition"
          className="mt-6 block text-center text-sm font-bold text-primary hover:underline"
        >
          View Meal Plan
        </Link>
      </CardContent>
    </Card>
  );
}
