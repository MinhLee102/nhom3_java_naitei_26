package vn.naitei.nhom3.expensemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.enums.CategoryType;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserIsNullAndTypeAndDeletedAtIsNullOrderByIdAsc(CategoryType type);

    List<Category> findByUserIdIsNull();

    List<Category> findByUserId(Long userId);

    /**
     * Danh mục mà User được phép dùng: danh mục hệ thống (user_id NULL) + danh mục riêng của User.
     */
    @Query("SELECT c FROM Category c WHERE c.user.id IS NULL OR c.user.id = :userId")
    List<Category> findVisibleToUser(@Param("userId") Long userId);

    @Query("SELECT c FROM Category c WHERE (c.user.id IS NULL OR c.user.id = :userId) AND c.type = :type")
    List<Category> findVisibleToUserAndType(@Param("userId") Long userId, @Param("type") CategoryType type);
}
