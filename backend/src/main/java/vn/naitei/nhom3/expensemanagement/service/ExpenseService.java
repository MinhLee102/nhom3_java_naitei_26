package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.Expense;

import java.util.List;

public interface ExpenseService {

    List<Expense> getAllByUser(Long userId);

    Expense getById(Long id);

    Expense create(Long userId, Long categoryId, Expense expense);

    Expense update(Long id, Long categoryId, Expense updated);

    void delete(Long id);
}
