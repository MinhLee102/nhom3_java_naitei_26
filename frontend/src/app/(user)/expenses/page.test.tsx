import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ExpensesPage from "./page";

const push = vi.fn();
const refetch = vi.fn();
const useExpensesMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/features/expense/hooks", () => ({
  useExpenses: (filter: unknown) => useExpensesMock(filter),
}));

const expense = {
  id: 12,
  title: "Cơm trưa",
  amount: 50000,
  date: "2026-08-14",
  categoryId: 3,
  categoryName: "Ăn uống",
};

describe("ExpensesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gọi hook với page 0, size 10, sort mặc định và hiển thị loading", () => {
    useExpensesMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: true,
      isError: false,
      refetch,
    });

    render(<ExpensesPage />);

    expect(useExpensesMock).toHaveBeenCalledWith({ page: 0, size: 10, sort: "date,desc" });
    expect(screen.getByLabelText("Đang tải danh sách chi tiêu")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Thêm chi tiêu/i })).toBeDisabled();
  });

  it("hiển thị lỗi và cho phép thử lại", () => {
    useExpensesMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: true,
      refetch,
    });

    render(<ExpensesPage />);
    fireEvent.click(screen.getByRole("button", { name: "Thử lại" }));

    expect(screen.getByText("Không thể tải danh sách chi tiêu")).toBeInTheDocument();
    expect(refetch).toHaveBeenCalledOnce();
  });

  it("hiển thị empty state", () => {
    useExpensesMock.mockReturnValue({
      data: { items: [], page: 0, size: 10, totalItems: 0, totalPages: 0 },
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch,
    });

    render(<ExpensesPage />);

    expect(screen.getByText("Chưa có khoản chi tiêu nào")).toBeInTheDocument();
    expect(screen.getByText("Hiển thị 0 trên tổng 0 khoản chi")).toBeInTheDocument();
  });

  it("render dữ liệu, phân trang 0-based và điều hướng khi click row", async () => {
    useExpensesMock.mockImplementation((filter: { page: number }) => ({
      data: {
        items: [expense],
        page: filter.page,
        size: 10,
        totalItems: 11,
        totalPages: 2,
      },
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch,
    }));

    render(<ExpensesPage />);
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => {
      expect(useExpensesMock).toHaveBeenLastCalledWith({ page: 1, size: 10, sort: "date,desc" });
    });

    fireEvent.click(screen.getByText("Cơm trưa"));
    expect(push).toHaveBeenCalledWith("/expenses/12");
  });
});
