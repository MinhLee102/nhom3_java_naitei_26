"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, ReactNode } from "react";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";

/**
 * Provider toàn cục — wrap QueryClientProvider + Toast + Auth hydration.
 * Đặt ở root layout để toàn bộ app đều có access.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 phút
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const hydrate = useAuthStore((state) => state.hydrate);

  // Khôi phục auth state từ localStorage khi app mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
