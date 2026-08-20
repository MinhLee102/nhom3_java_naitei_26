/**
 * Feature: Expense
 * Custom hooks — dùng React Query để quản lý server-state,
 * tự động cache, refetch, và đồng bộ UI.
 */
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseApi } from "./api";
import type { CreateExpenseDto, UpdateExpenseDto, ExpenseFilter } from "./types";

const QUERY_KEY = "expenses";

export function useExpenses(filter?: ExpenseFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filter],
    queryFn: () => expenseApi.getAll(filter).then((res) => res.data),
    placeholderData: keepPreviousData,
  });
}

export function useExpense(id: number) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => expenseApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseDto) => expenseApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExpenseDto }) =>
      expenseApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
