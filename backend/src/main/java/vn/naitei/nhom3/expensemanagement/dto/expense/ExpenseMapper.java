package vn.naitei.nhom3.expensemanagement.dto.expense;

import vn.naitei.nhom3.expensemanagement.entity.Expense;

public final class ExpenseMapper {

    private ExpenseMapper() {
    }

    public static ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                expense.getExpenseDate(),
                expense.getNote(),
                expense.getCategory().getId(),
                expense.getCategory().getName(),
                expense.getCreatedAt(),
                expense.getUpdatedAt());
    }
}
