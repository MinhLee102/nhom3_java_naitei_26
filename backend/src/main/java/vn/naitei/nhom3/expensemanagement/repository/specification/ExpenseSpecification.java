package vn.naitei.nhom3.expensemanagement.repository.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import vn.naitei.nhom3.expensemanagement.dto.expense.ExpenseFilterRequest;
import vn.naitei.nhom3.expensemanagement.entity.Expense;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.function.Function;

public final class ExpenseSpecification {

    private ExpenseSpecification() {
    }

    public static Specification<Expense> filterBy(Long userId, ExpenseFilterRequest filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));

            addSearchPredicate(filter, predicates, root.get("title"), criteriaBuilder);
            addOptionalPredicate(predicates, filter.getCategoryId(),
                    value -> criteriaBuilder.equal(root.get("category").get("id"), value));
            addOptionalPredicate(predicates, filter.getFromDate(),
                    value -> criteriaBuilder.greaterThanOrEqualTo(root.get("expenseDate"), value));
            addOptionalPredicate(predicates, filter.getToDate(),
                    value -> criteriaBuilder.lessThanOrEqualTo(root.get("expenseDate"), value));
            addOptionalPredicate(predicates, filter.getMinAmount(),
                    value -> criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), value));
            addOptionalPredicate(predicates, filter.getMaxAmount(),
                    value -> criteriaBuilder.lessThanOrEqualTo(root.get("amount"), value));

            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        };
    }

    private static void addSearchPredicate(
            ExpenseFilterRequest filter,
            List<Predicate> predicates,
            Path<String> titlePath,
            CriteriaBuilder criteriaBuilder) {
        if (filter.getSearch() == null || filter.getSearch().isBlank()) {
            return;
        }
        String search = filter.getSearch().trim().toLowerCase(Locale.ROOT);
        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(titlePath), "%" + search + "%"));
    }

    private static <T> void addOptionalPredicate(
            List<Predicate> predicates,
            T value,
            Function<T, Predicate> predicateFactory) {
        if (value != null) {
            predicates.add(predicateFactory.apply(value));
        }
    }
}
