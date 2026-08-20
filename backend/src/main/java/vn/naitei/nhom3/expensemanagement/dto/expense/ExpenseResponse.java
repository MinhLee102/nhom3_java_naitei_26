package vn.naitei.nhom3.expensemanagement.dto.expense;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpenseResponse {

    private final Long id;
    private final String title;
    private final BigDecimal amount;
    private final LocalDate date;
    private final String note;
    private final Long categoryId;
    private final String categoryName;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
}
