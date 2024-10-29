import React from "react";
import { FaBell, FaQuestionCircle } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import logo from "../assets/react.svg";

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-around p-2 bg-white border-solid border border-black">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
      </div>

      {/* Search bar */}
      <div className="flex items-center justify-around p-4">
        <div className="mx-4 w-full sm:w-[300px] md:w-[400px]">
          <input
            type="text"
            placeholder="Search or type a command (Ctrl + G)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notification Icon */}
          <FaBell className="text-gray-500 hover:text-gray-700 cursor-pointer" />

          <TbMinusVertical className="hidden sm:inline" />

          {/* Help Icon */}
          <FaQuestionCircle className="text-gray-500 hover:text-gray-700 cursor-pointer" />

          {/* Profile Icon */}
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">F</span> {/* Placeholder for profile icon */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
