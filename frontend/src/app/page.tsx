import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/**
 * Trang gốc — redirect về dashboard.
 * Nếu chưa login, middleware sẽ chặn và redirect về /login.
 */
export default function HomePage() {
  redirect(ROUTES.DASHBOARD);
}
