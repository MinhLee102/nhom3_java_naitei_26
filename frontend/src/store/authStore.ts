import { create } from "zustand";

/**
 * Auth Store — quản lý trạng thái đăng nhập.
 * Dùng zustand vì auth state cần truy cập đồng bộ từ nhiều nơi
 * (axios interceptor, sidebar, middleware...), không phù hợp với React Query.
 */

interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  /**
   * Gọi sau khi login thành công — lưu user + token vào store + localStorage
   */
  setAuth: (user: User, token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },

  /**
   * Xóa toàn bộ auth state — gọi khi logout hoặc khi token hết hạn (401)
   */
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  /**
   * Khôi phục state từ localStorage khi app khởi động (client-side only).
   * Gọi ở Provider component hoặc layout.
   */
  hydrate: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          set({ user, token, isAuthenticated: true });
        } catch {
          // localStorage bị corrupt → xóa sạch
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
        }
      }
    }
  },
}));
