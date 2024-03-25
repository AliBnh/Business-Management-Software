package com.ali.BusinessManagementSoftwareBackend.dto;

import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CategoryDto {

    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long productCount;


}
