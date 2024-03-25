package com.ali.BusinessManagementSoftwareBackend.services.dashboard;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.dto.OrderDto;
import com.ali.BusinessManagementSoftwareBackend.entities.Order;
import com.ali.BusinessManagementSoftwareBackend.entities.OrderItem;
import com.ali.BusinessManagementSoftwareBackend.entities.Product;
import com.ali.BusinessManagementSoftwareBackend.repositories.CategoryRepository;
import com.ali.BusinessManagementSoftwareBackend.repositories.OrderRepository;
import com.ali.BusinessManagementSoftwareBackend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    public double getTotalRevenue(LocalDate startDate, LocalDate endDate) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(startDate, endDate);
        return orders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
    }
    public List<Map<String, Object>> getRevenueForLastYear() {
        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(today.minusYears(1));

        List<Map<String, Object>> monthlyData = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            LocalDate endDate = currentMonth.atEndOfMonth();
            double revenue = getTotalRevenue(currentMonth.atDay(1), endDate);

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", currentMonth.getMonthValue()); // Month number (1-12)
            monthData.put("revenue", revenue);
            monthlyData.add(monthData);

            currentMonth = currentMonth.plusMonths(1);
        }

        return monthlyData;
    }
    public List<Map<String, Object>> getProfitForLastYear() {
        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(today.minusYears(1));

        List<Map<String, Object>> monthlyData = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            LocalDate endDate = currentMonth.atEndOfMonth();
            double revenue = getTotalRevenue(currentMonth.atDay(1), endDate);
            double costPrice = getCostPriceForMonth(currentMonth.atDay(1), endDate);
            double profit = revenue - costPrice;

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", currentMonth.getMonthValue()); // Month number (1-12)
            monthData.put("profit", profit);
            monthlyData.add(monthData);

            currentMonth = currentMonth.plusMonths(1);
        }

        return monthlyData;
    }
    public long getTotalStock() {
        return productRepository.findAll().stream()
                .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                .mapToLong(Product::getStockQuantity)
                .sum();
    }
    public double getTotalStockValue() {
        return productRepository.findAll().stream()
                .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                .mapToDouble(product -> product.getStockQuantity() * product.getCostPrice())
                .sum();
    }


    public List<CategoryDto> getProductsPerCategory() {
        return productRepository.findAll().stream()
                .filter(product -> product.getDeactivated() == null || !product.getDeactivated())
                .collect(Collectors.groupingBy(product -> product.getCategory().getId()))
                .entrySet().stream()
                .map(entry -> {
                    CategoryDto categoryDto = new CategoryDto();
                    categoryDto.setId(entry.getKey());
                    categoryDto.setName(entry.getValue().get(0).getCategory().getName());
                    categoryDto.setProductCount((long) entry.getValue().size());
                    return categoryDto;
                })
                .collect(Collectors.toList());
    }

    private double getCostPriceForMonth(LocalDate startDate, LocalDate endDate) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(startDate, endDate);

        return orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .mapToDouble(orderItem -> orderItem.getQuantity() * orderItem.getProduct().getCostPrice())
                .sum();
    }
    public double getTotalProfit(LocalDate startDate, LocalDate endDate) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(startDate, endDate);

        double totalRevenue = orders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();

        double totalCostPrice = orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .mapToDouble(orderItem -> orderItem.getQuantity() * orderItem.getProduct().getCostPrice())
                .sum();

        return totalRevenue - totalCostPrice;
    }


    public List<Map<String, Long>> getTopSellingProducts(LocalDate startDate, LocalDate endDate, int limit) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(startDate, endDate);

        Map<Long, Long> productIdToTotalQuantity = orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .collect(Collectors.groupingBy(OrderItem::getProductId, Collectors.summingLong(OrderItem::getQuantity)));

        List<Map.Entry<Long, Long>> sortedEntries = new ArrayList<>(productIdToTotalQuantity.entrySet());
        sortedEntries.sort(Collections.reverseOrder(Map.Entry.comparingByValue()));
        List<Map<String, Long>> topProducts = sortedEntries.stream()
                .limit(3)
                .map(entry -> {
                    Map<String, Long> productData = new HashMap<>();
                    productData.put("productId", entry.getKey());
                    productData.put("totalQuantity", entry.getValue());
                    return productData;
                })
                .collect(Collectors.toList());

        return topProducts;
    }

    public double getAverageOrderServiceValue(LocalDate startDate, LocalDate endDate) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(startDate, endDate);

        if (orders.isEmpty()) {
            return 0.0; // Handle case with no orders to avoid division by zero
        }

        double totalRevenue = orders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();

        int numberOfOrders = orders.size();

        return totalRevenue / numberOfOrders;
    }



}
