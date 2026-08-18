package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.Category;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.CategoryType;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.CategoryRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.CategoryService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public List<Category> getVisibleToUser(Long userId) {
        return categoryRepository.findVisibleToUser(userId);
    }

    @Override
    public List<Category> getVisibleToUserByType(Long userId, CategoryType type) {
        return categoryRepository.findVisibleToUserAndType(userId, type);
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", id));
    }

    @Override
    public Category create(Long userId, Category category) {
        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
            category.setUser(user);
        } else {
            category.setUser(null);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Long id, Category updated) {
        Category category = getById(id);
        category.setName(updated.getName());
        category.setDescription(updated.getDescription());
        category.setIcon(updated.getIcon());
        category.setType(updated.getType());
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        Category category = getById(id);
        category.setDeletedAt(LocalDateTime.now());
        categoryRepository.save(category);
    }
}
