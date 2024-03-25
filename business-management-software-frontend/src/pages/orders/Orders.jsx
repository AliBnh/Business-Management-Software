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
import OrderService from "../../services/OrderService";
import Order from "../../components/Order";

const TABLE_HEAD = [
  "Date",
  "Total",
  "Number of order items",
  "Order Items details",
  "Action",
];

export function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [searchTerm, setSearchTerm] = useState("");
  const handleReset = () => {
    setSearchTerm("");
    fetchData();
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await OrderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(orders?.length / itemsPerPage) || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisibleOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders?.slice(startIndex, endIndex);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteOrder = (e, id) => {
    e.preventDefault();
    OrderService.deleteOrder(id).then((res) => {
      if (orders) {
        setOrders((prevElement) => {
          return prevElement.filter((order) => order.id !== id);
        });
      }
    });
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      setLoading(true);
      try {
        const response = await OrderService.searchOrders(searchTerm);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const addOrder = () => {
    navigate("/addOrder");
  };

  return (
    <Card className="h-full w-full border-t border-blue-gray-5">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-8 flex items-center justify-between gap-8 text-left">
          <div>
            <Typography variant="h5" color="blue-gray">
              Orders list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row ">
            <Button
              className="flex items-center gap-3 xl:w-46 md:w-46 h-10"
              size="sm"
              onClick={addOrder}
            >
              <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Add Order
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
      <CardBody className=" px-0">
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
              {getVisibleOrders().map((order) => (
                <Order key={order.id} order={order} deleteOrder={deleteOrder} />
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
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default Orders;
