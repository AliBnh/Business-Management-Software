import axios from "axios";

const category_API_BASE_URL = "http://localhost:8080/api";

class CategoryService {
  createCategory(category) {
    return axios.post(category_API_BASE_URL + "/categories", category);
  }
  getCategories() {
    return axios.get(category_API_BASE_URL + "/categories");
  }
  getCategoryById(categoryId) {
    return axios.get(category_API_BASE_URL + "/category/" + categoryId);
  }
  updateCategory(category, categoryId) {
    return axios.put(
      category_API_BASE_URL + "/category/" + categoryId,
      category
    );
  }
  countProductsByCategory(categoryId) {
    const url = `${category_API_BASE_URL}/categories/productsCount/${categoryId}`;
    return axios.get(url);
  }

  searchCategory(searchTerm) {
    return axios.get(
      category_API_BASE_URL + "/categories/search/" + searchTerm
    );
  }

  deleteCategory(categoryId) {
    return axios.delete(category_API_BASE_URL + "/category/" + categoryId);
  }
}
export default new CategoryService();
