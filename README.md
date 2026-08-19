# nhom3_java_naitei_26

Mock project NAITEI 26 - Java. Nhóm 3.

## Thông tin chung

- Đề tài: Expense Management System
- Repository: https://github.com/awesome-academy/nhom3_java_naitei_26
- Redmine: https://edu-redmine.sun-asterisk.vn/projects/nhom3_java_naitei_26
- Thời gian thực hiện: 10 ngày full

## Thành viên

- Nguyễn Sinh Huy
- Lê Duy Khánh Toàn
- Nguyễn Trung Nghĩa
- Lê Đức Minh
- Nguyễn Đức Duy
- Lê Thị Tú Phương

## Quy trình làm việc

Quy ước tạo ticket, estimate time và liên kết Pull Request với Redmine được mô tả trong file REDMINE.md.

## Các bước thực hiện

1. Design database
2. Add tasks on Redmine + estimate time
3. Init project
4. Init models, add relationship
5. Design static pages
6. Other pulls

---

# Expense Management System — Frontend

Hệ thống quản lý chi tiêu cá nhân. Frontend được xây dựng bằng **Next.js 15 (App Router)** + **TypeScript** + **TailwindCSS**.

## 🚀 Cách chạy dự án

### Yêu cầu
- Node.js >= 18
- npm >= 9

### Cài đặt và chạy

```bash
# 1. Clone repo và di chuyển vào thư mục frontend
cd GroupPj

# 2. Copy file biến môi trường
cp .env.local.example .env.local

# 3. Chỉnh sửa .env.local — cập nhật API URL
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# 4. Cài đặt dependencies
npm install

# 5. Chạy dev server
npm run dev
```

