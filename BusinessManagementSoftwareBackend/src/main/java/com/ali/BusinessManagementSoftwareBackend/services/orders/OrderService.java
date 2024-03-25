package com.ali.BusinessManagementSoftwareBackend.services.orders;

import com.ali.BusinessManagementSoftwareBackend.dto.OrderDto;
import com.ali.BusinessManagementSoftwareBackend.dto.OrderItemDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;

import java.io.IOException;
import java.util.List;

public interface OrderService {
    public boolean createOrder(OrderDto orderDto) throws IOException ;
    public List<OrderDto> getOrders();
    public void deleteOrder(Long id);
    public OrderDto getOrderById(Long id);
    public boolean updateOrder(Long orderId, OrderDto orderDto) throws IOException;
    public List<OrderItemDto> getOrderItems(Long orderId) throws Exception ;
    public List<OrderDto> searchOrders(String keyword) ;

}
