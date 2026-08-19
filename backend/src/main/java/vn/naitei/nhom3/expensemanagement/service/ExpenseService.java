package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseRequest;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseResponse;

import java.util.List;

public interface ExpenseService {

    List<ExpenseResponse> getAllByUser(Long userId);

    ExpenseResponse getById(Long userId, Long id);

    ExpenseResponse create(Long userId, ExpenseRequest request);

    ExpenseResponse update(Long userId, Long id, ExpenseRequest request);

    void delete(Long userId, Long id);
}
