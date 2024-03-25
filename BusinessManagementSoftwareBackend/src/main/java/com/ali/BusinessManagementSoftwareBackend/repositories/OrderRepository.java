package com.ali.BusinessManagementSoftwareBackend.repositories;

import com.ali.BusinessManagementSoftwareBackend.entities.Order;
import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByOrderDateBetween(LocalDate startDate, LocalDate endDate);
}
