package com.ali.BusinessManagementSoftwareBackend.services.orders;

import com.ali.BusinessManagementSoftwareBackend.dto.OrderDto;
import com.ali.BusinessManagementSoftwareBackend.dto.OrderItemDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.entities.Category;
import com.ali.BusinessManagementSoftwareBackend.entities.Order;
import com.ali.BusinessManagementSoftwareBackend.entities.OrderItem;
import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import com.ali.BusinessManagementSoftwareBackend.repositories.OrderItemRepository;
import com.ali.BusinessManagementSoftwareBackend.repositories.OrderRepository;
import com.ali.BusinessManagementSoftwareBackend.repositories.ProductRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public boolean createOrder(OrderDto orderDto) throws IOException {
        try {
            Order order = new Order();
            order.setOrderDate(orderDto.getOrderDate());
            order.setCreatedAt(LocalDateTime.now());
            orderRepository.save(order);

            double totalAmount = 0.0;
            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItemDto itemDto : orderDto.getOrderItems()) {
                Product product = productRepository.findById(itemDto.getProductId())
                        .orElseThrow(() -> new IOException("Product not found: " + itemDto.getProductId()));
                if (product.getStockQuantity() < itemDto.getQuantity()) {
                    orderRepository.delete(order);
                    return false;
                }
                System.out.println("product : "+product.getName());
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order); // Set order reference
                orderItem.setProduct(product);
                orderItem.setQuantity(itemDto.getQuantity());
                orderItem.setUnitPrice(product.getSellingPrice()); // Use product's selling price
                orderItem.setTotalPrice(orderItem.getQuantity() * orderItem.getUnitPrice());

                product.setStockQuantity(product.getStockQuantity() - itemDto.getQuantity());
                productRepository.save(product);

                totalAmount += orderItem.getTotalPrice();
                orderItemRepository.save(orderItem);
                orderItems.add(orderItem);
            }

            order.setTotalAmount(totalAmount);
            order.setOrderItems(orderItems);
            orderRepository.save(order);
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    public List<OrderDto> getOrders(){
        return orderRepository.findAll().stream().map(Order::getOrderDto).collect(Collectors.toList());
    }
    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }

    public OrderDto getOrderById(Long id){
        Optional<Order> optionalOrder = orderRepository.findById(id);
        return optionalOrder.map(Order::getOrderDto).orElse(null );
    }



    public boolean updateOrder(Long orderId, OrderDto orderDto) throws IOException {
        try {
            Order existingOrder = orderRepository.findById(orderId)
                    .orElseThrow(() -> new IOException("Order not found: " + orderId));
            existingOrder.setOrderDate(orderDto.getOrderDate());
            List<OrderItemDto> updatedOrderItems = orderDto.getOrderItems();
            Set<Long> existingOrderItemIds = new HashSet<>();
            existingOrder.getOrderItems().forEach(orderItem -> existingOrderItemIds.add(orderItem.getId()));
            for (OrderItemDto itemDto : updatedOrderItems) {
                if (itemDto.getId() == null) {
                    OrderItem newOrderItem = new OrderItem();
                    newOrderItem.setOrder(existingOrder);
                    orderItemRepository.save(newOrderItem);
                } else {
                    Long itemId = itemDto.getId();
                    if (existingOrderItemIds.contains(itemId)) {
                        OrderItem existingItem = existingOrder.getOrderItems().stream()
                                .filter(oi -> oi.getId().equals(itemId))
                                .findFirst()
                                .orElseThrow(() -> new IOException("OrderItem not found: " + itemId));

                        existingItem.setQuantity(itemDto.getQuantity());
                        existingItem.setUnitPrice(itemDto.getUnitPrice());
                        existingItem.setTotalPrice(itemDto.getTotalPrice());
                        orderItemRepository.save(existingItem);
                        existingOrderItemIds.remove(itemId);
                    } else {
                    }
                }
            }
            existingOrder.setTotalAmount(existingOrder.getOrderItems().stream().mapToDouble(OrderItem::getTotalPrice).sum());
            orderRepository.save(existingOrder);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public List<OrderItemDto> getOrderItems(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Order not found: " + orderId));
        return order.getOrderItems().stream()
                .map(OrderItem::getOrderItemDto)
                .collect(Collectors.toList());
    }


    public List<OrderDto> searchOrders(String keyword) {
        List<Order> orders = orderRepository.findAll();

        List<Order> filteredOrders = orders.stream()
                .filter(order -> {
                    String lowerCaseKeyword = keyword.toLowerCase();
                    return (
                                    String.valueOf(order.getTotalAmount()).toLowerCase().contains(lowerCaseKeyword) ||
                                    String.valueOf(order.getOrderDate()).toLowerCase().contains(lowerCaseKeyword));
                })
                .toList();

        return filteredOrders.stream()
                .map(Order::getOrderDto)
                .collect(Collectors.toList());
    }


}
