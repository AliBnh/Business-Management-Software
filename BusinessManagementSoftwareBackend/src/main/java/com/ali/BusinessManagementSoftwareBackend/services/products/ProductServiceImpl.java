package com.ali.BusinessManagementSoftwareBackend.services.products;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.entities.Category;
import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import com.ali.BusinessManagementSoftwareBackend.repositories.CategoryRepository;
import com.ali.BusinessManagementSoftwareBackend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    public List<ProductDto> getProducts() {
        List<Product> products = productRepository.findAll();

        List<Product> activeProducts = products.stream()
                .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                .toList();

        return activeProducts.stream()
                .map(product -> {
                    ProductDto productDto = product.getProductDto();
                    Category category = product.getCategory();
                    if (category != null) {
                        productDto.setCategoryName(category.getName());
                    }
                    return productDto;
                })
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        return optionalProduct.map(product -> {
            String categoryName = product.getCategory().getName();
            ProductDto productDto = product.getProductDto();
            productDto.setCategoryName(categoryName);
            return productDto;
        }).orElse(null);
    }

    public boolean createProduct(ProductDto productDto) throws IOException {
        if (productRepository.existsByName(productDto.getName())) {
            return false;
        }

            Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        if(optionalCategory.isPresent()){
        try {
            Category category = optionalCategory.get();
            Product product = new Product();
            product.setName(productDto.getName());
            product.setCategory(category);
            product.setCostPrice(productDto.getCostPrice());
            product.setSellingPrice(productDto.getSellingPrice());
            product.setStockQuantity(productDto.getStockQuantity());
            product.setDescription(productDto.getDescription());
            product.setCreatedAt(LocalDateTime.now());
            productRepository.save(product);
            category.getProducts().add(product);
            return true;
        }catch (Exception e){
            return false;
        }}else return false;
    }


    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

    public List<ProductDto> searchProducts(String keyword) {
        List<Product> products = productRepository.findAll();

        // Filter products based on keyword case-insensitively and active status
        List<Product> filteredProducts = products.stream()
                .filter(product -> {
                    String lowerCaseKeyword = keyword.toLowerCase();
                    return (product.getDeactivated() == null || !product.getDeactivated()) &&
                            (product.getName().toLowerCase().contains(lowerCaseKeyword) ||
                                    String.valueOf(product.getCostPrice()).toLowerCase().contains(lowerCaseKeyword) ||
                                    String.valueOf(product.getSellingPrice()).toLowerCase().contains(lowerCaseKeyword) ||
                                    String.valueOf(product.getStockQuantity()).toLowerCase().contains(lowerCaseKeyword) ||
                                    (product.getDescription() != null && product.getDescription().toLowerCase().contains(lowerCaseKeyword)));
                })
                .toList();

        return filteredProducts.stream()
                .map(product -> {
                    ProductDto productDto = product.getProductDto();
                    Category category = product.getCategory();
                    if (category != null) {
                        productDto.setCategoryName(category.getName());
                    }
                    return productDto;
                })
                .collect(Collectors.toList());
    }
    public void deactivateProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        product.setDeactivated(true);
        productRepository.save(product);
    }
    public List<ProductDto> getDeactivatedProducts() {
        List<Product> products = productRepository.findAll();

        List<Product> deactivatedProducts = products.stream()
                .filter(product -> product.getDeactivated() != null && product.getDeactivated())
                .toList();

        return deactivatedProducts.stream()
                .map(product -> {
                    ProductDto productDto = product.getProductDto();
                    Category category = product.getCategory();
                    if (category != null) {
                        productDto.setCategoryName(category.getName());
                    }
                    return productDto;
                })
                .collect(Collectors.toList());
    }
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            List<Product> products = category.getProducts();

            List<Product> activeProducts = products.stream()
                    .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                    .toList();

            return activeProducts.stream()
                    .map(Product::getProductDto)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList(); // Return empty list if category not found
        }
    }


    public boolean updateProduct(Long id, ProductDto productDto){
        Optional<Product> optionalProduct = productRepository.findById(id);
        Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        Category category = optionalCategory.get();
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setDescription(productDto.getDescription());
            product.setCategory(category);
            product.setStockQuantity(productDto.getStockQuantity());
            product.setSellingPrice(productDto.getSellingPrice());
            product.setCostPrice(productDto.getCostPrice());
            product.setName(productDto.getName());
            product.setUpdatedAt(LocalDateTime.now());
            productRepository.save(product);
            return true;
        }else
        {return false;}
    }


}
