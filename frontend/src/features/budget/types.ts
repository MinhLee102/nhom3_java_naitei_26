export interface Budget {
  id: string;
  categoryId: string;
  categoryName?: string;
  amount: number;
  spent: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBudgetDto {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}

export interface UpdateBudgetDto extends Partial<CreateBudgetDto> {}
