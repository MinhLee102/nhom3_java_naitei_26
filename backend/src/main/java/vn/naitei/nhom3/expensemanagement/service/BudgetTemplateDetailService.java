package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplateDetail;

import java.util.List;

public interface BudgetTemplateDetailService {

    List<BudgetTemplateDetail> getByTemplateId(Long templateId);

    BudgetTemplateDetail getById(Long id);

    BudgetTemplateDetail create(Long templateId, Long categoryId, BudgetTemplateDetail detail);

    BudgetTemplateDetail update(Long id, BudgetTemplateDetail updated);

    void delete(Long id);
}
