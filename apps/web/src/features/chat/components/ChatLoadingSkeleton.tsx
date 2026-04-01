import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="size-8 shrink-0 rounded-lg" />
        <Skeleton className="h-28 w-full max-w-xl rounded-2xl rounded-tl-none" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-20 w-2/3 max-w-md rounded-2xl rounded-tr-none" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="size-8 shrink-0 rounded-lg" />
        <Skeleton className="h-36 w-full max-w-xl rounded-2xl rounded-tl-none" />
      </div>
    </div>
  );
}
