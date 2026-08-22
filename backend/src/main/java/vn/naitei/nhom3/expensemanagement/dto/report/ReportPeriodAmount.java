package vn.naitei.nhom3.expensemanagement.dto.report;

import java.math.BigDecimal;

import lombok.Getter;

/** Aggregated amount for one calendar month, used by the report trend data layer. */
@Getter
public class ReportPeriodAmount {

    private final int year;
    private final int month;
    private final BigDecimal amount;

    public ReportPeriodAmount(int year, int month, BigDecimal amount) {
        this.year = year;
        this.month = month;
        this.amount = amount;
    }
}