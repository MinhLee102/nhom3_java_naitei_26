package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.Expense;
import vn.naitei.nhom3.expensemanagement.entity.ExpenseAttachment;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseAttachmentRepository;
import vn.naitei.nhom3.expensemanagement.repository.ExpenseRepository;
import vn.naitei.nhom3.expensemanagement.service.ExpenseAttachmentService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseAttachmentServiceImpl implements ExpenseAttachmentService {

    private final ExpenseAttachmentRepository expenseAttachmentRepository;
    private final ExpenseRepository expenseRepository;

    @Override
    public List<ExpenseAttachment> getByExpenseId(Long expenseId) {
        return expenseAttachmentRepository.findByExpenseId(expenseId);
    }

    @Override
    public ExpenseAttachment getById(Long id) {
        return expenseAttachmentRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("ExpenseAttachment", id));
    }

    @Override
    public ExpenseAttachment create(Long expenseId, ExpenseAttachment attachment) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> ResourceNotFoundException.of("Expense", expenseId));
        attachment.setExpense(expense);
        return expenseAttachmentRepository.save(attachment);
    }

    @Override
    public void delete(Long id) {
        ExpenseAttachment attachment = getById(id);
        expenseAttachmentRepository.delete(attachment);
    }
}
