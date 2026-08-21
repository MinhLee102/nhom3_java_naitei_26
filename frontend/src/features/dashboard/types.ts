export interface CategoryExpense {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  totalAmount: number;
  percentage: number;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  remainingBalance: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  currentMonthBalance: number;
}
