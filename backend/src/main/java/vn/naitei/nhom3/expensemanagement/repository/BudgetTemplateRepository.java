package vn.naitei.nhom3.expensemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.naitei.nhom3.expensemanagement.entity.BudgetTemplate;

public interface BudgetTemplateRepository extends JpaRepository<BudgetTemplate, Long> {
}
