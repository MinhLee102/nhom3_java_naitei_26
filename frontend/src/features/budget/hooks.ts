import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApi } from "./api";
import type { CreateBudgetDto, UpdateBudgetDto } from "./types";

export const BUDGET_KEYS = {
  all: ["budgets"] as const,
  list: (params?: { year?: number; month?: number }) =>
    ["budgets", "list", params] as const,
  alerts: (params?: { year?: number; month?: number }) =>
    ["budgets", "alerts", params] as const,
  detail: (id: number) => ["budgets", "detail", id] as const,
};

export function useBudgets(params?: { year?: number; month?: number }) {
  return useQuery({
    queryKey: BUDGET_KEYS.list(params),
    queryFn: async () => {
      const response = await budgetApi.getAll(params);
      return response.data;
    },
  });
}

export function useBudgetAlerts(params?: { year?: number; month?: number }) {
  return useQuery({
    queryKey: BUDGET_KEYS.alerts(params),
    queryFn: async () => {
      const response = await budgetApi.getAlerts(params);
      return response.data;
    },
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBudgetDto) => budgetApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBudgetDto }) =>
      budgetApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => budgetApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all });
    },
  });
}
