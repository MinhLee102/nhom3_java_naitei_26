package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplate;
import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplateDetail;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.BudgetTemplateDetailRepository;
import vn.naitei.nhom3.expensemanagement.repository.BudgetTemplateRepository;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.service.BudgetTemplateDetailService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetTemplateDetailServiceImpl implements BudgetTemplateDetailService {

    private final BudgetTemplateDetailRepository budgetTemplateDetailRepository;
    private final BudgetTemplateRepository budgetTemplateRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<BudgetTemplateDetail> getByTemplateId(Long templateId) {
        return budgetTemplateDetailRepository.findByTemplateId(templateId);
    }

    @Override
    public BudgetTemplateDetail getById(Long id) {
        return budgetTemplateDetailRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("BudgetTemplateDetail", id));
    }

    @Override
    public BudgetTemplateDetail create(Long templateId, Long categoryId, BudgetTemplateDetail detail) {
        BudgetTemplate template = budgetTemplateRepository.findById(templateId)
                .orElseThrow(() -> ResourceNotFoundException.of("BudgetTemplate", templateId));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
        detail.setTemplate(template);
        detail.setCategory(category);
        return budgetTemplateDetailRepository.save(detail);
    }

    @Override
    public BudgetTemplateDetail update(Long id, BudgetTemplateDetail updated) {
        BudgetTemplateDetail detail = getById(id);
        detail.setAmount(updated.getAmount());
        return budgetTemplateDetailRepository.save(detail);
    }

    @Override
    public void delete(Long id) {
        BudgetTemplateDetail detail = getById(id);
        budgetTemplateDetailRepository.delete(detail);
    }
}
