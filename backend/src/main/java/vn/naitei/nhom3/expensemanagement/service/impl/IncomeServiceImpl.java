package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.Income;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.CategoryType;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.repository.IncomeRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.IncomeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Income> getAllByUser(Long userId) {
        return incomeRepository.findByUserId(userId);
    }

    @Override
    public Income getById(Long id) {
        return incomeRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Income", id));
    }

    @Override
    public Income create(Long userId, Long categoryId, Income income) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        Category category = resolveIncomeCategory(userId, categoryId);
        income.setUser(user);
        income.setCategory(category);
        return incomeRepository.save(income);
    }

    @Override
    public Income update(Long id, Long categoryId, Income updated) {
        Income income = getById(id);
        if (categoryId != null) {
            income.setCategory(resolveIncomeCategory(income.getUser().getId(), categoryId));
        }
        income.setTitle(updated.getTitle());
        income.setAmount(updated.getAmount());
        income.setIncomeDate(updated.getIncomeDate());
        income.setNote(updated.getNote());
        return incomeRepository.save(income);
    }

    @Override
    public void delete(Long id) {
        Income income = getById(id);
        incomeRepository.delete(income);
    }

    private Category resolveIncomeCategory(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
        boolean visibleToUser = category.getUser() == null || category.getUser().getId().equals(userId);
        if (!visibleToUser) {
            throw new BadRequestException("Danh mục không thuộc quyền sử dụng của User này");
        }
        if (category.getType() != CategoryType.INCOME) {
            throw new BadRequestException("Danh mục không phải loại INCOME");
        }
        return category;
    }
}
