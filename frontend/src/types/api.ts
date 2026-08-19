/**
 * Generic API Response type — phù hợp với format chuẩn của Spring Boot backend.
 * TODO: Xác nhận lại format response thực tế với đội backend.
 * Giả định format: { status, message, data }
 */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

/**
 * Paginated response — tương thích Spring Boot Page<T>.
 * Dùng cho các API trả về danh sách có phân trang.
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

/**
 * Kiểu lỗi chuẩn hóa dùng trong toàn app
 */
export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string>;
}
