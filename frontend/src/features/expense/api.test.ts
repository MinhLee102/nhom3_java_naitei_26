import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "@/lib/axios";
import { expenseApi } from "./api";
import type { ExpensePageResponse } from "./types";

vi.mock("@/lib/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("expenseApi.getAll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gửi đúng page, size, sort và không gửi userId", async () => {
    const response: ExpensePageResponse = {
      items: [],
      page: 0,
      size: 10,
      totalItems: 0,
      totalPages: 0,
    };
    vi.mocked(apiClient.get).mockResolvedValue({ data: response });

    await expenseApi.getAll({ page: 0, size: 10, sort: "date,desc" });

    expect(apiClient.get).toHaveBeenCalledWith("/expenses", {
      params: { page: 0, size: 10, sort: "date,desc" },
    });
    const params = vi.mocked(apiClient.get).mock.calls[0][1]?.params;
    expect(params).not.toHaveProperty("userId");
  });

  it("đọc contract items và totalItems của Expense", async () => {
    const response: ExpensePageResponse = {
      items: [
        {
          id: 12,
          title: "Cơm trưa",
          amount: 50000,
          date: "2026-08-14",
          categoryId: 3,
          categoryName: "Ăn uống",
        },
      ],
      page: 0,
      size: 10,
      totalItems: 42,
      totalPages: 5,
    };
    vi.mocked(apiClient.get).mockResolvedValue({ data: response });

    const result = await expenseApi.getAll();

    expect(result.data.items[0].title).toBe("Cơm trưa");
    expect(result.data.totalItems).toBe(42);
  });
});
