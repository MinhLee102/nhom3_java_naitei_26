/**
 * Feature: Expense
 * API calls — tách riêng để mỗi domain tự quản lý endpoints của mình,
 * tránh 1 file api.ts khổng lồ gây conflict khi nhiều người code song song.
 */
import apiClient from "@/lib/axios";
import type {
  CreateExpenseDto,
  Expense,
  ExpenseFilter,
  ExpensePageResponse,
  UpdateExpenseDto,
} from "./types";

const BASE = "/expenses";

export const expenseApi = {
  getAll: (params?: ExpenseFilter) => apiClient.get<ExpensePageResponse>(BASE, { params }),

  getById: (id: number) => apiClient.get<Expense>(`${BASE}/${id}`),

  create: (data: CreateExpenseDto) => apiClient.post<Expense>(BASE, data),

  update: (id: number, data: UpdateExpenseDto) => apiClient.put<Expense>(`${BASE}/${id}`, data),

  delete: (id: number) => apiClient.delete(`${BASE}/${id}`),
};
