import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "./api";
import type { LoginRequest } from "./types";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      const payload = response.data as {
        token?: string;
        accessToken?: string;
        refreshToken?: string;
        user: { id: string; email: string; name: string; role: "USER" | "ADMIN" };
      };

      const authToken = payload.token ?? payload.accessToken;
      if (!authToken) {
        throw new Error("Authentication response is missing the access token.");
      }

      if (typeof document !== "undefined") {
        document.cookie = `access_token=${authToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      if (payload.refreshToken) {
        localStorage.setItem("refresh_token", payload.refreshToken);
      }

      setAuth(payload.user, authToken);
    },
  });
}
