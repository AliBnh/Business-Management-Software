package com.ali.BusinessManagementSoftwareBackend.controllers;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.services.categories.CategoryService;
import com.ali.BusinessManagementSoftwareBackend.services.products.ProductService;
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
public class ProductController {


        private final ProductService productService;
        @GetMapping("/products")
        public ResponseEntity<List<ProductDto>> getProducts(){
            List<ProductDto> productDtoList=  productService.getProducts();
            return ResponseEntity.ok(productDtoList);
        }

        @GetMapping("/deactivatedProducts")
        public ResponseEntity<List<ProductDto>> getDeactivatedProducts(){
            List<ProductDto> productDtoList=  productService.getDeactivatedProducts();
            return ResponseEntity.ok(productDtoList);
        }

        @PostMapping("/products")
        public ResponseEntity<Void> createProduct (@RequestBody ProductDto productDto) throws IOException {
            boolean success = productService.createProduct(productDto);
            if (success)return ResponseEntity.status(HttpStatus.CREATED).build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct (@PathVariable Long id) {
        productService.deactivateProduct(id);
        return ResponseEntity.ok(null);
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDto> getProductById (@PathVariable Long id) {
        ProductDto productDto = productService.getProductById(id);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/products/category/{categoryId}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDto> productDtoList = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(productDtoList);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Void> updateProduct (@PathVariable Long id, @RequestBody ProductDto productDto) {
        try{
            boolean success = productService.updateProduct(id,productDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping("/products/search/{searchTerm}")
    public ResponseEntity<List<ProductDto>> searchProducts(@PathVariable String searchTerm) {
        List<ProductDto> searchResults = productService.searchProducts(searchTerm);
        return ResponseEntity.ok(searchResults);
    }






}
