package com.ali.BusinessManagementSoftwareBackend.entities;

import com.ali.BusinessManagementSoftwareBackend.dto.OrderItemDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@NoArgsConstructor
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "order_id")
    private Order order; // Foreign key referencing SalesOrder

    @ManyToOne
    @JoinColumn(name = "product_id") //
    private Product product; // Foreign key referencing Product
    private int quantity;
    private double unitPrice;
    private double totalPrice;
    public double getTotalPrice() {
        return quantity * unitPrice;
    }
    public Long getProductId() {
        return product != null ? product.getId() : null; // Handle null product case (optional)
    }
    public OrderItemDto getOrderItemDto(){
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(id);
        orderItemDto.setOrderId(order.getId());
        if (product!=null) {
            orderItemDto.setProductId(product.getId());
        }
        orderItemDto.setQuantity(quantity);
        orderItemDto.setUnitPrice(unitPrice);
        orderItemDto.setTotalPrice(totalPrice);
        return orderItemDto;
    }
}
