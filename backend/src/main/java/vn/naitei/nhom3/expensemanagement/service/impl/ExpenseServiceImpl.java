package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.Expense;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.CategoryType;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.ExpenseService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Expense> getAllByUser(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    @Override
    public Expense getById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Expense", id));
    }

    @Override
    public Expense create(Long userId, Long categoryId, Expense expense) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        Category category = resolveExpenseCategory(userId, categoryId);
        expense.setUser(user);
        expense.setCategory(category);
        return expenseRepository.save(expense);
    }

    @Override
    public Expense update(Long id, Long categoryId, Expense updated) {
        Expense expense = getById(id);
        if (categoryId != null) {
            expense.setCategory(resolveExpenseCategory(expense.getUser().getId(), categoryId));
        }
        expense.setTitle(updated.getTitle());
        expense.setAmount(updated.getAmount());
        expense.setExpenseDate(updated.getExpenseDate());
        expense.setNote(updated.getNote());
        return expenseRepository.save(expense);
    }

    @Override
    public void delete(Long id) {
        Expense expense = getById(id);
        expenseRepository.delete(expense);
    }

    private Category resolveExpenseCategory(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
        boolean visibleToUser = category.getUser() == null || category.getUser().getId().equals(userId);
        if (!visibleToUser) {
            throw new BadRequestException("Danh mục không thuộc quyền sử dụng của User này");
        }
        if (category.getType() != CategoryType.EXPENSE) {
            throw new BadRequestException("Danh mục không phải loại EXPENSE");
        }
        return category;
    }
}
