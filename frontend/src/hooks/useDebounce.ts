import { useState, useEffect } from "react";

/**
 * Hook debounce — delay giá trị thay đổi, hữu ích cho search/filter input
 * để tránh gọi API liên tục mỗi lần user nhấn phím.
 *
 * @param value - giá trị cần debounce
 * @param delay - thời gian chờ (ms), mặc định 300ms
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
