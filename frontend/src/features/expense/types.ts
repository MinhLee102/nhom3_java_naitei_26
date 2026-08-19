/**
 * Feature: Expense
 * Type definitions cho Expense domain.
 */

export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  categoryName?: string;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseDto {
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export interface UpdateExpenseDto extends Partial<CreateExpenseDto> {}

export interface ExpenseFilter {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  keyword?: string;
  page?: number;
  size?: number;
}
