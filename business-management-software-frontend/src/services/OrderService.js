import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api";

class OrderService {
  createOrder(order) {
    return axios.post(ORDER_API_BASE_URL + "/orders", order);
  }
  getOrders() {
    return axios.get(ORDER_API_BASE_URL + "/orders");
  }
  searchOrders(searchTerm) {
    return axios.get(ORDER_API_BASE_URL + "/orders/search/" + searchTerm);
  }

  getOrderById(orderId) {
    return axios.get(ORDER_API_BASE_URL + "/order/" + orderId);
  }
  updateOrder(order, orderId) {
    console.log("api call");
    return axios.put(ORDER_API_BASE_URL + "/order/" + orderId, order);
  }

  deleteOrder(orderId) {
    return axios.delete(ORDER_API_BASE_URL + "/order/" + orderId);
  }
  getOrderItems(orderId) {
    return axios.get(ORDER_API_BASE_URL + "/order/" + orderId + "/items");
  }
}
export default new OrderService();
