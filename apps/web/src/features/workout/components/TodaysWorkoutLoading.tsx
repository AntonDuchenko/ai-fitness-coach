import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TodaysWorkoutLoading() {
  return (
    <Card className="min-h-[320px] border-border">
      <CardHeader className="gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="justify-end border-t border-border pt-6">
        <Skeleton className="h-10 w-36" />
      </CardFooter>
    </Card>
  );
}
