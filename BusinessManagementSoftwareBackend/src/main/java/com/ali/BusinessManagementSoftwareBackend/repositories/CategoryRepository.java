package com.ali.BusinessManagementSoftwareBackend.repositories;

import com.ali.BusinessManagementSoftwareBackend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CategoryRepository extends JpaRepository<Category,Long> {
    boolean existsByName(String name);
}
