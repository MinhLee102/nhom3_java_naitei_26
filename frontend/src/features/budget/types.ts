export interface Budget {
  id: number;
  userId: number;
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  year: number;
  month: number;
  amount: number;
  spentAmount: number;
  remainingAmount: number;
  percentageSpent: number;
  isOverBudget: boolean;
  alertStatus: "NORMAL" | "WARNING" | "EXCEEDED";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBudgetDto {
  categoryId: number;
  year: number;
  month: number;
  amount: number;
}

export interface UpdateBudgetDto {
  categoryId: number;
  year: number;
  month: number;
  amount: number;
}
