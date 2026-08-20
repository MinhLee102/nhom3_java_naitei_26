package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseFilterRequest;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpensePageResponse;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseRequest;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseResponse;

public interface ExpenseService {

    ExpensePageResponse getAllByUser(Long userId, ExpenseFilterRequest filter);

    ExpenseResponse getById(Long userId, Long id);

    ExpenseResponse create(Long userId, ExpenseRequest request);

    ExpenseResponse update(Long userId, Long id, ExpenseRequest request);

    void delete(Long userId, Long id);
}
