package vn.naitei.nhom3.expensemanagement.dto.report;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportTrendPoint {

    private final String period;
    private final BigDecimal income;
    private final BigDecimal expense;
}