package vn.naitei.nhom3.expensemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.naitei.nhom3.expensemanagement.entity.Expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);

    List<Expense> findByUserIdAndCategoryId(Long userId, Long categoryId);

    @Query("SELECT e.category.id AS categoryId, e.category.name AS categoryName, e.category.icon AS categoryIcon, SUM(e.amount) AS totalAmount " +
           "FROM Expense e WHERE e.user.id = :userId " +
           "GROUP BY e.category.id, e.category.name, e.category.icon " +
           "ORDER BY SUM(e.amount) DESC")
    List<CategoryExpenseSummaryProjection> getExpenseStatisticsByCategory(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId")
    BigDecimal sumTotalExpenseByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId AND e.expenseDate BETWEEN :startDate AND :endDate")
    BigDecimal sumExpenseByUserIdAndDateRange(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId AND e.category.id = :categoryId AND e.expenseDate BETWEEN :startDate AND :endDate")
    BigDecimal sumExpenseByUserIdAndCategoryIdAndDateRange(
            @Param("userId") Long userId,
            @Param("categoryId") Long categoryId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    interface CategoryExpenseSummaryProjection {
        Long getCategoryId();
        String getCategoryName();
        String getCategoryIcon();
        BigDecimal getTotalAmount();
    }
}
