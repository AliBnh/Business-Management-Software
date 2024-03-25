package com.ali.BusinessManagementSoftwareBackend.services.categories;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    boolean createCategory(CategoryDto categoryDto) throws IOException;
    List<CategoryDto> getCategories();
    void deactivateCategory(Long id);
    CategoryDto getCategoryById(Long id);
    boolean updateCategory(Long id, CategoryDto categoryDto);
    public Long countProductsByCategory(Long categoryId) ;
    public List<CategoryDto> searchCategory(String name) ;



    }
