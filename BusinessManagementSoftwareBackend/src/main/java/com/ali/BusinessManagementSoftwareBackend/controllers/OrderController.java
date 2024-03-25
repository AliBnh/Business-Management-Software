package com.ali.BusinessManagementSoftwareBackend.controllers;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.OrderDto;
import com.ali.BusinessManagementSoftwareBackend.dto.OrderItemDto;
import com.ali.BusinessManagementSoftwareBackend.dto.ProductDto;
import com.ali.BusinessManagementSoftwareBackend.services.orders.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {


    private final OrderService orderService;
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getOrders(){
        List<OrderDto> orderDtoList=  orderService.getOrders();
        return ResponseEntity.ok(orderDtoList);
    }

    @PostMapping("/orders")
    public ResponseEntity<Void> createOrder (@RequestBody OrderDto orderDto) throws IOException {
        boolean success = orderService.createOrder(orderDto);
        if (success)return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<Void> deleteOrder (@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(null);
    }
    @GetMapping("/order/{id}")
    public ResponseEntity<OrderDto> getOrderById (@PathVariable Long id) {
        OrderDto orderDto = orderService.getOrderById(id);
        return ResponseEntity.ok(orderDto);
    }

    @PutMapping("/order/{id}")
    public ResponseEntity<Void> updateOrder (@PathVariable Long id, @RequestBody OrderDto orderDto) {
        System.out.println("PUT request received for order ID: " + id);
        try{
            boolean success = orderService.updateOrder(id,orderDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping("/order/{id}/items")
    public ResponseEntity<List<OrderItemDto>> getOrderItems(@PathVariable Long id) throws Exception {
        List<OrderItemDto> orderItems = orderService.getOrderItems(id);
        return ResponseEntity.ok(orderItems);
    }

    @GetMapping("/orders/search/{searchTerm}")
    public ResponseEntity<List<OrderDto>> searchProducts(@PathVariable String searchTerm) {
        List<OrderDto> searchResults = orderService.searchOrders(searchTerm);
        return ResponseEntity.ok(searchResults);
    }

}

