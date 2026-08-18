package vn.naitei.nhom3.expensemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.naitei.nhom3.expensemanagement.entity.ExpenseAttachment;

import java.util.List;

public interface ExpenseAttachmentRepository extends JpaRepository<ExpenseAttachment, Long> {

    List<ExpenseAttachment> findByExpenseId(Long expenseId);
}
