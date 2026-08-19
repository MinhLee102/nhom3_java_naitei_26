import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

/**
 * Merge className linh hoạt — kết hợp clsx (điều kiện) + tailwind-merge (xử lý xung đột Tailwind class).
 * Dùng thay cho template literal hoặc clsx đơn thuần khi cần merge Tailwind classes.
 *
 * Ví dụ: cn("px-4 py-2", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format số tiền theo định dạng VND.
 * Ví dụ: 1500000 → "1.500.000 ₫"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Format ngày tháng theo định dạng phổ biến.
 * @param date - Date object hoặc ISO string
 * @param pattern - date-fns format pattern (mặc định: "dd/MM/yyyy")
 */
export function formatDate(
  date: Date | string,
  pattern: string = "dd/MM/yyyy"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern);
}

/**
 * Cắt ngắn text nếu quá dài
 */
export function truncate(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
