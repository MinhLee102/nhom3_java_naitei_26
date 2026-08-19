import apiClient from "@/lib/axios";
import type { PaginatedResponse } from "@/types/api";
import type { Income, CreateIncomeDto, UpdateIncomeDto } from "./types";

const BASE = "/incomes";

export const incomeApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Income>>(BASE, { params }),

  getById: (id: string) =>
    apiClient.get<Income>(`${BASE}/${id}`),

  create: (data: CreateIncomeDto) =>
    apiClient.post<Income>(BASE, data),

  update: (id: string, data: UpdateIncomeDto) =>
    apiClient.put<Income>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};
