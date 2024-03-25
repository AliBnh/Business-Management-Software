import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    id: id,
    name: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, [e.target.name]: value });
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryService.getCategoryById(category.id);
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateCategory = (e) => {
    e.preventDefault();
    CategoryService.updateCategory(category, id)
      .then((response) => {
        navigate("/Categories");
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
        Update Category
      </Typography>
      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        {isLoading ? (
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
              value={category.name}
              onChange={(e) => handleChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        )}

        <div className="flex mt-6 gap-6 justify-center">
          <Button className="w-32 border-r-0 " onClick={updateCategory}>
            Save
          </Button>
          <Button
            className="w-32  border-l-0 bg-gray-600 text-white"
            onClick={(e) => navigate("/Categories")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditCategory;
