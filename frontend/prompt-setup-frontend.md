# Prompt cho AI Agent: Setup Frontend – Expense Management System

Copy toàn bộ nội dung bên dưới (từ `--- BẮT ĐẦU PROMPT ---`) và đưa cho AI Agent (Claude Code, Cursor, v.v.) để thực hiện setup.

---BẮT ĐẦU PROMPT---

## Vai trò
Bạn là Senior Frontend Engineer, chuyên sâu Next.js App Router + TypeScript. Nhiệm vụ của bạn là khởi tạo (bootstrap) phần frontend cho dự án **Expense Management System**, đảm bảo cấu trúc rõ ràng, chuẩn convention, để mọi thành viên trong team có thể vào code ngay mà không bị conflict cấu trúc, dễ bảo trì và mở rộng về sau.

## Bối cảnh dự án
- Đây là hệ thống quản lý chi tiêu cá nhân, có 2 khu vực giao diện tách biệt:
  - **Client**: dành cho người dùng cuối — quản lý Expense, Income, Category, Budget, Dashboard, Report.
  - **Admin**: dành cho quản trị viên — CRUD User/Category/Budget Template/Expense/Income, Activity Log, Import/Export.
- Backend là Java Spring Boot, expose RESTful API, response được bọc trong format chuẩn `ApiResponse` (cần đoán/định nghĩa interface generic cho response này, ví dụ `{ code, message, data }` — nếu chưa rõ format cụ thể, hãy tạo theo dạng phổ biến nhất và ghi chú TODO để đội backend xác nhận lại).
- Toàn bộ hệ thống sẽ chạy trong Docker, nên cần có sẵn cấu hình biến môi trường linh hoạt (không hardcode baseURL).

## Yêu cầu công nghệ (bắt buộc)
- Next.js 14/15, **App Router** (không dùng Pages Router)
- TypeScript (strict mode bật)
- TailwindCSS
- Axios cho HTTP Client
- ESLint + Prettier (đồng bộ style code cho cả team)
- Cấu trúc thư mục theo Route Groups: `(admin)`, `(user)`, `(auth)`

## Danh sách công việc cần thực hiện (theo thứ tự)

### 1. Khởi tạo dự án
- Khởi tạo bằng `create-next-app` với TypeScript, TailwindCSS, ESLint, App Router, import alias `@/*`.
- Cài đặt các thư viện bổ trợ cần thiết cho 1 dự án CRUD-heavy với dashboard/biểu đồ:
  - `axios` — HTTP client
  - `zustand` hoặc `@tanstack/react-query` — quản lý state/server-state (ưu tiên React Query vì app này rất nhiều list/filter/pagination gọi API)
  - `react-hook-form` + `zod` (+ `@hookform/resolvers`) — xử lý form và validate
  - `recharts` — vẽ biểu đồ cho Dashboard/Report
  - `date-fns` — xử lý ngày tháng (filter theo tháng/quý/năm)
  - `lucide-react` — icon set
  - `sonner` hoặc `react-hot-toast` — toast notification
  - `clsx` + `tailwind-merge` — merge className linh hoạt
- Setup Prettier + ESLint config đồng bộ (không để 2 công cụ đánh nhau về format).
- Tạo file `.env.local.example` với biến `NEXT_PUBLIC_API_BASE_URL` (không commit `.env.local` thật).

