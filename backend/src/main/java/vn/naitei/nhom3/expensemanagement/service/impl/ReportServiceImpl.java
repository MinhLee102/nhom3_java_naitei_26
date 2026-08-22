package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportSummaryResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportComparisonResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportPeriodAmount;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportTrendPoint;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseRepository;
import vn.naitei.nhom3.expensemanagement.repository.IncomeRepository;
import vn.naitei.nhom3.expensemanagement.service.ReportService;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;

    @Override
    @Transactional(readOnly = true)
    public ReportSummaryResponse getSummary(Long userId, LocalDate from, LocalDate to) {
        validateRequest(userId, from, to);

        BigDecimal totalExpense = zeroIfNull(expenseRepository
            .sumAmountByUserIdAndExpenseDateBetween(userId, from, to));
        BigDecimal totalIncome = zeroIfNull(incomeRepository
            .sumAmountByUserIdAndIncomeDateBetween(userId, from, to));

        return new ReportSummaryResponse(
                totalIncome,
                totalExpense,
                expenseRepository.sumAmountByCategoryAndUserIdAndExpenseDateBetween(userId, from, to));
    }

            @Override
            @Transactional(readOnly = true)
            public ReportComparisonResponse getComparison(Long userId, LocalDate from, LocalDate to) {
            validateRequest(userId, from, to);

            BigDecimal totalIncome = zeroIfNull(incomeRepository
                .sumAmountByUserIdAndIncomeDateBetween(userId, from, to));
            BigDecimal totalExpense = zeroIfNull(expenseRepository
                .sumAmountByUserIdAndExpenseDateBetween(userId, from, to));
            return new ReportComparisonResponse(totalIncome, totalExpense, totalIncome.subtract(totalExpense));
            }

            @Override
            @Transactional(readOnly = true)
            public List<ReportTrendPoint> getTrend(Long userId, LocalDate from, LocalDate to) {
            validateRequest(userId, from, to);

            Map<YearMonth, BigDecimal> incomeByMonth = toMonthlyAmounts(
                incomeRepository.sumMonthlyAmountByUserIdAndIncomeDateBetween(userId, from, to));
            Map<YearMonth, BigDecimal> expenseByMonth = toMonthlyAmounts(
                expenseRepository.sumMonthlyAmountByUserIdAndExpenseDateBetween(userId, from, to));

            List<ReportTrendPoint> trend = new java.util.ArrayList<>();
            YearMonth current = YearMonth.from(from);
            YearMonth last = YearMonth.from(to);
            while (!current.isAfter(last)) {
                trend.add(new ReportTrendPoint(
                    current.toString(),
                    incomeByMonth.getOrDefault(current, BigDecimal.ZERO),
                    expenseByMonth.getOrDefault(current, BigDecimal.ZERO)));
                current = current.plusMonths(1);
            }
            return trend;
            }

    private void validateRequest(Long userId, LocalDate from, LocalDate to) {
        if (userId == null || userId <= 0) {
            throw new BadRequestException("User id must be positive");
        }
        if (from == null || to == null) {
            throw new BadRequestException("Date range is required");
        }
        if (from.isAfter(to)) {
            throw new BadRequestException("Start date must not be after end date");
        }
    }

    private BigDecimal zeroIfNull(BigDecimal amount) {
        return amount == null ? BigDecimal.ZERO : amount;
    }

    private Map<YearMonth, BigDecimal> toMonthlyAmounts(List<ReportPeriodAmount> amounts) {
        Map<YearMonth, BigDecimal> result = new HashMap<>();
        for (ReportPeriodAmount amount : amounts) {
            result.put(YearMonth.of(amount.getYear(), amount.getMonth()), zeroIfNull(amount.getAmount()));
        }
        return result;
    }
}