package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.Budget;

import java.util.List;

public interface BudgetService {

    List<Budget> getByUserAndPeriod(Long userId, Short year, Byte month);

    Budget getById(Long id);

    /**
     * Tạo mới hoặc cập nhật budget nếu User đã đặt ngân sách cho category + kỳ (year, month) đó rồi.
     */
    Budget createOrUpdate(Long userId, Long categoryId, Budget budget);

    void delete(Long id);
}
