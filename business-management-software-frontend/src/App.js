import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/orders/Orders";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import Navbar from "./components/Navbar";
import AddOrder from "./pages/orders/AddOrder";
import AddProduct from "./pages/products/AddProduct";
import AddCategory from "./pages/categories/AddCategory";
import { useStateContext } from "./contexts/ContextProvider";
import EditProduct from "./pages/products/EditProduct";
import EditCategory from "./pages/categories/EditCategory";
import EditOrder from "./pages/orders/EditOrder";
import OrderDetails from "./pages/orders/OrderDetails";
// import Login from "./pages/auth/Login";

function App() {
  const { activeMenu } = useStateContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg bg-gray-100">
          {activeMenu ? (
            <div className="w-64 overflow-hidden fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>

            <div className="m-16">
              <Routes>
                {/* <Route path="/Login" element={<Login />} /> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/editCategory/:id" element={<EditCategory />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/editProduct/:id" element={<EditProduct />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/addOrder" element={<AddOrder />} />
                <Route
                  path="/orderDetails/:orderId"
                  element={<OrderDetails />}
                />
                <Route path="/editOrder/:id" element={<EditOrder />} />
                {/* <Route path="/addOrder" element={<AddOrder />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
