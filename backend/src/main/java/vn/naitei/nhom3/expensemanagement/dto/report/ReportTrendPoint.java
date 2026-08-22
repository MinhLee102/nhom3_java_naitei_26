package vn.naitei.nhom3.expensemanagement.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ReportTrendPoint {

    private final String period;
    private final BigDecimal income;
    private final BigDecimal expense;
}