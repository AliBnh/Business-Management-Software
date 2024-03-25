package com.ali.BusinessManagementSoftwareBackend.repositories;

import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    boolean existsByName(String name);

    List<Product> findAllByDeactivatedIsFalse();
}
