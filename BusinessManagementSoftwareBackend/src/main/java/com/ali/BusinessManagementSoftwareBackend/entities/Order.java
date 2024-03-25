package com.ali.BusinessManagementSoftwareBackend.entities;

import com.ali.BusinessManagementSoftwareBackend.dto.OrderDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;
    private LocalDate orderDate;
    private double totalAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OrderDto getOrderDto(){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(id);
        orderDto.setOrderItems(orderItems.stream().map(OrderItem::getOrderItemDto).collect(Collectors.toList())); // Fix: Convert to OrderItemDto list
        orderDto.setOrderDate(orderDate);
        orderDto.setTotalAmount(totalAmount);
        orderDto.setCreatedAt(createdAt);
        orderDto.setUpdatedAt(updatedAt);
        return orderDto;
    }
}
