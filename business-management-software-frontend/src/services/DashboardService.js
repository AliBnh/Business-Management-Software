import axios from "axios";
const dashboard_API_BASE_URL = "http://localhost:8080/api";

class DashboardService {
  getTotalRevenue(startDate, endDate) {
    const url = `${dashboard_API_BASE_URL}/total-revenue?startDate=${startDate}&endDate=${endDate}`;
    return axios.get(url);
  }

  getTotalProfit(startDate, endDate) {
    const url = `${dashboard_API_BASE_URL}/total-profit?startDate=${startDate}&endDate=${endDate}`;
    return axios.get(url);
  }
  getTotalMonthlyRevenue() {
    const url = `${dashboard_API_BASE_URL}/total-revenue-monthly`;
    return axios.get(url);
  }

  getTotalMonthlyProfit() {
    const url = `${dashboard_API_BASE_URL}/total-profit-monthly`;
    return axios.get(url);
  }

  getTopSellingProducts(startDate, endDate, limit = 10) {
    const url = `${dashboard_API_BASE_URL}/top-selling-products?startDate=${startDate}&endDate=${endDate}&limit=${limit}`;
    return axios.get(url);
  }

  getAverageOrderServiceValue(startDate, endDate) {
    const url = `${dashboard_API_BASE_URL}/average-order-value?startDate=${startDate}&endDate=${endDate}`;
    return axios.get(url);
  }

  getTotalStock() {
    const url = `${dashboard_API_BASE_URL}/total-stock`;
    return axios.get(url);
  }

  getTotalStockValue() {
    const url = `${dashboard_API_BASE_URL}/total-stock-value`;
    return axios.get(url);
  }

  getProductsPerCategory() {
    const url = `${dashboard_API_BASE_URL}/products-per-category`;
    return axios.get(url);
  }
}

export default new DashboardService();