### 2. Cấu trúc thư mục (Route Groups)
Tạo cấu trúc sau trong `src/app`:

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx          # layout riêng cho auth (không header/sidebar)
│   ├── (user)/
│   │   ├── layout.tsx          # Client Layout: Header + Sidebar + Footer
│   │   ├── dashboard/page.tsx
│   │   ├── expenses/
│   │   │   ├── page.tsx        # danh sách
│   │   │   └── [id]/page.tsx   # chi tiết
│   │   ├── incomes/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── budgets/page.tsx
│   │   └── reports/page.tsx
│   ├── admin/
│   │   ├── layout.tsx          # Admin Layout riêng
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── budget-templates/page.tsx
│   │   ├── expenses/page.tsx
│   │   ├── incomes/page.tsx
│   │   └── activity-logs/page.tsx
│   ├── layout.tsx               # Root layout (font, providers global)
│   └── globals.css
├── components/
│   ├── ui/                      # component tái sử dụng: Button, Input, Table, Modal, Pagination...
│   ├── layout/                  # Header, Sidebar, Footer, AdminSidebar...
│   └── shared/                  # component dùng chung nhiều nơi (ChartCard, StatCard, FilterBar...)
├── features/                    # logic theo domain, tách biệt UI khỏi business logic
│   ├── expense/
│   │   ├── api.ts               # gọi API expense
│   │   ├── types.ts             # type/interface Expense
│   │   ├── hooks.ts             # custom hooks (useExpenses, useCreateExpense...)
│   ├── income/
│   ├── category/
│   ├── budget/
│   ├── user/
│   └── auth/
├── lib/
│   ├── axios.ts                 # instance axios + interceptor
│   ├── utils.ts                 # helper functions (formatCurrency, formatDate...)
│   └── constants.ts             # hằng số dùng chung (route path, enum...)
├── hooks/                       # custom hooks không thuộc riêng feature nào (useDebounce, usePagination...)
├── types/
│   └── api.ts                   # generic type ApiResponse<T>, Pagination<T>
└── store/                       # zustand store (VD: authStore giữ user/token)
```

> Lưu ý quan trọng: hãy giải thích rõ lý do tách `features/` riêng khỏi `components/` trong README — mục đích là để mỗi domain (expense, income, budget...) tự chứa API call + type + hook của chính nó, tránh việc 1 file `api.ts` khổng lồ chứa tất cả endpoint, giúp nhiều người code song song không đụng file nhau.

### 3. Cấu hình HTTP Client (`src/lib/axios.ts`)
- Tạo instance axios với `baseURL` lấy từ `process.env.NEXT_PUBLIC_API_BASE_URL`.
- Request interceptor: tự động gắn `Authorization: Bearer <token>` (token lấy từ store/cookie).
- Response interceptor:
  - Tự động **unwrap** dữ liệu từ format `ApiResponse` của Spring Boot (giả định dạng `{ code, message, data }`, để rõ TODO nếu format thực tế khác).
  - Xử lý lỗi tập trung: nếu `401` → tự động logout/redirect về `/login`; nếu lỗi khác → trả về message chuẩn hóa để hiển thị toast.
- Định nghĩa type generic `ApiResponse<T>` và `PaginatedResponse<T>` trong `src/types/api.ts`, dùng chung cho toàn bộ các API call (list có pagination cần có `content, totalPages, totalElements, page, size`).

### 4. Layout chung
- **Root layout (`app/layout.tsx`)**: setup font, meta tag, các Provider toàn cục (React Query Provider, Toast Provider).
- **Client Layout (`app/(user)/layout.tsx`)**: Header (logo, tên user, nút logout), Sidebar (menu: Dashboard, Expenses, Incomes, Categories, Budgets, Reports), Footer, có background màu nền chung. Nếu chưa có Figma, dựng khung wireframe đơn giản bằng Tailwind, đủ dùng để code tiếp phần chức năng, không cần làm đẹp kỹ ở bước này.
- **Admin Layout (`app/admin/layout.tsx`)**: cấu trúc tương tự nhưng Sidebar khác menu (Users, Categories, Budget Templates, Expenses, Incomes, Activity Logs), có thể thêm badge/label phân biệt rõ đang ở khu vực Admin (VD: màu sắc khác, hoặc topbar ghi "Admin Panel") để tránh nhầm lẫn khi dev.
- **Auth layout**: layout tối giản, không header/sidebar, chỉ căn giữa form login.

### 5. Component nền tảng (UI Kit tối thiểu)
Tạo sẵn các component cơ bản trong `components/ui/` để cả team dùng chung ngay từ đầu (tránh mỗi người tự viết Button/Input riêng gây thiếu đồng nhất):
- `Button`, `Input`, `Select`, `Modal/Dialog`, `Table` (hỗ trợ pagination), `Pagination`, `Badge`, `Card`, `Skeleton/Loading`

### 6. Cấu hình bổ sung
- Setup React Query Provider (`QueryClientProvider`) ở root layout.
- Setup `middleware.ts` cơ bản (kiểm tra token, redirect nếu chưa login khi vào route `(user)` hoặc `admin`) — có thể để dạng khung/TODO nếu auth backend chưa sẵn sàng.
- Tạo file `Dockerfile` + `.dockerignore` cho Next.js (multi-stage build: build stage + production stage dùng `next start` hoặc standalone output).
- Đảm bảo `next.config.ts` bật `output: 'standalone'` để tối ưu Docker image.

### 7. Tài liệu bàn giao (README.md)
Viết README ngắn gọn gồm:
- Cách chạy dự án local (`npm install`, `npm run dev`, biến môi trường cần có)
- Giải thích cấu trúc thư mục (đặc biệt phần `features/` để tránh hiểu nhầm)
- Convention đặt tên file/component (PascalCase cho component, camelCase cho hook/function)
- Quy tắc thêm 1 trang/API mới (VD: "muốn thêm màn hình mới thuộc Client thì tạo route trong `(user)/`, logic gọi API đặt trong `features/<domain>/`")
- Danh sách các route đã dựng sẵn (kể cả page rỗng/placeholder)

## Yêu cầu chất lượng đầu ra
- Code chạy được ngay bằng `npm run dev`, không lỗi TypeScript, không lỗi ESLint.
- Toàn bộ page hiện tại có thể là placeholder ("Trang X đang được xây dựng") nhưng route và layout phải hoạt động đúng, điều hướng được giữa các trang.
- Không hardcode giá trị nhạy cảm (API URL, secret) trong code — luôn qua biến môi trường.
- Ưu tiên comment ngắn gọn ở những chỗ có quyết định kiến trúc (VD: vì sao dùng route group, vì sao tách `features/`) để người mới vào dự án đọc hiểu nhanh.

Sau khi hoàn thành, liệt kê lại toàn bộ cấu trúc thư mục đã tạo và danh sách các lệnh cần chạy để người khác trong team pull code về là chạy được ngay.

---KẾT THÚC PROMPT---
