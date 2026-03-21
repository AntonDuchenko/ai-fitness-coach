import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoadingSkeleton() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="flex gap-3">
        <Skeleton className="size-9 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Skeleton className="h-16 w-2/3 max-w-md rounded-xl" />
      </div>
    </div>
  );
}
