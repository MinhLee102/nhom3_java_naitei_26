/**
 * Feature: Expense
 * Type definitions cho Expense domain.
 */

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  note?: string | null;
  categoryId: number;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface CreateExpenseDto {
  title: string;
  amount: number;
  categoryId: number;
  date: string;
  note?: string;
}

export type UpdateExpenseDto = Partial<CreateExpenseDto>;

export interface ExpenseFilter {
  categoryId?: number;
  fromDate?: string;
  toDate?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface ExpensePageResponse {
  items: Expense[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}
