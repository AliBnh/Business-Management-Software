import React from "react";

const EditOrder = () => {
  return (
    <div>
      Sorry this functionality isn't implemented yet, we're working on it
    </div>
  );
};

export default EditOrder;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Input,
//   Button,
//   Typography,
//   Select,
//   Option,
//   Popover,
//   PopoverHandler,
//   PopoverContent,
// } from "@material-tailwind/react";
// import { useNavigate, useParams } from "react-router-dom";
// import OrderService from "../../services/OrderService";
// import ProductService from "../../services/ProductService";
// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

// const EditOrder = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [date, setDate] = useState(new Date());
//   const [numOrderItems, setNumOrderItems] = useState(0);
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [originalOrder, setOriginalOrder] = useState({}); // Store original order data

//   // const [order, setOrder] = useState({
//   //   id: id,
//   //   orderDate: "",
//   //   totalAmount: 0,
//   //   orderItems: [],
//   // });
//   // const handleChange = (e) => {
//   //   const value = e.target.value;
//   //   setOrder({ ...order, [e.target.name]: value });
//   // };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const resProducts = await ProductService.getProducts();
//   //       const resOrder = await OrderService.getOrderById(id);
//   //       setOrder(resOrder.data);
//   //       setProducts(resProducts.data);
//   //       const filteredOrderItems = resOrder.data.orderItems.filter(
//   //         (item) => item.productId !== null && item.quantity > 0
//   //       );
//   //       setOrderItems(filteredOrderItems);
//   //       setTotalAmount(resOrder.data.totalAmount);
//   //       setDate(new Date(resOrder.data.orderDate));
//   //       setNumOrderItems(resOrder.data.orderItems.length);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resProducts = await ProductService.getProducts();
//         const resOrder = await OrderService.getOrderById(id);
//         setOrderItems(
//           resOrder.data.orderItems.filter(
//             (item) => item.productId && item.quantity > 0
//           )
//         ); // Filter valid items
//         setOriginalOrder(resOrder.data); // Store original order
//         setProducts(resProducts.data);
//         setDate(new Date(resOrder.data.orderDate));
//         setNumOrderItems(resOrder.data.orderItems.length);
//         setTotalAmount(resOrder.data.totalAmount);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   // const updateOrder = (e) => {
//   //   e.preventDefault();

//   //   const updatedOrderItems = orderItems.filter(
//   //     (item) => item.productId !== null && item.quantity > 0
//   //   );
//   //   const order = {
//   //     orderItems: updatedOrderItems.map((item) => ({
//   //       productId: item.productId,
//   //       quantity: item.quantity,
//   //       unitPrice: item.unitPrice,
//   //       totalPrice: item.totalPrice,
//   //     })),
//   //     orderDate: date,
//   //   };

//   //   console.log(order);
//   //   OrderService.updateOrder(order, id)
//   //     .then((response) => {
//   //       navigate("/Orders");
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };
//   const updateOrder = async (e) => {
//     e.preventDefault();

//     // Filter and calculate total amount for updated order items
//     const updatedOrderItems = orderItems.filter(
//       (item) => item.productId && item.quantity > 0
//     );
//     const updatedTotalAmount = updatedOrderItems.reduce(
//       (acc, item) => acc + item.quantity * item.unitPrice,
//       0
//     );

//     const updatedOrder = {
//       orderItems: updatedOrderItems.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//         unitPrice: item.unitPrice, // Assuming unit price remains unchanged
//         totalPrice: item.quantity * item.unitPrice, // Recalculate total price
//       })),
//       orderDate: date.toISOString(), // Convert date to ISO format
//       totalAmount: updatedTotalAmount,
//     };

//     try {
//       await OrderService.updateOrder(updatedOrder, id);
//       navigate("/Orders");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleProductChange = (index, selectedProductId) => {
//     setOrderItems((prevOrderItems) =>
//       prevOrderItems.map((item, i) =>
//         i === index ? { ...item, productId: selectedProductId } : item
//       )
//     );
//   };

//   const handleQuantityChange = (index, quantity) => {
//     setOrderItems((prevOrderItems) =>
//       prevOrderItems.map((item, i) =>
//         i === index ? { ...item, quantity } : item
//       )
//     );
//   };
//   return (
//     <Card
//       color="transparent"
//       shadow={false}
//       className="items-center bg-white py-6 max-w-2xl m-auto"
//     >
//       <Typography variant="h4" color="blue-gray">
//         Edit an Order
//       </Typography>
//       <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
//         <div className="mb-1 flex flex-col gap-4">
//           <Typography variant="h6" color="blue-gray" className="-mb-3">
//             Order Date
//           </Typography>
//           <Popover placement="bottom">
//             <PopoverHandler>
//               <Input
//                 label="Select a Date"
//                 onChange={() => null}
//                 value={date ? format(date, "PPP") : ""}
//               />
//             </PopoverHandler>
//             <PopoverContent>
//               <DayPicker
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 showOutsideDays
//                 className="border-0"
//                 classNames={{
//                   caption:
//                     "flex justify-center py-2 mb-4 relative items-center",
//                   caption_label: "text-sm font-medium text-gray-900",
//                   nav: "flex items-center",
//                   nav_button:
//                     "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
//                   nav_button_previous: "absolute left-1.5",
//                   nav_button_next: "absolute right-1.5",
//                   table: "w-full border-collapse",
//                   head_row: "flex font-medium text-gray-900",
//                   head_cell: "m-0.5 w-9 font-normal text-sm",
//                   row: "flex w-full mt-2",
//                   cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//                   day: "h-9 w-9 p-0 font-normal",
//                   day_range_end: "day-range-end",
//                   day_selected:
//                     "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
//                   day_today: "rounded-md bg-gray-200 text-gray-900",
//                   day_outside:
//                     "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
//                   day_disabled: "text-gray-500 opacity-50",
//                   day_hidden: "invisible",
//                 }}
//                 components={{
//                   IconLeft: ({ ...props }) => (
//                     <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
//                   ),
//                   IconRight: ({ ...props }) => (
//                     <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
//                   ),
//                 }}
//               />
//             </PopoverContent>
//           </Popover>

//           {Array.from({ length: numOrderItems }, (_, index) => (
//             <div key={index} className="flex flex-col gap-2 mb-4">
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Order Item {index + 1}
//               </Typography>
//               <Select
//                 size="lg"
//                 value={orderItems[index]?.productId.toString() || ""}
//                 onChange={(e) => {
//                   const selectedProductId = parseInt(e);
//                   handleProductChange(index, selectedProductId);
//                 }}
//                 label="Select Product"
//               >
//                 {products.map((product) => (
//                   <Option key={product.id} value={product.id.toString()}>
//                     {product.name}
//                   </Option>
//                 ))}
//               </Select>
//               <Input
//                 type="number"
//                 value={orderItems[index]?.quantity || 1}
//                 onChange={(e) => {
//                   handleQuantityChange(index, e.target.value);
//                 }}
//                 min={1}
//                 label="Quantity"
//                 labelProps={{
//                   className: " mt-1",
//                 }}
//                 className="mt-1"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex mt-6 gap-6 justify-center">
//           <Button
//             onClick={updateOrder}
//             className="w-32  border-l-0 bg-black text-white"
//           >
//             Save Order
//           </Button>
//           <Button
//             onClick={() => navigate("/Orders")}
//             className="w-32  border-l-0 bg-gray-600 text-white"
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };
// export default EditOrder;
