import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import ProductService from "../../services/ProductService";
import CategoryService from "../../services/CategoryService";
import { useEffect } from "react";
const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [product, setProduct] = useState({
    name: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
    categoryId: null,
  });
  const handleChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };
  const saveProduct = (e) => {
    e.preventDefault();
    ProductService.createProduct(product)
      .then((res) => {
        console.log(res);
        reset();
        navigate("/Products");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reset = () => {
    setProduct({
      name: "",
      costPrice: "",
      sellingPrice: "",
      stockQuantity: "",
      categoryId: null,
    });
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="items-center bg-white py-6 max-w-2xl m-auto "
    >
      <Typography variant="h4" color="blue-gray">
        Add a Product
      </Typography>
      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
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
            Category
          </Typography>
          <Select
            size="lg"
            value={product.category && product.category.id}
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

        <div className="flex mt-6 gap-6 justify-center">
          <Button onClick={saveProduct} className="w-32 border-r-0 ">
            Save
          </Button>
          <Button
            onClick={reset}
            className="w-32  border-l-0 bg-gray-600 text-white"
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddProduct;
