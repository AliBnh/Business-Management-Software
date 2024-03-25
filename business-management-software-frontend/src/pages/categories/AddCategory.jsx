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
import CategoryService from "../../services/CategoryService";
const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
  });
  const handleChange = (e) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [e.target.name]: e.target.value,
    }));
  };
  const saveCategory = (e) => {
    e.preventDefault();
    CategoryService.createCategory(category)
      .then((res) => {
        reset();
        navigate("/Categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reset = () => {
    setCategory({
      name: "",
    });
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="items-center bg-white py-6 max-w-2xl m-auto "
    >
      <Typography variant="h4" color="blue-gray">
        Add a Category
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
            value={category.name}
            onChange={(e) => handleChange(e)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex mt-6 gap-6 justify-center">
          <Button onClick={saveCategory} className="w-32 border-r-0 ">
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

export default AddCategory;
