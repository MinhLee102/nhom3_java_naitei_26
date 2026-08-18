package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.Income;

import java.util.List;

public interface IncomeService {

    List<Income> getAllByUser(Long userId);

    Income getById(Long id);

    Income create(Long userId, Long categoryId, Income income);

    Income update(Long id, Long categoryId, Income updated);

    void delete(Long id);
}
