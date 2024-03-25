package com.ali.BusinessManagementSoftwareBackend.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long id;
    private Long orderId;
    private Long productId;
    private int quantity;
    private double unitPrice;
    private double totalPrice;
}
