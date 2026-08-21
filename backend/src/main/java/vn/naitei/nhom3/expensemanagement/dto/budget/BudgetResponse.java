package vn.naitei.nhom3.expensemanagement.dto.budget;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetResponse {

    private Long id;
    private Long userId;
    private Long categoryId;
    private String categoryName;
    private String categoryIcon;
    private Short year;
    private Byte month;
    private BigDecimal amount;
    private BigDecimal spentAmount;
    private BigDecimal remainingAmount;
    private Double percentageSpent;
    private Boolean isOverBudget;
    private String alertStatus; // NORMAL, WARNING, EXCEEDED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
