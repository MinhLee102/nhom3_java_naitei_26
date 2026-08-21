"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDashboardExpenseByCategory } from "@/features/dashboard/hooks";
import { formatCurrency } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";
import { AlertCircle, PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "#004ac6", // Blue primary
  "#2563eb", // Blue container
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#64748b", // Slate
];

export default function CategorySpendingChart() {
  const { data: categoryExpenses, isLoading, error, refetch } =
    useDashboardExpenseByCategory();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 flex justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
          <div className="md:col-span-6 space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-2" />
        <p className="text-sm font-semibold text-red-800">
          Không thể tải biểu đồ phân bổ chi tiêu
        </p>
        <p className="mt-1 text-xs text-red-600">
          Đã xảy ra lỗi khi kết nối với máy chủ.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const data = categoryExpenses ?? [];
  const totalAmount = data.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0
  );

  if (data.length === 0 || totalAmount === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Chi tiêu theo Danh mục
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Phân bổ tỷ trọng các khoản chi trong hệ thống
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-gray-600 rounded-lg self-start sm:self-auto">
            Phân tích tỷ trọng
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-3">
            <PieChartIcon className="h-7 w-7" />
          </div>
          <p className="text-base font-semibold text-gray-800">
            Chưa có giao dịch chi tiêu nào
          </p>
          <p className="mt-1 text-xs text-gray-500 max-w-sm">
            Hãy bắt đầu ghi nhận các khoản chi tiêu để biểu đồ phân bổ tự động hiển thị tại đây.
          </p>
        </div>
      </div>
    );
  }

  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Chi tiêu theo Danh mục
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Rê chuột vào từng phần biểu đồ để xem chi tiết số tiền chi tiêu
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-gray-600 rounded-lg self-start sm:self-auto">
          Phân tích tỷ trọng
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Interactive Donut Chart */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-64 h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={() => null} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={96}
                  paddingAngle={3}
                  dataKey="totalAmount"
                  nameKey="categoryName"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="cursor-pointer transition-all duration-300 outline-none"
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.4
                      }
                      strokeWidth={activeIndex === index ? 3 : 1}
                      stroke={activeIndex === index ? "#ffffff" : "transparent"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Display Box */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
              <span className="text-xs font-semibold text-gray-500 truncate max-w-[130px]">
                {activeItem ? activeItem.categoryName : "Tổng Chi tiêu"}
              </span>
              <span className="text-lg font-bold font-mono text-gray-900 mt-0.5">
                {formatCurrency(
                  activeItem ? activeItem.totalAmount : totalAmount
                )}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold mt-0.5">
                {activeItem
                  ? `${activeItem.percentage ?? 0}% tổng chi`
                  : "Rê chuột xem danh mục"}
              </span>
            </div>
          </div>
        </div>

        {/* Legend / Breakdown List */}
        <div className="md:col-span-6 flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-1">
            <span>Danh mục</span>
            <span>Tỷ trọng (%)</span>
          </div>

          {data.map((item, index) => {
            const color = COLORS[index % COLORS.length];
            const isHovered = activeIndex === index;

            return (
              <div
                key={item.categoryId}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? "bg-blue-50/70 border-blue-300 shadow-xs"
                    : "bg-slate-50/70 border-gray-100 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {item.categoryName}
                    </p>
                    <p className="text-[11px] font-mono text-gray-500">
                      {formatCurrency(item.totalAmount)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono px-2.5 py-1 bg-white border border-gray-200 text-gray-800 rounded-lg flex-shrink-0">
                  {item.percentage ?? 0}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
