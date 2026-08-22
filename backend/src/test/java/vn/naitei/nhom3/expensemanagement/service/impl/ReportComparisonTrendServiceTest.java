package vn.naitei.nhom3.expensemanagement.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import vn.naitei.nhom3.expensemanagement.dto.report.ReportPeriodAmount;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportTrendPoint;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseRepository;
import vn.naitei.nhom3.expensemanagement.repository.IncomeRepository;

@ExtendWith(MockitoExtension.class)
class ReportComparisonTrendServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private IncomeRepository incomeRepository;

    @InjectMocks
    private ReportServiceImpl reportService;

    @Test
    void getComparisonReturnsIncomeExpenseAndBalance() {
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 3, 31);
        when(incomeRepository.sumAmountByUserIdAndIncomeDateBetween(7L, from, to))
                .thenReturn(new BigDecimal("12000000"));
        when(expenseRepository.sumAmountByUserIdAndExpenseDateBetween(7L, from, to))
                .thenReturn(new BigDecimal("4500000"));

        var result = reportService.getComparison(7L, from, to);

        assertEquals(new BigDecimal("12000000"), result.getTotalIncome());
        assertEquals(new BigDecimal("4500000"), result.getTotalExpense());
        assertEquals(new BigDecimal("7500000"), result.getBalance());
        verify(incomeRepository).sumAmountByUserIdAndIncomeDateBetween(7L, from, to);
        verify(expenseRepository).sumAmountByUserIdAndExpenseDateBetween(7L, from, to);
    }

    @Test
    void getTrendCombinesMonthlyTotalsAndIncludesEmptyMonths() {
        LocalDate from = LocalDate.of(2026, 1, 15);
        LocalDate to = LocalDate.of(2026, 3, 2);
        when(incomeRepository.sumMonthlyAmountByUserIdAndIncomeDateBetween(7L, from, to))
                .thenReturn(List.of(new ReportPeriodAmount(2026, 1, new BigDecimal("1000000"))));
        when(expenseRepository.sumMonthlyAmountByUserIdAndExpenseDateBetween(7L, from, to))
                .thenReturn(List.of(new ReportPeriodAmount(2026, 3, new BigDecimal("250000"))));

        List<ReportTrendPoint> result = reportService.getTrend(7L, from, to);

        assertEquals(3, result.size());
        assertTrendPoint(result.get(0), "2026-01", "1000000", "0");
        assertTrendPoint(result.get(1), "2026-02", "0", "0");
        assertTrendPoint(result.get(2), "2026-03", "0", "250000");
    }

    @Test
    void getComparisonRejectsReversedDateRangeBeforeQuerying() {
        assertThrows(BadRequestException.class, () -> reportService.getComparison(
                7L,
                LocalDate.of(2026, 3, 1),
                LocalDate.of(2026, 1, 1)));
    }

        private void assertTrendPoint(
                        ReportTrendPoint point, String period, String income, String expense) {
                assertEquals(period, point.getPeriod());
                assertEquals(new BigDecimal(income), point.getIncome());
                assertEquals(new BigDecimal(expense), point.getExpense());
        }
}