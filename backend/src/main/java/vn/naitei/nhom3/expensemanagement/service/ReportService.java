package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.report.ReportSummaryResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportComparisonResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportTrendPoint;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {

    ReportSummaryResponse getSummary(Long userId, LocalDate from, LocalDate to);

    ReportComparisonResponse getComparison(Long userId, LocalDate from, LocalDate to);

    List<ReportTrendPoint> getTrend(Long userId, LocalDate from, LocalDate to);
}