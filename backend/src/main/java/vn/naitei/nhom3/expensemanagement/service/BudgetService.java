package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetRequest;
import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetResponse;

import java.util.List;

public interface BudgetService {

    List<BudgetResponse> getBudgets(Long userId, Short year, Byte month);

    BudgetResponse getById(Long userId, Long id);

    BudgetResponse create(Long userId, BudgetRequest request);

    BudgetResponse update(Long userId, Long id, BudgetRequest request);

    void delete(Long userId, Long id);
}
