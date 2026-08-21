"use client";

import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import type { Budget } from "@/features/budget/types";
import { useCreateBudget, useUpdateBudget } from "@/features/budget/hooks";
import { useCategories } from "@/features/category/hooks";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface CreateEditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetToEdit?: Budget | null;
  selectedYear: number;
  selectedMonth: number;
}

export default function CreateEditBudgetModal({
  isOpen,
  onClose,
  budgetToEdit,
  selectedYear,
  selectedMonth,
}: CreateEditBudgetModalProps) {
  const isEditing = !!budgetToEdit;

  const [categoryId, setCategoryId] = useState<number>(0);
  const [year, setYear] = useState<number>(selectedYear);
  const [month, setMonth] = useState<number>(selectedMonth);
  const [amount, setAmount] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const { data: categoryData } = useCategories();
  const createMutation = useCreateBudget();
  const updateMutation = useUpdateBudget();

  // Extract categories (handles array or paginated response)
  const categories = Array.isArray(categoryData)
    ? categoryData
    : (categoryData as any)?.content || [];

  // Filter only EXPENSE categories
  const expenseCategories = categories.filter(
    (c: any) => c.type === "EXPENSE" || !c.type
  );

  useEffect(() => {
    if (budgetToEdit) {
      setCategoryId(budgetToEdit.categoryId);
      setYear(budgetToEdit.year);
      setMonth(budgetToEdit.month);
      setAmount(budgetToEdit.amount.toString());
    } else {
      setCategoryId(expenseCategories[0]?.id ? Number(expenseCategories[0].id) : 1);
      setYear(selectedYear);
      setMonth(selectedMonth);
      setAmount("");
    }
    setFormError("");
  }, [budgetToEdit, isOpen, selectedYear, selectedMonth, expenseCategories.length]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (!parsedAmount || parsedAmount <= 0) {
      setFormError("Vui lòng nhập số tiền ngân sách hợp lệ (> 0)");
      return;
    }

    if (!categoryId) {
      setFormError("Vui lòng chọn danh mục chi tiêu");
      return;
    }

    try {
      if (isEditing && budgetToEdit) {
        await updateMutation.mutateAsync({
          id: budgetToEdit.id,
          data: {
            categoryId,
            year,
            month,
            amount: parsedAmount,
          },
        });
      } else {
        await createMutation.mutateAsync({
          categoryId,
          year,
          month,
          amount: parsedAmount,
        });
      }
      onClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Đã xảy ra lỗi khi lưu ngân sách. Vui lòng thử lại.";
      setFormError(msg);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            {isEditing ? "Chỉnh sửa Ngân sách" : "Thiết lập Ngân sách mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error alert */}
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Danh mục Chi tiêu
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              disabled={isEditing}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-100"
            >
              {expenseCategories.length > 0 ? (
                expenseCategories.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option value={1}>Ăn uống & Sinh hoạt</option>
              )}
            </select>
          </div>

          {/* Month & Year Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Tháng
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Năm
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {[2024, 2025, 2026, 2027].map((y) => (
                  <option key={y} value={y}>
                    Năm {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Hạn mức Ngân sách (VND)
            </label>
            <Input
              type="number"
              min="1000"
              step="1000"
              placeholder="VD: 5000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Đang lưu..."
                : isEditing
                ? "Lưu thay đổi"
                : "Tạo ngân sách"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
