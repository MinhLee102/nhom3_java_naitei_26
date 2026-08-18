package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.ExpenseAttachment;

import java.util.List;

public interface ExpenseAttachmentService {

    List<ExpenseAttachment> getByExpenseId(Long expenseId);

    ExpenseAttachment getById(Long id);

    ExpenseAttachment create(Long expenseId, ExpenseAttachment attachment);

    void delete(Long id);
}
