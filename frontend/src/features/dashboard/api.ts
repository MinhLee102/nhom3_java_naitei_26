import apiClient from "@/lib/axios";
import type { CategoryExpense, DashboardSummary } from "./types";

export const dashboardApi = {
  getSummary: () => apiClient.get<DashboardSummary>("/dashboard/summary"),
  getExpenseByCategory: () =>
    apiClient.get<CategoryExpense[]>("/dashboard/expense-by-category"),
};
