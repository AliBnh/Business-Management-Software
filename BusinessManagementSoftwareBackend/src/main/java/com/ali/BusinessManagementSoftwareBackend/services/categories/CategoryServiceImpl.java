package com.ali.BusinessManagementSoftwareBackend.services.categories;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.entities.Category;
import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import com.ali.BusinessManagementSoftwareBackend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    public boolean createCategory(CategoryDto categoryDto) throws IOException {
        if (categoryRepository.existsByName(categoryDto.getName())) {
            return false;
        }
        try {
            Category category = new Category();
            category.setName(categoryDto.getName());
            category.setCreatedAt(LocalDateTime.now());
            categoryRepository.save(category);
            return true;
        }catch (Exception e){
            return false;
        }
    }

//    public List<CategoryDto> getCategories(){
//
//        List<Category> categories = categoryRepository.findAll();
//
//        List<Category> activeCategories = categories.stream()
//                .filter(category -> category.getDeactivated() == null || !category.getDeactivated())
//                .toList();
//
//        return activeCategories.stream()
//                .map(Category::getCategoryDto)
//                .collect(Collectors.toList());
//    }
public List<CategoryDto> getCategories() {
    List<Category> categories = categoryRepository.findAll();

    // Calculate product counts for each category
    Map<Long, Long> categoryProductCounts = categories.stream()
            .collect(Collectors.toMap(Category::getId, category -> countProductsByCategory(category.getId())));

    List<CategoryDto> activeCategoriesWithCounts = categories.stream()
            .filter(category -> category.getDeactivated() == null || !category.getDeactivated())
            .map(category -> {
                CategoryDto categoryDto = category.getCategoryDto();
                long productCount = categoryProductCounts.get(category.getId());
                categoryDto.setProductCount(productCount);
                return categoryDto;
            })
            .collect(Collectors.toList());

    return activeCategoriesWithCounts;
}



    public CategoryDto getCategoryById(Long id){
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        return optionalCategory.map(Category::getCategoryDto).orElse(null );
    }



    public void deactivateCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = categoryRepository.findById(id).orElseThrow();
            category.setDeactivated(true);
            category.getProducts().forEach(product -> product.setDeactivated(true));
            categoryRepository.save(category);
        }else {
            System.out.println("error while deactivation of category");
        }
        }




        public Long countProductsByCategory(Long categoryId) {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                // Filter active products within the category (optional)
                List<Product> activeProducts = category.getProducts().stream()
                        .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                        .toList();
                return (long) activeProducts.size();
            } else {
                return 0L;
            }
    }


    public List<CategoryDto> searchCategory(String name) {
        List<Category> categories = categoryRepository.findAll();

        List<Category> filteredCategories = categories.stream()
                .filter(category -> {
                    String lowerCaseKeyword = name.toLowerCase();
                    return (category.getDeactivated() == null || !category.getDeactivated()) &&
                            (category.getName().toLowerCase().contains(lowerCaseKeyword));
                })
                .toList();

        return filteredCategories.stream()
                .map(Category::getCategoryDto)
                .collect(Collectors.toList());
    }

    public boolean updateCategory(Long id, CategoryDto categoryDto){
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(categoryDto.getName());
            category.setUpdatedAt(LocalDateTime.now());
            categoryRepository.save(category);
            return true;
        }else
        {return false;}
    }

}
