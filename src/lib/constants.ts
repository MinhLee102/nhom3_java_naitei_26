/**
 * Route paths — dùng tập trung để tránh hardcode string rải rác trong code.
 * Khi đổi route, chỉ cần sửa 1 chỗ.
 */
export const ROUTES = {
  // Auth
  LOGIN: "/login",

  // User (Client)
  DASHBOARD: "/dashboard",
  EXPENSES: "/expenses",
  EXPENSE_DETAIL: (id: string) => `/expenses/${id}`,
  INCOMES: "/incomes",
  CATEGORIES: "/categories",
  BUDGETS: "/budgets",
  REPORTS: "/reports",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_BUDGET_TEMPLATES: "/admin/budget-templates",
  ADMIN_EXPENSES: "/admin/expenses",
  ADMIN_INCOMES: "/admin/incomes",
  ADMIN_ACTIVITY_LOGS: "/admin/activity-logs",
} as const;

/**
 * Menu items cho sidebar — tách riêng để dùng chung giữa Sidebar component và breadcrumb.
 */
export const USER_MENU = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: "LayoutDashboard" },
  { label: "Chi tiêu", href: ROUTES.EXPENSES, icon: "Receipt" },
  { label: "Thu nhập", href: ROUTES.INCOMES, icon: "Wallet" },
  { label: "Danh mục", href: ROUTES.CATEGORIES, icon: "Tag" },
  { label: "Ngân sách", href: ROUTES.BUDGETS, icon: "PiggyBank" },
  { label: "Báo cáo", href: ROUTES.REPORTS, icon: "BarChart3" },
] as const;

export const ADMIN_MENU = [
  { label: "Dashboard", href: ROUTES.ADMIN_DASHBOARD, icon: "LayoutDashboard" },
  { label: "Người dùng", href: ROUTES.ADMIN_USERS, icon: "Users" },
  { label: "Danh mục", href: ROUTES.ADMIN_CATEGORIES, icon: "Tag" },
  { label: "Mẫu ngân sách", href: ROUTES.ADMIN_BUDGET_TEMPLATES, icon: "FileText" },
  { label: "Chi tiêu", href: ROUTES.ADMIN_EXPENSES, icon: "Receipt" },
  { label: "Thu nhập", href: ROUTES.ADMIN_INCOMES, icon: "Wallet" },
  { label: "Nhật ký hoạt động", href: ROUTES.ADMIN_ACTIVITY_LOGS, icon: "Activity" },
] as const;

/**
 * Pagination defaults
 */
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
