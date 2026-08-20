package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseMapper;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseRequest;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseResponse;
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
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> getAllByUser(Long userId) {
        return expenseRepository.findByUserId(userId).stream()
                .map(ExpenseMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponse getById(Long userId, Long id) {
        return ExpenseMapper.toResponse(findOwnedExpense(userId, id));
    }

    @Override
    @Transactional
    public ExpenseResponse create(Long userId, ExpenseRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Người dùng", userId));
        Category category = validateCategory(userId, request.getCategoryId());

        Expense expense = new Expense();
        expense.setUser(user);
        expense.setCategory(category);
        updateExpense(expense, request);

        return ExpenseMapper.toResponse(expenseRepository.save(expense));
    }

    @Override
    @Transactional
    public ExpenseResponse update(Long userId, Long id, ExpenseRequest request) {
        Expense expense = findOwnedExpense(userId, id);
        Category category = validateCategory(userId, request.getCategoryId());

        expense.setCategory(category);
        updateExpense(expense, request);

        return ExpenseMapper.toResponse(expenseRepository.save(expense));
    }

    @Override
    @Transactional
    public void delete(Long userId, Long id) {
        expenseRepository.delete(findOwnedExpense(userId, id));
    }

    private Expense findOwnedExpense(Long userId, Long id) {
        return expenseRepository.findById(id)
                .filter(expense -> expense.getUser().getId().equals(userId))
                .orElseThrow(() -> ResourceNotFoundException.of("Khoản chi", id));
    }

    private Category validateCategory(Long userId, Long categoryId) {
        return categoryRepository.findVisibleToUserAndType(userId, CategoryType.EXPENSE).stream()
                .filter(category -> category.getId().equals(categoryId))
                .findFirst()
                .orElseThrow(() -> new BadRequestException("Danh mục khoản chi không hợp lệ"));
    }

    private void updateExpense(Expense expense, ExpenseRequest request) {
        expense.setTitle(request.getTitle().trim());
        expense.setAmount(request.getAmount());
        expense.setExpenseDate(request.getDate());
        expense.setNote(request.getNote());
    }
}
