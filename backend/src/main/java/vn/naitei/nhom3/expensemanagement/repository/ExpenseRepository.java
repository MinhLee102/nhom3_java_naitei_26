package vn.naitei.nhom3.expensemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportCategoryResponse;
import vn.naitei.nhom3.expensemanagement.entity.Expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense> {

    List<Expense> findByUserId(Long userId);

    List<Expense> findByUserIdAndCategoryId(Long userId, Long categoryId);

        @Query("""
            SELECT COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user.id = :userId
              AND e.expenseDate BETWEEN :from AND :to
            """)
        BigDecimal sumAmountByUserIdAndExpenseDateBetween(
            @Param("userId") Long userId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to);

        @Query("""
            SELECT new vn.naitei.nhom3.expensemanagement.dto.report.ReportCategoryResponse(
            c.id, c.name, SUM(e.amount))
            FROM Expense e
            JOIN e.category c
            WHERE e.user.id = :userId
              AND e.expenseDate BETWEEN :from AND :to
            GROUP BY c.id, c.name
            ORDER BY c.id
            """)
        List<ReportCategoryResponse> sumAmountByCategoryAndUserIdAndExpenseDateBetween(
            @Param("userId") Long userId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to);
}
