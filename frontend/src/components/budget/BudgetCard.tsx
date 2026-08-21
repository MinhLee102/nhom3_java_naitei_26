"use client";

import React from "react";
import {
  Tag,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Edit2,
  Trash2,
} from "lucide-react";
import type { Budget } from "@/features/budget/types";
import { formatCurrency } from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percentage = budget.percentageSpent ?? 0;
  const isOver = budget.isOverBudget || percentage >= 100;
  const isWarning = percentage >= 80 && !isOver;

  // Determine progress bar & badge styling
  let progressColor = "bg-blue-600";
  let statusBadge = (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
      <CheckCircle2 className="h-3 w-3" />
      Đang kiểm soát
    </span>
  );

  if (isOver) {
    progressColor = "bg-red-600";
    statusBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/60 animate-pulse">
        <AlertOctagon className="h-3 w-3" />
        Vượt hạn mức
      </span>
    );
  } else if (isWarning) {
    progressColor = "bg-amber-500";
    statusBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
        <AlertTriangle className="h-3 w-3" />
        Cảnh báo ({Math.round(percentage)}%)
      </span>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                {budget.categoryName}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Tháng {budget.month}/{budget.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(budget)}
              title="Chỉnh sửa ngân sách"
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(budget)}
              title="Xóa ngân sách"
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">{statusBadge}</div>

        {/* Amounts */}
        <div className="space-y-1 mb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-gray-500 font-medium">Đã chi tiêu</span>
            <span className="text-sm font-bold font-mono text-gray-900">
              {formatCurrency(budget.spentAmount ?? 0)}
            </span>
          </div>
          <div className="flex items-baseline justify-between text-xs text-gray-400">
            <span>Hạn mức</span>
            <span className="font-mono">{formatCurrency(budget.amount)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-3">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Card Footer: Remaining / Over-spent calculation */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-500">
          {isOver ? "Số tiền vượt:" : "Số tiền còn lại:"}
        </span>
        <span
          className={`font-bold font-mono ${
            isOver ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {formatCurrency(Math.abs(budget.remainingAmount ?? 0))}
        </span>
      </div>
    </div>
  );
}
