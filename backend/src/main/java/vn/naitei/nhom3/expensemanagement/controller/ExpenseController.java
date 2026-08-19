package vn.naitei.nhom3.expensemanagement.controller;

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
import org.springframework.web.bind.annotation.RestController;
import vn.naitei.nhom3.expensemanagement.common.response.ApiResponse;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseRequest;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseResponse;
import vn.naitei.nhom3.expensemanagement.security.UserPrincipal;
import vn.naitei.nhom3.expensemanagement.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ApiResponse<ExpenseResponse>> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.create(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED, "Tạo chi tiêu thành công", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponse>> getById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        ExpenseResponse response = expenseService.getById(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponse>> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.update(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thành công", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        expenseService.delete(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Xoá thành công", null));
    }
}
