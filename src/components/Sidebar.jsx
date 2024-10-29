// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaCogs, FaToolbox, FaGlobe, FaRegBuilding, FaUser, FaWrench, FaLayerGroup, FaProjectDiagram } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-300">
      <nav>
        <h2 className="text-gray-500 text-lg font-semibold">PUBLIC</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center text-gray-700 font-medium">
            <FaUsers className="mr-2" />
            HR
          </li>
          <ul className="ml-6 space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaUser className="mr-2" />
              Employee Lifecycle
            </li>
            <li className="flex items-center">
              <FaBriefcase className="mr-2" />
              Performance
            </li>
            <li className="flex items-center">
              <FaUser className="mr-2" />
              Recruitment
            </li>
            <li className="flex items-center">
              <FaUser className="mr-2" />
              Shift & Attendance
            </li>
            <li className="flex items-center">
              <FaBriefcase className="mr-2" />
              Expense Claims
            </li>
            <li className="flex items-center">
              <FaUsers className="mr-2" />
              Leaves
            </li>
          </ul>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaRegBuilding className="mr-2" />
            Payroll
          </li>
          <ul className="ml-6 space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaBriefcase className="mr-2" />
              Salary Payout
            </li>
            <li className="flex items-center">
              <FaCogs className="mr-2" />
              Tax & Benefits
            </li>
          </ul>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaProjectDiagram className="mr-2" />
            Projects
          </li>
          
          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaUser className="mr-2" />
            Users
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaToolbox className="mr-2" />
            Tools
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaGlobe className="mr-2" />
            Website
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaCogs className="mr-2" />
            ERPNext Settings
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaLayerGroup className="mr-2" />
            Integrations
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaWrench className="mr-2" />
            ERPNext Integrations
          </li>

          <li className="flex items-center text-gray-700 font-medium mt-4">
            <FaWrench className="mr-2" />
            Build
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
