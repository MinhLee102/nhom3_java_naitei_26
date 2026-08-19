import apiClient from "@/lib/axios";
import type { PaginatedResponse } from "@/types/api";
import type { Budget, CreateBudgetDto, UpdateBudgetDto } from "./types";

const BASE = "/budgets";

export const budgetApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Budget>>(BASE, { params }),

  getById: (id: string) =>
    apiClient.get<Budget>(`${BASE}/${id}`),

  create: (data: CreateBudgetDto) =>
    apiClient.post<Budget>(BASE, data),

  update: (id: string, data: UpdateBudgetDto) =>
    apiClient.put<Budget>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};
