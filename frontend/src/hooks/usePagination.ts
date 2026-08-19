import { useState, useCallback } from "react";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

/**
 * Hook quản lý trạng thái phân trang — dùng chung cho mọi danh sách có pagination.
 */
export function usePagination(initialPageSize: number = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(0, newPage));
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(0); // Reset về trang đầu khi đổi page size
  }, []);

  const updateTotal = useCallback(
    (pages: number, elements: number) => {
      setTotalPages(pages);
      setTotalElements(elements);
    },
    []
  );

  return {
    page,
    pageSize,
    totalPages,
    totalElements,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    updateTotal,
    isFirstPage: page === 0,
    isLastPage: page >= totalPages - 1,
  };
}
