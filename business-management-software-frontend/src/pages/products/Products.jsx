import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Select,
  MenuItem,
  Option,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import CategoryService from "../../services/CategoryService";
import Product from "../../components/Product";
const TABLE_HEAD = [
  "Name",
  "Cost Price",
  "Selling Price",
  "Stock Quantity",
  "Category Name",
  "Action",
];

export function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryName, setCategoryName] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products?.length / itemsPerPage) || 1;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisibleProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products?.slice(startIndex, endIndex);
  };
  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    fetchData();
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
      const categoryResponse = await CategoryService.getCategories();
      setCategories(categoryResponse.data);
      setCategoryName("All Products");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  function hasCategoryId(searchString) {
    const regex = /categoryId=\d+/;
    return regex.test(searchString);
  }

  useEffect(() => {
    fetchData();
    if (hasCategoryId(document.location.search)) {
      const categoryId = document.location.search.split("=")[1];
      setSelectedCategory(categoryId);
      handleCategoryChange(categoryId);
    }
  }, []);
  const deleteProduct = (e, id) => {
    e.preventDefault();
    ProductService.deleteProduct(id).then((res) => {
      if (products) {
        setProducts((prevElement) => {
          return prevElement.filter((product) => product.id !== id);
        });
      }
    });
  };
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      setLoading(true);
      try {
        const response = await ProductService.searchProducts(searchTerm);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const addProduct = () => {
    navigate("/addProduct");
  };
  const handleCategoryChange = async (event) => {
    let name = (await CategoryService.getCategoryById(event)).data.name;
    setCategoryName(name);
    const selectedCategoryId = event;
    setSelectedCategory(selectedCategoryId);
    if (selectedCategoryId) {
      setLoading(true);
      try {
        const response =
          await ProductService.getProductsByCategory(selectedCategoryId);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      fetchData();
    }
  };

  return (
    <Card className="h-full w-full border-t border-blue-gray-5">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-8 flex items-center justify-between gap-8 text-left">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-left">
              {categoryName}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row ">
            <Select
              size="md"
              label="Category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
            >
              <div className="overflow-y-auto max-h-16 ">
                {categories.map((category) => (
                  <Option
                    className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 cursor-pointer select-none relative "
                    key={category.id}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </Option>
                ))}
              </div>
            </Select>
            <Button
              className="flex items-center gap-3 xl:w-64 md:w-48 h-10"
              size="sm"
              onClick={addProduct}
            >
              <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Add product
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-96 sm:w-64 flex">
            <Input
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-0 rounded-none rounded-l-md"
            />
            <IconButton
              onClick={handleSearch}
              className="w-full border-0 rounded-none border-r-2 border-gray-800   hover:bg-gray-500"
            >
              <MagnifyingGlassIcon className="h-5 w-5 border-0  text-white " />{" "}
            </IconButton>
            <IconButton
              onClick={handleReset}
              className="w-full border-0 rounded-none rounded-r-md hover:bg-gray-500"
            >
              <ArrowPathIcon className="h-5 w-5 border-0 text-white " />
            </IconButton>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {!loading && (
            <tbody className="text-center">
              {getVisibleProducts().map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              ))}
            </tbody>
          )}
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1} // Disable previous button on first page
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages} // Disable next button on last page
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default Products;
