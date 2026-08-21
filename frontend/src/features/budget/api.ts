import apiClient from "@/lib/axios";
import type { Budget, CreateBudgetDto, UpdateBudgetDto } from "./types";

const BASE = "/budgets";

export const budgetApi = {
  getAll: (params?: { year?: number; month?: number }) =>
    apiClient.get<Budget[]>(BASE, { params }),

  getAlerts: (params?: { year?: number; month?: number }) =>
    apiClient.get<Budget[]>(`${BASE}/alerts`, { params }),

  getById: (id: number) =>
    apiClient.get<Budget>(`${BASE}/${id}`),

  create: (data: CreateBudgetDto) =>
    apiClient.post<Budget>(BASE, data),

  update: (id: number, data: UpdateBudgetDto) =>
    apiClient.put<Budget>(`${BASE}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${BASE}/${id}`),
};
