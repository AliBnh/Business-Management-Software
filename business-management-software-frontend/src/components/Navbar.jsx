import React, { useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex left-0 p-2 md:ml-6 md:mr-6 relative">
      <button
        type="button"
        onClick={handleActiveMenu}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span className="absolute inline-flex rounded-full h-8 w-8 right-2 top-2 hover:shadow-md">
          <Bars3Icon className={` text-black h-8 w-8`} />
        </span>
      </button>
    </div>
  );
};

export default Navbar;
