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

const Order = ({ order, deleteOrder }) => {
  const navigate = useNavigate();
  const editOrder = (e, id) => {
    e.preventDefault();
    navigate(`/editOrder/${id}`);
  };
  const viewOrderItems = (e, orderId) => {
    e.preventDefault();
    navigate(`/orderDetails/${orderId}`);
  };

  return (
    <tr>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {order.orderDate}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          ${order.totalAmount}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {order.orderItems.length}
        </Typography>
      </td>
      <td className="">
        <Button
          className="flex items-center gap-3 m-auto hover:bg-gray-900"
          size="sm"
          onClick={(e) => viewOrderItems(e, order.id)}
        >
          <Squares2X2Icon className="h-4 w-4" /> View Items
        </Button>
      </td>
      <td className="p-4">
        {/* <Tooltip content="Edit Order">
          <IconButton variant="text" onClick={(e) => editOrder(e, order.id)}>
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip> */}
        <Tooltip content="Delete Product">
          <IconButton variant="text" onClick={(e) => deleteOrder(e, order.id)}>
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Order;
