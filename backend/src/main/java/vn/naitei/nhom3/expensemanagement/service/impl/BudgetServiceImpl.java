package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.Budget;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.BudgetRepository;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.BudgetService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Budget> getByUserAndPeriod(Long userId, Short year, Byte month) {
        return budgetRepository.findByUserIdAndYearAndMonth(userId, year, month);
    }

    @Override
    public Budget getById(Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Budget", id));
    }

    @Override
    public Budget createOrUpdate(Long userId, Long categoryId, Budget budget) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
        boolean visibleToUser = category.getUser() == null || category.getUser().getId().equals(userId);
        if (!visibleToUser) {
            throw new BadRequestException("Danh mục không thuộc quyền sử dụng của User này");
        }

        Budget target = budgetRepository
                .findByUserIdAndCategoryIdAndYearAndMonth(userId, categoryId, budget.getYear(), budget.getMonth())
                .orElseGet(Budget::new);
        target.setUser(user);
        target.setCategory(category);
        target.setYear(budget.getYear());
        target.setMonth(budget.getMonth());
        target.setAmount(budget.getAmount());
        return budgetRepository.save(target);
    }

    @Override
    public void delete(Long id) {
        Budget budget = getById(id);
        budgetRepository.delete(budget);
    }
}
