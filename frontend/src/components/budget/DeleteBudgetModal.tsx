"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { Budget } from "@/features/budget/types";
import { useDeleteBudget } from "@/features/budget/hooks";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: Budget | null;
}

export default function DeleteBudgetModal({
  isOpen,
  onClose,
  budget,
}: DeleteBudgetModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const deleteMutation = useDeleteBudget();

  if (!isOpen || !budget) return null;

  const handleDelete = async () => {
    setErrorMsg("");
    try {
      await deleteMutation.mutateAsync(budget.id);
      onClose();
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || "Đã xảy ra lỗi khi xóa ngân sách."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100 text-center">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Warning Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Xóa ngân sách danh mục
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Bạn có chắc chắn muốn xóa ngân sách cho danh mục{" "}
          <strong className="text-gray-800">{budget.categoryName}</strong> (Hạn mức:{" "}
          {formatCurrency(budget.amount)}) trong tháng {budget.month}/{budget.year}?
        </p>

        {errorMsg && (
          <p className="text-xs text-red-600 mb-4 bg-red-50 p-2 rounded-lg">
            {errorMsg}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="w-full"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xác nhận xóa"}
          </Button>
        </div>
      </div>
    </div>
  );
}
