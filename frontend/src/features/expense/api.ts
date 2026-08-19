/**
 * Feature: Expense
 * API calls — tách riêng để mỗi domain tự quản lý endpoints của mình,
 * tránh 1 file api.ts khổng lồ gây conflict khi nhiều người code song song.
 */
import apiClient from "@/lib/axios";
import type { PaginatedResponse } from "@/types/api";
import type { Expense, CreateExpenseDto, UpdateExpenseDto, ExpenseFilter } from "./types";

const BASE = "/expenses";

export const expenseApi = {
  getAll: (params?: ExpenseFilter) =>
    apiClient.get<PaginatedResponse<Expense>>(BASE, { params }),

  getById: (id: string) =>
    apiClient.get<Expense>(`${BASE}/${id}`),

  create: (data: CreateExpenseDto) =>
    apiClient.post<Expense>(BASE, data),

  update: (id: string, data: UpdateExpenseDto) =>
    apiClient.put<Expense>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};
