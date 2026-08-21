package vn.naitei.nhom3.expensemanagement.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.naitei.nhom3.expensemanagement.common.response.ApiResponse;
import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetRequest;
import vn.naitei.nhom3.expensemanagement.dto.budget.BudgetResponse;
import vn.naitei.nhom3.expensemanagement.security.UserPrincipal;
import vn.naitei.nhom3.expensemanagement.service.BudgetService;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@Tag(name = "Budgets", description = "APIs for managing user monthly budgets and alert thresholds")
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping
    @Operation(summary = "Get list of budgets for authenticated user, optionally filtered by year and month")
    public ResponseEntity<ApiResponse<List<BudgetResponse>>> getBudgets(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) Short year,
            @RequestParam(required = false) Byte month) {
        List<BudgetResponse> data = budgetService.getBudgets(userPrincipal.getId(), year, month);
        return ResponseEntity.ok(ApiResponse.success("Thành công", data));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get budget details by ID")
    public ResponseEntity<ApiResponse<BudgetResponse>> getById(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id) {
        BudgetResponse data = budgetService.getById(userPrincipal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Thành công", data));
    }

    @PostMapping
    @Operation(summary = "Create a new budget limit for a category in a specific month/year")
    public ResponseEntity<ApiResponse<BudgetResponse>> create(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody BudgetRequest request) {
        BudgetResponse data = budgetService.create(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED, "Tạo ngân sách thành công", data));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update budget limit amount or category by ID")
    public ResponseEntity<ApiResponse<BudgetResponse>> update(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequest request) {
        BudgetResponse data = budgetService.update(userPrincipal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật ngân sách thành công", data));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a budget limit by ID")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id) {
        budgetService.delete(userPrincipal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Xóa ngân sách thành công", null));
    }
}
