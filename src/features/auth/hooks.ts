import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "./api";
import type { LoginRequest } from "./types";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      const { accessToken, user } = response.data as unknown as {
        accessToken: string;
        user: { id: string; email: string; name: string; role: "USER" | "ADMIN" };
      };
      setAuth(user, accessToken);
    },
  });
}
