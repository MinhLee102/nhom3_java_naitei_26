/**
 * Feature: Income
 * Type definitions cho Income domain.
 */

export interface Income {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  categoryName?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncomeDto {
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export interface UpdateIncomeDto extends Partial<CreateIncomeDto> {}
