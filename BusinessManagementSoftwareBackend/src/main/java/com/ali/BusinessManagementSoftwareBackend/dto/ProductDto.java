package com.ali.BusinessManagementSoftwareBackend.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Long categoryId;
    private String categoryName;
    private double costPrice;
    private double sellingPrice;
    private int stockQuantity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean deactivated;


}
