import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton loading placeholder — dùng khi đang fetch data.
 */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200",
        className
      )}
    />
  );
}

/**
 * Skeleton cho card — hiển thị placeholder toàn card
 */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

/**
 * Skeleton cho table row
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex gap-4 p-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}
