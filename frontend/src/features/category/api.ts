import apiClient from "@/lib/axios";
import type { PaginatedResponse } from "@/types/api";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "./types";

const BASE = "/categories";

export const categoryApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Category>>(BASE, { params }),

  getById: (id: string) =>
    apiClient.get<Category>(`${BASE}/${id}`),

  create: (data: CreateCategoryDto) =>
    apiClient.post<Category>(BASE, data),

  update: (id: string, data: UpdateCategoryDto) =>
    apiClient.put<Category>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};
