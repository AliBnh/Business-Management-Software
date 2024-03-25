package com.ali.BusinessManagementSoftwareBackend.dto;

import com.ali.BusinessManagementSoftwareBackend.entities.OrderItem;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private List<OrderItemDto> orderItems;
    private LocalDate orderDate;
    private double totalAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
