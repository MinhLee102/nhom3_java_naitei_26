package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.report.ReportSummaryResponse;

public interface ReportService {

    ReportSummaryResponse getSummary(Long userId);
}