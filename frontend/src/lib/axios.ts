import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/api";

/**
 * Axios instance tập trung — toàn bộ API call trong app nên dùng instance này
 * thay vì gọi axios trực tiếp, để đảm bảo:
 * - baseURL luôn lấy từ biến môi trường
 * - Token tự động được gắn vào header
 * - Lỗi 401 được xử lý thống nhất
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Request Interceptor:
 * Tự động gắn Bearer token từ localStorage vào mọi request.
 * Token được lưu khi user login thành công.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Chỉ truy cập localStorage ở client-side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor:
 * - Unwrap dữ liệu từ format ApiResponse { status, message, data } của Spring Boot
 * - Xử lý lỗi tập trung: 401 → redirect /login, lỗi khác → trả message chuẩn hóa
 *
 * TODO: Xác nhận format response thực tế với đội backend.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Unwrap: trả về trực tiếp phần data từ ApiResponse
    const apiResponse = response.data as ApiResponse<unknown>;
    return {
      ...response,
      data: apiResponse.data ?? response.data,
    };
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại.";

    // 401 Unauthorized → xóa token, redirect về trang login
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject({
      status: status || 500,
      message,
      details: error.response?.data,
    });
  }
);

export default apiClient;
