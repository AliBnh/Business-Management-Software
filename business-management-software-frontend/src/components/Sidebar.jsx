import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  TruckIcon,
  UserCircleIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  PowerIcon,
  Square2StackIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useLocation } from "react-router-dom";

export function Sidebar() {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const location = useLocation();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className=" h-screen ">
      {activeMenu && (
        <>
          <Card className="h-screen w-full max-w-[16rem] pl-3 pt-4  shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 flex items-center gap-4 p-4">
              <BuildingStorefrontIcon className="h-8 w-8 text-black" />
              <Typography
                variant="h5"
                color="black"
                className="text-left font-bold"
              >
                BizManage
              </Typography>
            </div>

            <List className="text-black/90 mt-5 pr-7">
              <NavLink
                to="/"
                key={"/"}
                onClick={handleCloseSideBar}
                className={`flex items-center gap-2 
                ${location.pathname === "/" ? "bg-gray-100  rounded" : ""}`}
              >
                <ListItem>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </NavLink>

              <hr className="h-2 border-black/20 w-52  " />
              <NavLink
                to="/Orders"
                key={"/Orders"}
                onClick={handleCloseSideBar}
                className={`flex items-center gap-2 
                ${location.pathname === "/Orders" ? "bg-gray-100  rounded" : ""}`}
              >
                <ListItem>
                  <ListItemPrefix>
                    <TruckIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
              </NavLink>
              <NavLink
                to="/Products"
                key={"/Products"}
                onClick={handleCloseSideBar}
                className={`flex items-center gap-2 
                ${location.pathname === "/Products" ? "bg-gray-100  rounded" : ""}`}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ShoppingCartIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </NavLink>

              <NavLink
                to="/Categories"
                key={"Categories"}
                onClick={handleCloseSideBar}
                className={`flex items-center gap-2 
                ${location.pathname === "/Categories" ? "bg-gray-100  rounded" : ""}`}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Categories
                </ListItem>
              </NavLink>

              <hr className="h-2 border-black/20 w-52   " />

              <NavLink
                to="/addOrder"
                key={"/addOrder"}
                onClick={handleCloseSideBar}
                className={`flex items-center gap-2 
                ${location.pathname === "/addOrder" ? "bg-gray-100  rounded" : ""}`}
              >
                <ListItem>
                  <ListItemPrefix>
                    <PlusCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Order
                </ListItem>
              </NavLink>

              {/* <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
              <ListItem className="">
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem> */}
            </List>
          </Card>
        </>
      )}
    </div>
  );
}
export default Sidebar;
