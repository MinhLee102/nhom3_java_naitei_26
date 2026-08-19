export interface Category {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  type: "EXPENSE" | "INCOME";
  icon?: string;
  color?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
