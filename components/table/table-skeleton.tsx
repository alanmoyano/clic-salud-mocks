import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="h-12 w-full" key={index} />
      ))}
    </div>
  );
}
