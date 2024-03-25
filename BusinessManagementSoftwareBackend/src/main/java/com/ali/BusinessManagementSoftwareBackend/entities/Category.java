package com.ali.BusinessManagementSoftwareBackend.entities;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            unique = true,
            nullable = false
    )
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean deactivated= false;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> products;



    public CategoryDto getCategoryDto(){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(id);
        categoryDto.setName(name);
        categoryDto.setCreatedAt(createdAt);
        categoryDto.setUpdatedAt(updatedAt);
        return categoryDto;
    }

}
