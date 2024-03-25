import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  ButtonGroup,
  Select,
  Option,
} from "@material-tailwind/react";
import CategoryService from "../../services/CategoryService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    id: id,
    name: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
    categoryId: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getProductById(product.id);
        setProduct(response.data);
        const res2 = await CategoryService.getCategories();
        setCategories(res2.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched
      }
    };
    fetchData();
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    ProductService.updateProduct(product, id)
      .then((response) => {
        navigate("/Products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="items-center bg-white py-6 max-w-2xl m-auto "
    >
      <Typography variant="h4" color="blue-gray">
        Update Product
      </Typography>
      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        {isLoading ? ( // Conditionally render loading message while fetching data
          <p>Loading...</p>
        ) : (
          <div className="mb-1 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Cost Price
            </Typography>
            <Input
              size="lg"
              type="number"
              name="costPrice"
              value={product.costPrice}
              onChange={(e) => handleChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Selling Price
            </Typography>
            <Input
              size="lg"
              type="number"
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={(e) => handleChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Stock Quantity
            </Typography>
            <Input
              size="lg"
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={(e) => handleChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Category Name
            </Typography>
            <Select
              size="lg"
              value={
                categories
                  .find((category) => category.id === product.categoryId)
                  ?.id.toString() || ""
              }
              onChange={(e) => {
                const selectedCategoryId = parseInt(e);
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  categoryId: selectedCategoryId,
                }));
              }}
              label="Select Category"
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id.toString()}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
        )}

        <div className="flex mt-6 gap-6 justify-center">
          <Button className="w-32 border-r-0 " onClick={updateProduct}>
            Save
          </Button>
          <Button
            className="w-32  border-l-0 bg-gray-600 text-white"
            onClick={(e) => navigate("/Products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditProduct;
