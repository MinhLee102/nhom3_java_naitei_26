import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApi } from "./api";
import type { CreateBudgetDto, UpdateBudgetDto } from "./types";

const QUERY_KEY = "budgets";

export function useBudgets(filter?: Record<string, unknown>) {
  return useQuery({
    queryKey: [QUERY_KEY, filter],
    queryFn: () => budgetApi.getAll(filter).then((res) => res.data),
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBudgetDto) => budgetApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudgetDto }) =>
      budgetApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => budgetApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}
