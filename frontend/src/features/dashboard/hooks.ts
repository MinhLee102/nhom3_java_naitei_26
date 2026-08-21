import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./api";

export const DASHBOARD_KEYS = {
  summary: ["dashboard", "summary"] as const,
  expenseByCategory: ["dashboard", "expense-by-category"] as const,
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.summary,
    queryFn: async () => {
      const response = await dashboardApi.getSummary();
      return response.data;
    },
  });
}

export function useDashboardExpenseByCategory() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.expenseByCategory,
    queryFn: async () => {
      const response = await dashboardApi.getExpenseByCategory();
      return response.data;
    },
  });
}
