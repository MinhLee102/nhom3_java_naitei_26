import apiClient from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "./types";

const BASE = "/auth";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>(`${BASE}/login`, data),

  // TODO: Thêm register, forgot-password, refresh-token khi backend sẵn sàng
};
