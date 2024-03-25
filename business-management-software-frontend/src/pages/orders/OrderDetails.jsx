import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";
import ProductService from "../../services/ProductService";
const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [productNames, setProductNames] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await OrderService.getOrderById(orderId);
        setOrder(orderResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchProductNames = async () => {
      if (order && order.orderItems) {
        try {
          const res = await Promise.all(
            order.orderItems.map((item) =>
              ProductService.getProductById(item.productId)
            )
          );
          setProductNames(
            res.reduce(
              (acc, item) => ({ ...acc, [item.data.id]: item.data.name }),
              {}
            )
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProductNames();
  }, [order]);
  const handleBack = () => {
    navigate("/Orders");
  };

  return (
    <Card className="h-full w-full border-t border-blue-gray-5">
      {order ? (
        <>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8 text-left">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Order Items
                </Typography>
                <hr />
                <div className="flex items-center gap-6 mt-4">
                  <Typography variant="h6" color="blue-gray">
                    Order Date :
                  </Typography>
                  {order.orderDate}
                </div>
                <div className="flex items-center gap-2 ">
                  <Typography variant="h6" color="blue-gray">
                    Total Amount :
                  </Typography>
                  ${order.totalAmount}
                </div>
              </div>
              <div className="flex shrink-0">
                <Button variant="outlined" size="sm" onClick={handleBack}>
                  Back to Orders
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className=" px-0">
            <div className="">
              <div>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <td className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Product Name
                        </Typography>
                      </td>
                      <td className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Quantity
                        </Typography>
                      </td>
                      <td className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Unit Price
                        </Typography>
                      </td>
                      <td className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Total Price
                        </Typography>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {order.orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray">
                            {productNames[item.productId] || "Loading..."}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray">
                            {item.quantity}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray">
                            ${item.unitPrice}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray">
                            ${item.totalPrice}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </>
      ) : (
        <div>...Loading</div>
      )}
    </Card>
  );
};

export default OrderDetails;
