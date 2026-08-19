import apiClient from "@/lib/axios";
import type { PaginatedResponse } from "@/types/api";
import type { User, CreateUserDto, UpdateUserDto } from "./types";

const BASE = "/users";

export const userApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<User>>(BASE, { params }),

  getById: (id: string) =>
    apiClient.get<User>(`${BASE}/${id}`),

  create: (data: CreateUserDto) =>
    apiClient.post<User>(BASE, data),

  update: (id: string, data: UpdateUserDto) =>
    apiClient.put<User>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};
