import React from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Category = ({ category, deleteCategory }) => {
  const navigate = useNavigate();
  const editCategory = (e, id) => {
    e.preventDefault();
    navigate(`/editCategory/${id}`);
  };
  const viewProducts = (e, id) => {
    e.preventDefault();
    navigate(`/products?categoryId=${id}`);
  };

  return (
    <tr className="">
      <td className="p-4">
        <Typography variant="h6" color="blue-gray" className="font-normal">
          {category.name}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="h6" color="blue-gray" className="font-normal">
          {category.productCount}
        </Typography>
      </td>
      <td className="">
        <Button
          className="flex items-center gap-3 m-auto hover:bg-gray-900"
          size="sm"
          onClick={(e) => viewProducts(e, category.id)}
        >
          <Squares2X2Icon className="h-4 w-4" /> View Products
        </Button>
      </td>
      <td className="p-4">
        <Tooltip content="Edit Category">
          <IconButton
            variant="text"
            onClick={(e) => editCategory(e, category.id)}
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Category">
          <IconButton
            variant="text"
            onClick={(e) => deleteCategory(e, category.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Category;
