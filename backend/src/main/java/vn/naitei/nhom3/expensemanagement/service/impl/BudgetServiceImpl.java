package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetRequest;
import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetResponse;
import vn.naitei.nhom3.expensemanagement.entity.Budget;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.CategoryType;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.BudgetRepository;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.BudgetService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BudgetResponse> getBudgets(Long userId, Short year, Byte month) {
        List<Budget> budgets;
        if (year != null && month != null) {
            budgets = budgetRepository.findByUserIdAndYearAndMonth(userId, year, month);
        } else if (year != null) {
            budgets = budgetRepository.findByUserIdAndYear(userId, year);
        } else {
            budgets = budgetRepository.findByUserId(userId);
        }

        return budgets.stream()
                .map(budget -> mapToResponse(budget, userId))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BudgetResponse getById(Long userId, Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ngân sách"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy ngân sách");
        }

        return mapToResponse(budget, userId);
    }

    @Override
    public BudgetResponse create(Long userId, BudgetRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        Category category = validateCategory(userId, request.getCategoryId());

        boolean exists = budgetRepository.existsByUserIdAndCategoryIdAndYearAndMonth(
                userId, request.getCategoryId(), request.getYear(), request.getMonth());
        if (exists) {
            throw new BadRequestException("Ngân sách cho danh mục " + category.getName() +
                    " trong tháng " + request.getMonth() + "/" + request.getYear() + " đã tồn tại");
        }

        Budget budget = new Budget();
        budget.setUser(user);
        budget.setCategory(category);
        budget.setYear(request.getYear());
        budget.setMonth(request.getMonth());
        budget.setAmount(request.getAmount());

        Budget saved = budgetRepository.save(budget);
        return mapToResponse(saved, userId);
    }

    @Override
    public BudgetResponse update(Long userId, Long id, BudgetRequest request) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ngân sách"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy ngân sách");
        }

        Category category = validateCategory(userId, request.getCategoryId());

        // Check if updating to another category/year/month that conflicts with another record
        Optional<Budget> existing = budgetRepository.findByUserIdAndCategoryIdAndYearAndMonth(
                userId, request.getCategoryId(), request.getYear(), request.getMonth());
        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            throw new BadRequestException("Ngân sách cho danh mục " + category.getName() +
                    " trong tháng " + request.getMonth() + "/" + request.getYear() + " đã tồn tại");
        }

        budget.setCategory(category);
        budget.setYear(request.getYear());
        budget.setMonth(request.getMonth());
        budget.setAmount(request.getAmount());

        Budget updated = budgetRepository.save(budget);
        return mapToResponse(updated, userId);
    }

    @Override
    public void delete(Long userId, Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ngân sách"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy ngân sách");
        }

        budgetRepository.delete(budget);
    }

    private Category validateCategory(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục"));

        if (category.getDeletedAt() != null) {
            throw new BadRequestException("Danh mục này đã bị xóa");
        }

        if (category.getType() != CategoryType.EXPENSE) {
            throw new BadRequestException("Ngân sách chỉ được thiết lập cho danh mục Chi tiêu (EXPENSE)");
        }

        if (category.getUser() != null && !category.getUser().getId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền sử dụng danh mục này");
        }

        return category;
    }

    private BudgetResponse mapToResponse(Budget budget, Long userId) {
        YearMonth ym = YearMonth.of(budget.getYear(), budget.getMonth());
        LocalDate startDate = ym.atDay(1);
        LocalDate endDate = ym.atEndOfMonth();

        BigDecimal spentAmount = expenseRepository.sumExpenseByUserIdAndCategoryIdAndDateRange(
                userId, budget.getCategory().getId(), startDate, endDate);

        BigDecimal remainingAmount = budget.getAmount().subtract(spentAmount);
        boolean isOverBudget = spentAmount.compareTo(budget.getAmount()) > 0;

        double percentageSpent = 0.0;
        if (budget.getAmount().compareTo(BigDecimal.ZERO) > 0) {
            percentageSpent = spentAmount.multiply(BigDecimal.valueOf(100))
                    .divide(budget.getAmount(), 2, RoundingMode.HALF_UP)
                    .doubleValue();
        }

        return BudgetResponse.builder()
                .id(budget.getId())
                .userId(budget.getUser().getId())
                .categoryId(budget.getCategory().getId())
                .categoryName(budget.getCategory().getName())
                .categoryIcon(budget.getCategory().getIcon())
                .year(budget.getYear())
                .month(budget.getMonth())
                .amount(budget.getAmount())
                .spentAmount(spentAmount)
                .remainingAmount(remainingAmount)
                .percentageSpent(percentageSpent)
                .isOverBudget(isOverBudget)
                .createdAt(budget.getCreatedAt())
                .updatedAt(budget.getUpdatedAt())
                .build();
    }
}
