import apiClient from "@/lib/axios";
import type { ExpenseCategoryOption } from "./types";

const CATEGORY_PATH = "/categories";

type ExpenseCategoriesPageLike = {
  content?: ExpenseCategoryOption[];
  items?: ExpenseCategoryOption[];
};

export function normalizeExpenseCategoriesResponse(
  payload: ExpenseCategoryOption[] | ExpenseCategoriesPageLike | null | undefined
): ExpenseCategoryOption[] {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.content)) {
    return payload.content;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}

export const expenseCategoryApi = {
  getExpenseCategories: () =>
    apiClient.get<ExpenseCategoryOption[]>(CATEGORY_PATH, {
      params: { type: "EXPENSE" },
    }).then((response) => ({
      ...response,
      data: normalizeExpenseCategoriesResponse(response.data as ExpenseCategoryOption[] | ExpenseCategoriesPageLike),
    })),
};
