package com.ali.BusinessManagementSoftwareBackend.services.products;

import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;

import java.io.IOException;
import java.util.List;

public interface ProductService {


    public boolean createProduct(ProductDto productDto) throws IOException ;

    public List<ProductDto> getProducts();
    public List<ProductDto> getDeactivatedProducts() ;
    public void deleteProduct(Long id);
    public List<ProductDto> searchProducts(String keyword) ;



    public ProductDto getProductById(Long id);
    public void deactivateProduct(Long productId) ;
    public List<ProductDto> getProductsByCategory(Long categoryId) ;
    public boolean updateProduct(Long id, ProductDto productDto);



    }


