package vn.naitei.nhom3.expensemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplateDetail;

import java.util.List;

public interface BudgetTemplateDetailRepository extends JpaRepository<BudgetTemplateDetail, Long> {

    List<BudgetTemplateDetail> findByTemplateId(Long templateId);
}
