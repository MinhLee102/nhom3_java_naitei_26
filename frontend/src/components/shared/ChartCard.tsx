import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * ChartCard — wrapper cho biểu đồ trên Dashboard/Report.
 * Đảm bảo mọi biểu đồ có title + khung nhất quán.
 */
export default function ChartCard({
  title,
  children,
  action,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
