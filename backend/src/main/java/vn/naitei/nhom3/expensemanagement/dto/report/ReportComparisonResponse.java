package vn.naitei.nhom3.expensemanagement.dto.report;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportComparisonResponse {

    private final BigDecimal totalIncome;
    private final BigDecimal totalExpense;
    private final BigDecimal balance;
}