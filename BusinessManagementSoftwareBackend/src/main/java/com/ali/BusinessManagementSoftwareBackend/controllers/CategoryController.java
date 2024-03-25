package com.ali.BusinessManagementSoftwareBackend.controllers;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.services.categories.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories(){
        List<CategoryDto> categoryDtoList=  categoryService.getCategories();
        return ResponseEntity.ok(categoryDtoList);
    }

    @PostMapping("/categories")
    public ResponseEntity<Void> createCategory (@RequestBody CategoryDto categoryDto) throws IOException {
        boolean success = categoryService.createCategory(categoryDto);
        if (success)return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<Void> deleteCategory (@PathVariable Long id) {
        categoryService.deactivateCategory(id);
        return ResponseEntity.ok(null);
    }
    @GetMapping("/category/{id}")
    public ResponseEntity<CategoryDto> getCategoryById (@PathVariable Long id) {
        CategoryDto categoryDto = categoryService.getCategoryById(id);
        return ResponseEntity.ok(categoryDto);
    }



        @GetMapping("/categories/productsCount/{categoryId}")
    public ResponseEntity<Long> countProductsByCategory(@PathVariable Long categoryId) {
        Long productCount = categoryService.countProductsByCategory(categoryId);
        return ResponseEntity.ok(productCount);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Void> updateCategory (@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
    try{
        boolean success = categoryService.updateCategory(id,categoryDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }catch (Exception e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    }

    @GetMapping("/categories/search/{searchTerm}")
    public ResponseEntity<List<CategoryDto>> searchProducts(@PathVariable String searchTerm) {
        List<CategoryDto> searchResults = categoryService.searchCategory(searchTerm);
        return ResponseEntity.ok(searchResults);
    }

}
