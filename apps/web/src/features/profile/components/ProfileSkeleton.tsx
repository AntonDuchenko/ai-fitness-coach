import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 lg:space-y-8">
      {/* Header skeleton */}
      <div className="rounded-[2rem] bg-m3-surface-low p-6 lg:flex lg:items-end lg:gap-8 lg:p-8">
        <Skeleton className="mx-auto size-24 rounded-full lg:mx-0 lg:size-32 lg:rounded-3xl" />
        <div className="mt-4 space-y-2 text-center lg:mt-0 lg:text-left">
          <Skeleton className="mx-auto h-8 w-48 lg:mx-0" />
          <Skeleton className="mx-auto h-4 w-36 lg:mx-0" />
          <Skeleton className="mx-auto h-3 w-44 lg:mx-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-[24px]" />
        <Skeleton className="h-64 rounded-[24px]" />
        <Skeleton className="h-48 rounded-[24px]" />
        <Skeleton className="h-48 rounded-[24px]" />
      </div>

      <Skeleton className="h-24 rounded-[24px]" />
    </div>
  );
}
