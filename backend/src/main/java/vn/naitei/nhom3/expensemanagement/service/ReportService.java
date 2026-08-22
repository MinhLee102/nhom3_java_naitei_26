package vn.naitei.nhom3.expensemanagement.service;

import java.time.LocalDate;
import java.util.List;

import vn.naitei.nhom3.expensemanagement.dto.report.ReportComparisonResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportSummaryResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportTrendPoint;

public interface ReportService {

    ReportSummaryResponse getSummary(Long userId, LocalDate from, LocalDate to);

    ReportComparisonResponse getComparison(Long userId, LocalDate from, LocalDate to);

    List<ReportTrendPoint> getTrend(Long userId, LocalDate from, LocalDate to);
}