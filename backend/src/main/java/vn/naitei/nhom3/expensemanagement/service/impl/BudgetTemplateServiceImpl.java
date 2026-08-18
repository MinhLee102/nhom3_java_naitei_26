package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplate;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.BudgetTemplateRepository;
import vn.naitei.nhom3.expensemanagement.service.BudgetTemplateService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetTemplateServiceImpl implements BudgetTemplateService {

    private final BudgetTemplateRepository budgetTemplateRepository;

    @Override
    public List<BudgetTemplate> getAll() {
        return budgetTemplateRepository.findAll();
    }

    @Override
    public BudgetTemplate getById(Long id) {
        return budgetTemplateRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("BudgetTemplate", id));
    }

    @Override
    public BudgetTemplate create(BudgetTemplate template) {
        return budgetTemplateRepository.save(template);
    }

    @Override
    public BudgetTemplate update(Long id, BudgetTemplate updated) {
        BudgetTemplate template = getById(id);
        template.setName(updated.getName());
        return budgetTemplateRepository.save(template);
    }

    @Override
    public void delete(Long id) {
        BudgetTemplate template = getById(id);
        template.setDeletedAt(LocalDateTime.now());
        budgetTemplateRepository.save(template);
    }
}
