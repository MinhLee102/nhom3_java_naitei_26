"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import ExpensePaginationSummary from "@/features/expense/components/ExpensePaginationSummary";
import ExpenseTable from "@/features/expense/components/ExpenseTable";
import { useExpenses } from "@/features/expense/hooks";

const PAGE_SIZE = 10;
const DEFAULT_SORT = "date,desc";

/**
 * Trang danh sách Chi tiêu.
 * Bảng danh sách + phân trang (#98960). Filter/tìm kiếm ở #98961, thêm/sửa ở #98962.
 */
export default function ExpensesPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useExpenses({
    page,
    size: PAGE_SIZE,
    sort: DEFAULT_SORT,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiêu</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý các khoản chi tiêu của bạn</p>
        </div>
        <Button disabled title="Sắp có ở chức năng thêm/sửa chi tiêu">
          <Plus className="h-4 w-4" />
          Thêm chi tiêu
        </Button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {isError ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertCircle className="h-9 w-9 text-red-500" aria-hidden="true" />
            <p className="font-medium text-gray-900">Không thể tải danh sách chi tiêu</p>
            <p className="text-sm text-gray-500">Vui lòng kiểm tra kết nối và thử lại.</p>
            <Button variant="outline" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        ) : (
          <>
            <ExpenseTable
              expenses={data?.items ?? []}
              isLoading={isLoading}
              onRowClick={(expense) => router.push(`/expenses/${expense.id}`)}
            />

            {!isLoading && data && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/60 px-6 py-4 text-sm text-gray-600">
                <ExpensePaginationSummary
                  page={data.page}
                  size={data.size}
                  itemCount={data.items.length}
                  totalItems={data.totalItems}
                />
                <div className={isFetching ? "opacity-60" : undefined} aria-busy={isFetching}>
                  <Pagination
                    currentPage={data.page}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
