"use client";

import Link from "next/link";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Calendar,
} from "lucide-react";
import { useDashboardSummary } from "@/features/dashboard/hooks";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import CategorySpendingChart from "@/components/dashboard/CategorySpendingChart";

export default function DashboardPage() {
  const { data: summary, isLoading, error } = useDashboardSummary();

  const currentMonthName = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Tổng quan Tài chính
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              <Calendar className="h-3 w-3" />
              {currentMonthName}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Theo dõi dòng tiền, thu chi và tiến độ ngân sách của bạn trong thời gian thực.
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3">
          <Link href="/expenses">
            <Button size="md" className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Thêm chi tiêu
            </Button>
          </Link>
        </div>
      </div>

      {/* Financial KPI Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Chi tiêu tháng này */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Chi tiêu tháng này
                </p>
                <p className="mt-2 text-2xl font-bold font-mono text-gray-900">
                  {formatCurrency(summary?.currentMonthExpense ?? 0)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Kỳ hiện tại:</span>
              <span>{currentMonthName}</span>
            </div>
          </div>

          {/* Card 2: Tổng thu nhập */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tổng thu nhập
                </p>
                <p className="mt-2 text-2xl font-bold font-mono text-emerald-600">
                  {formatCurrency(summary?.totalIncome ?? 0)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Dòng tiền vào tích lũy</span>
            </div>
          </div>

          {/* Card 3: Tổng chi tiêu tích lũy */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tổng chi tiêu
                </p>
                <p className="mt-2 text-2xl font-bold font-mono text-rose-600">
                  {formatCurrency(summary?.totalExpense ?? 0)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-rose-600 font-medium">
              <ArrowDownRight className="h-3.5 w-3.5" />
              <span>Dòng tiền ra tích lũy</span>
            </div>
          </div>

          {/* Card 4: Số dư khả dụng */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Số dư còn lại
                </p>
                <p
                  className={`mt-2 text-2xl font-bold font-mono ${
                    (summary?.remainingBalance ?? 0) >= 0
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(summary?.remainingBalance ?? 0)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <PiggyBank className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Trạng thái:</span>
              <span
                className={`font-semibold ${
                  (summary?.remainingBalance ?? 0) >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {(summary?.remainingBalance ?? 0) >= 0 ? "Dương khả dụng" : "Thâm hụt"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/incomes"
          className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Quản lý Thu nhập</p>
              <p className="text-xs text-gray-500">Ghi nhận các nguồn thu mới</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>

        <Link
          href="/budgets"
          className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ngân sách tháng</p>
              <p className="text-xs text-gray-500">Xem cảnh báo hạn mức chi</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>

        <Link
          href="/categories"
          className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Danh mục thu chi</p>
              <p className="text-xs text-gray-500">Tùy chỉnh nhóm chi tiêu</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>
      </div>

      {/* Category Breakdown Chart Section */}
      <div id="category-chart-container">
        <CategorySpendingChart />
      </div>
    </div>
  );
}
