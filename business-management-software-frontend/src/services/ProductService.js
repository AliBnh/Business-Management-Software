import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api";

class ProductService {
  createProduct(product) {
    return axios.post(PRODUCT_API_BASE_URL + "/products", product);
  }
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL + "/products");
  }
  searchProducts(searchTerm) {
    return axios.get(PRODUCT_API_BASE_URL + "/products/search/" + searchTerm);
  }

  getProductById(productId) {
    return axios.get(PRODUCT_API_BASE_URL + "/product/" + productId);
  }
  updateProduct(product, productId) {
    return axios.put(PRODUCT_API_BASE_URL + "/product/" + productId, product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCT_API_BASE_URL + "/product/" + productId);
  }

  getProductsByCategory(categoryId) {
    return axios.get(PRODUCT_API_BASE_URL + "/products/category/" + categoryId);
  }
}
export default new ProductService();
