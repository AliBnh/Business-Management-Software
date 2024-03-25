package com.ali.BusinessManagementSoftwareBackend.entities;

import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(
            unique = true,
            nullable = false
    )
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Category category;

    private double costPrice;
    private double sellingPrice;
    private int stockQuantity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Column(nullable = true)
    private Boolean deactivated = false;


    public ProductDto getProductDto(){
        ProductDto productDto = new ProductDto();
        productDto.setId(id);
        productDto.setName(name);
        productDto.setDescription(description);
        productDto.setCategoryId(category.getId());
        productDto.setCostPrice(costPrice);
        productDto.setSellingPrice(sellingPrice);
        productDto.setStockQuantity(stockQuantity);
        productDto.setDeactivated(deactivated);
        productDto.setCreatedAt(createdAt);
        productDto.setUpdatedAt(updatedAt);

        Category category = getCategory();
        if (category != null) {
            productDto.setCategoryName(category.getName());
        }

        return productDto;
    }



}
