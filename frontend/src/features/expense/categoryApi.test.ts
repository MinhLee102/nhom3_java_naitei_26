import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "@/lib/axios";
import { expenseCategoryApi, normalizeExpenseCategoriesResponse } from "./categoryApi";

vi.mock("@/lib/axios", () => ({
  default: { get: vi.fn() },
}));

describe("expenseCategoryApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ưu tiên gọi Category API của nhóm theo contract SRS", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: [] });

    await expenseCategoryApi.getExpenseCategories();

    expect(apiClient.get).toHaveBeenCalledWith("/categories", { params: { type: "EXPENSE" } });
  });

  it("chuẩn hoá object phân trang thành mảng danh mục để render UI", () => {
    const pageLikeResponse = {
      content: [
        { id: 1, name: "Ăn uống" },
        { id: 2, name: "Di chuyển" },
      ],
      totalElements: 2,
    };

    expect(normalizeExpenseCategoriesResponse(pageLikeResponse)).toEqual([
      { id: 1, name: "Ăn uống" },
      { id: 2, name: "Di chuyển" },
    ]);
  });
});
