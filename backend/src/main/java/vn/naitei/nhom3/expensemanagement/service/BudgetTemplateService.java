package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplate;

import java.util.List;

/**
 * Quản lý mẫu ngân sách (Budget Template) - chỉ dành cho Admin, kiểm tra quyền ở tầng Security/Controller.
 */
public interface BudgetTemplateService {

    List<BudgetTemplate> getAll();

    BudgetTemplate getById(Long id);

    BudgetTemplate create(BudgetTemplate template);

    BudgetTemplate update(Long id, BudgetTemplate updated);

    void delete(Long id);
}
