"use client";

import React, { useState } from "react";
import {
  Plus,
  PiggyBank,
  AlertTriangle,
  TrendingDown,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { useBudgets } from "@/features/budget/hooks";
import type { Budget } from "@/features/budget/types";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import BudgetCard from "@/components/budget/BudgetCard";
import CreateEditBudgetModal from "@/components/budget/CreateEditBudgetModal";
import DeleteBudgetModal from "@/components/budget/DeleteBudgetModal";

export default function BudgetsPage() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth() + 1
  );

  const [isCreateEditOpen, setIsCreateEditOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingBudget, setDeletingBudget] = useState<Budget | null>(null);

  const {
    data: budgets,
    isLoading,
    error,
  } = useBudgets({
    year: selectedYear,
    month: selectedMonth,
  });

  const budgetList = budgets ?? [];

  // KPI calculations
  const totalBudgetAmount = budgetList.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );
  const totalSpentAmount = budgetList.reduce(
    (sum, b) => sum + Number(b.spentAmount || 0),
    0
  );
  const overallPercentage =
    totalBudgetAmount > 0
      ? Math.round((totalSpentAmount / totalBudgetAmount) * 100)
      : 0;

  const exceededCount = budgetList.filter(
    (b) => b.isOverBudget || (b.percentageSpent ?? 0) >= 100
  ).length;
  const warningCount = budgetList.filter(
    (b) => (b.percentageSpent ?? 0) >= 80 && (b.percentageSpent ?? 0) < 100
  ).length;

  const handleOpenCreate = () => {
    setEditingBudget(null);
    setIsCreateEditOpen(true);
  };

  const handleOpenEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsCreateEditOpen(true);
  };

  const handleOpenDelete = (budget: Budget) => {
    setDeletingBudget(budget);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Quản lý Ngân sách Tháng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Thiết lập hạn mức chi tiêu theo danh mục và theo dõi mức độ tuân thủ thời gian thực.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month / Year Filter Pickers */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-xs">
            <Calendar className="h-4 w-4 text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
            <span className="text-gray-300">/</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleOpenCreate} size="md" className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Thiết lập ngân sách
          </Button>
        </div>
      </div>

      {/* Exceeded Budget High-Priority Warning Alert */}
      {exceededCount > 0 && (
        <div className="flex items-center gap-3.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-xs">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Cảnh báo: Đã có {exceededCount} danh mục chi tiêu vượt hạn mức!</p>
            <p className="text-xs text-red-600 mt-0.5">
              Vui lòng xem lại các khoản chi thực tế trong tháng {selectedMonth}/{selectedYear} để kiểm soát dòng tiền kịp thời.
            </p>
          </div>
        </div>
      )}

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Tổng Ngân sách
            </p>
            <PiggyBank className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-xl font-bold font-mono text-gray-900">
            {formatCurrency(totalBudgetAmount)}
          </p>
          <p className="mt-1 text-xs text-gray-400">Hạn mức kế hoạch tháng</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Đã chi tiêu
            </p>
            <TrendingDown className="h-5 w-5 text-rose-600" />
          </div>
          <p className="mt-2 text-xl font-bold font-mono text-rose-600">
            {formatCurrency(totalSpentAmount)}
          </p>
          <p className="mt-1 text-xs text-gray-400">Chi tiêu thực tế ghi nhận</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Tỷ lệ hoàn thành
            </p>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </div>
          <p
            className={`mt-2 text-xl font-bold font-mono ${
              overallPercentage > 100
                ? "text-red-600"
                : overallPercentage >= 80
                ? "text-amber-600"
                : "text-emerald-600"
            }`}
          >
            {overallPercentage}%
          </p>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${
                overallPercentage > 100
                  ? "bg-red-600"
                  : overallPercentage >= 80
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Trạng thái cảnh báo
            </p>
            <Layers className="h-5 w-5 text-purple-600" />
          </div>
          <p className="mt-2 text-xl font-bold font-mono text-gray-900">
            {exceededCount} Vượt / {warningCount} Gần chạm
          </p>
          <p className="mt-1 text-xs text-gray-400">Tổng cộng {budgetList.length} danh mục</p>
        </div>
      </div>

      {/* Main Grid: Budget Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          Không thể tải danh sách ngân sách. Vui lòng thử lại sau.
        </div>
      ) : budgetList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
            <PiggyBank className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Chưa có ngân sách cho Tháng {selectedMonth}/{selectedYear}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-gray-500">
            Thiết lập ngân sách giúp bạn kiểm soát chi tiêu các nhóm thiết yếu như Ăn uống, Nhà ở, Mua sắm hiệu quả hơn.
          </p>
          <Button onClick={handleOpenCreate} className="mt-6 gap-2">
            <Plus className="h-4 w-4" />
            Thiết lập ngân sách đầu tiên
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {budgetList.map((b) => (
            <BudgetCard
              key={b.id}
              budget={b}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateEditBudgetModal
        isOpen={isCreateEditOpen}
        onClose={() => setIsCreateEditOpen(false)}
        budgetToEdit={editingBudget}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />

      <DeleteBudgetModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingBudget(null);
        }}
        budget={deletingBudget}
      />
    </div>
  );
}
