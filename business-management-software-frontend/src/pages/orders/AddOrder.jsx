import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import ProductService from "../../services/ProductService";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const AddOrder = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [numOrderItems, setNumOrderItems] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [order, setOrder] = useState({
    orderDate: "",
    totalAmount: 0,
    orderItems: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getProducts();
        setProducts(response.data);

        setOrderItems(
          products.map((product) => ({
            productId: product.id,
            quantity: 1,
            unitPrice: product.sellingPrice,
            totalPrice: product.sellingPrice,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const handleProductChange = async (index, newValue) => {
    const res = await ProductService.getProductById(newValue);
    const product = res.data;

    setOrderItems((prevOrderItems) => {
      const newOrderItems = [...prevOrderItems];

      newOrderItems[index] = {
        ...newOrderItems[index],
        productId: product.id,
        unitPrice: product.sellingPrice,
        quantity: newOrderItems[index]?.quantity || 1,

        totalPrice:
          product.sellingPrice * (newOrderItems[index]?.quantity || 1),
      };
      updateTotalAmount();
      return newOrderItems;
    });
  };

  const handleQuantityChange = (index, newValue) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].quantity = newValue;
    updatedOrderItems[index].totalPrice =
      updatedOrderItems[index].unitPrice * newValue;
    setOrderItems(updatedOrderItems);
    updateTotalAmount();
  };

  const updateTotalAmount = () => {
    if (Array.isArray(orderItems)) {
      // Check for array before using reduce
      setTotalAmount(
        orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
      );
    }
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    const order = {
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      orderDate: date,
    };
    try {
      await OrderService.createOrder(order);
      navigate("/Orders");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="items-center bg-white py-6 max-w-2xl m-auto"
    >
      <Typography variant="h4" color="blue-gray">
        Add an Order
      </Typography>
      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Order Date
          </Typography>
          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                label="Select a Date"
                onChange={() => null}
                value={date ? format(date, "PPP") : ""}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="border-0"
                classNames={{
                  caption:
                    "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Number of Order Items
          </Typography>
          <Input
            type="number"
            value={numOrderItems}
            onChange={(e) => {
              setNumOrderItems(e.target.value);
            }}
            labelProps={{
              className: " mt-1",
            }}
            label="Order Items"
            className="mt-1"
          />
          {Array.from({ length: numOrderItems }, (_, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Order Item {index + 1}
              </Typography>
              <Select
                size="lg"
                value={orderItems[index]?.productId.toString() || ""}
                onChange={(e) => {
                  const selectedProductId = parseInt(e);
                  handleProductChange(index, selectedProductId);
                }}
                label="Select Product"
              >
                {products.map((product) => (
                  <Option key={product.id} value={product.id.toString()}>
                    {product.name}
                  </Option>
                ))}
              </Select>
              <Input
                type="number"
                value={orderItems[index]?.quantity || 1}
                onChange={(e) => {
                  handleQuantityChange(index, e.target.value);
                }}
                min={1}
                label="Quantity"
                labelProps={{
                  className: " mt-1",
                }}
                className="mt-1"
              />
            </div>
          ))}
        </div>
        <div className="flex mt-6 gap-6 justify-center">
          <Button
            onClick={saveOrder}
            className="w-32  border-l-0 bg-black text-white"
          >
            Save Order
          </Button>
          <Button
            onClick={() => navigate("/Orders")}
            className="w-32  border-l-0 bg-gray-600 text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default AddOrder;
