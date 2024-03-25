package com.ali.BusinessManagementSoftwareBackend.controllers;

import com.ali.BusinessManagementSoftwareBackend.dto.CategoryDto;
import com.ali.BusinessManagementSoftwareBackend.services.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;


    @GetMapping("/total-stock")
    public long getTotalStock() {
        return dashboardService.getTotalStock();
    }

    @GetMapping("/total-stock-value")
    public double getTotalStockValue() {
        return dashboardService.getTotalStockValue();
    }

    @GetMapping("/products-per-category")
    public List<CategoryDto> getProductsPerCategory() {
        return dashboardService.getProductsPerCategory();
    }

    @GetMapping("/total-revenue")
    public double getTotalRevenue(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return dashboardService.getTotalRevenue(startDate, endDate);
    }
    @GetMapping("/total-revenue-monthly")
    public List<Map<String, Object>> getRevenueForLastYear(){
        return dashboardService.getRevenueForLastYear();
    }
    @GetMapping("/total-profit-monthly")
    public List<Map<String, Object>> getProfitForLastYear(){
        return dashboardService.getProfitForLastYear();
    }

    @GetMapping("/total-profit")
    public double getTotalProfit(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return dashboardService.getTotalProfit(startDate, endDate);
    }

    @GetMapping("/top-selling-products")
    public List<Map<String, Long>> getTopSellingProducts(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            @RequestParam(defaultValue = "10") int limit) { // Optional parameter for limit
        return dashboardService.getTopSellingProducts(startDate, endDate, limit);
    }

    @GetMapping("/average-order-value")
    public double getAverageOrderServiceValue(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return dashboardService.getAverageOrderServiceValue(startDate, endDate);
    }
}