App sẽ chạy tại [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
npm start
```

### Chạy với Docker

```bash
docker build -t expense-frontend --build-arg NEXT_PUBLIC_API_BASE_URL=http://api:8080/api .
docker run -p 3000:3000 expense-frontend
```

---

## 📁 Cấu trúc thư mục

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Route group: Auth (login) — layout riêng, không sidebar
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (user)/                 # Route group: Client — layout có Header + Sidebar + Footer
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── expenses/
│   │   │   ├── page.tsx        # Danh sách chi tiêu
│   │   │   └── [id]/page.tsx   # Chi tiết 1 chi tiêu
│   │   ├── incomes/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── budgets/page.tsx
│   │   └── reports/page.tsx
│   ├── admin/                  # Khu vực Admin — layout riêng (dark sidebar)
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── budget-templates/page.tsx
│   │   ├── expenses/page.tsx
│   │   ├── incomes/page.tsx
│   │   └── activity-logs/page.tsx
│   ├── layout.tsx              # Root layout (font, providers)
│   ├── page.tsx                # Redirect → /dashboard
│   └── globals.css
│
├── components/
│   ├── ui/                     # UI Kit cơ bản — dùng chung toàn app
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Pagination.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Skeleton.tsx
│   │   └── index.ts            # Barrel export
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── shared/                 # Component dùng chung nhiều nơi
│   │   ├── StatCard.tsx
│   │   ├── ChartCard.tsx
│   │   ├── FilterBar.tsx
│   │   └── index.ts
│   └── Providers.tsx           # React Query + Toast + Auth hydration
│
├── features/                   # ⭐ Logic theo domain — QUAN TRỌNG (xem giải thích bên dưới)
│   ├── expense/
│   │   ├── api.ts              # API calls cho expense
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── hooks.ts            # React Query hooks
│   ├── income/
│   ├── category/
│   ├── budget/
│   ├── user/
│   └── auth/
│
├── lib/
│   ├── axios.ts                # Axios instance + interceptors
│   ├── utils.ts                # Helpers (cn, formatCurrency, formatDate)
│   └── constants.ts            # Routes, menu items, pagination defaults
│
├── hooks/                      # Custom hooks không thuộc riêng domain nào
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── index.ts
│
├── types/
│   └── api.ts                  # Generic types: ApiResponse<T>, PaginatedResponse<T>
│
├── store/
│   └── authStore.ts            # Zustand store cho auth state
│
└── middleware.ts               # Auth route protection
```

### ⭐ Tại sao tách `features/` riêng khỏi `components/`?

Mục đích là để **mỗi domain (expense, income, budget...)** tự chứa:
- `api.ts` — các hàm gọi API riêng
- `types.ts` — TypeScript interfaces riêng
- `hooks.ts` — React Query hooks riêng

**Lợi ích:**
1. **Tránh file khổng lồ**: Không có 1 file `api.ts` chứa tất cả endpoints
2. **Giảm conflict**: Nhiều người code song song trên các domain khác nhau mà không đụng file
3. **Dễ tìm**: Muốn sửa logic expense → vào `features/expense/`, không phải tìm trong 10 files khác nhau

---

## 📝 Convention đặt tên

| Loại | Quy tắc | Ví dụ |
|------|---------|-------|
| Component | PascalCase | `Button.tsx`, `StatCard.tsx` |
| Hook | camelCase, prefix `use` | `useDebounce.ts`, `useExpenses` |
| Function/Variable | camelCase | `formatCurrency`, `apiClient` |
| Type/Interface | PascalCase | `Expense`, `ApiResponse<T>` |
| File feature | camelCase | `api.ts`, `types.ts`, `hooks.ts` |
| Route folder | kebab-case | `budget-templates`, `activity-logs` |

---

## ➕ Quy tắc thêm trang/API mới

### Thêm trang mới cho Client (người dùng)

1. Tạo route trong `src/app/(user)/<tên-trang>/page.tsx`
2. Tạo feature tương ứng trong `src/features/<domain>/` (api.ts, types.ts, hooks.ts)
3. Thêm menu item vào `src/lib/constants.ts` → `USER_MENU`
4. Thêm icon vào `iconMap` trong `Sidebar.tsx`

### Thêm trang mới cho Admin

1. Tạo route trong `src/app/admin/<tên-trang>/page.tsx`
2. Tạo hoặc reuse feature trong `src/features/<domain>/`
3. Thêm menu item vào `src/lib/constants.ts` → `ADMIN_MENU`
4. Thêm icon vào `iconMap` trong `AdminSidebar.tsx`

### Thêm API mới cho domain đã có

1. Thêm hàm vào `src/features/<domain>/api.ts`
2. Thêm type (nếu cần) vào `src/features/<domain>/types.ts`
3. Thêm React Query hook vào `src/features/<domain>/hooks.ts`

---

## 🗺️ Danh sách routes

### Client (User)
| Route | Trang | Trạng thái |
|-------|-------|------------|
| `/login` | Đăng nhập | ✅ Form + validation |
| `/dashboard` | Dashboard | ✅ Placeholder |
| `/expenses` | Danh sách chi tiêu | ✅ Placeholder |
| `/expenses/[id]` | Chi tiết chi tiêu | ✅ Placeholder |
| `/incomes` | Danh sách thu nhập | ✅ Placeholder |
| `/categories` | Danh mục | ✅ Placeholder |
| `/budgets` | Ngân sách | ✅ Placeholder |
| `/reports` | Báo cáo | ✅ Placeholder |

### Admin
| Route | Trang | Trạng thái |
|-------|-------|------------|
| `/admin/dashboard` | Admin Dashboard | ✅ Placeholder |
| `/admin/users` | Quản lý người dùng | ✅ Placeholder |
| `/admin/categories` | Quản lý danh mục | ✅ Placeholder |
| `/admin/budget-templates` | Mẫu ngân sách | ✅ Placeholder |
| `/admin/expenses` | Quản lý chi tiêu | ✅ Placeholder |
| `/admin/incomes` | Quản lý thu nhập | ✅ Placeholder |
| `/admin/activity-logs` | Nhật ký hoạt động | ✅ Placeholder |

---

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| Next.js 15 (App Router) | Framework |
| TypeScript (strict) | Type safety |
| TailwindCSS 4 | Styling |
| Axios | HTTP client |
| React Query (TanStack) | Server-state management |
| Zustand | Client-state (auth) |
| React Hook Form + Zod | Form + validation |
| Recharts | Biểu đồ |
| Lucide React | Icons |
| Sonner | Toast notification |
| date-fns | Xử lý ngày tháng |

---

## 🐳 Docker

Dự án đã có `Dockerfile` multi-stage build và bật `output: 'standalone'` trong `next.config.ts`.

```bash
# Build image
docker build -t expense-frontend \
  --build-arg NEXT_PUBLIC_API_BASE_URL=http://api:8080/api \
  .

# Chạy container
docker run -p 3000:3000 expense-frontend
```
