import React from "react";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Product = ({ product, deleteProduct }) => {
  const navigate = useNavigate();
  const editProduct = (e, id) => {
    e.preventDefault();
    navigate(`/editProduct/${id}`);
  };
  return (
    <tr>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {product.name}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {product.costPrice}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {product.sellingPrice}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {product.stockQuantity}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {product.categoryName}
        </Typography>
      </td>
      <td className="p-4">
        <Tooltip content="Edit Product">
          <IconButton
            variant="text"
            onClick={(e) => editProduct(e, product.id)}
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Product">
          <IconButton
            variant="text"
            onClick={(e) => deleteProduct(e, product.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Product;
