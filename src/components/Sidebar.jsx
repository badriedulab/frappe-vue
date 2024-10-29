import React, { useState } from "react";
import { FaUsers, FaBriefcase, FaCogs, FaToolbox, FaGlobe, FaRegBuilding, FaUser, FaWrench, FaLayerGroup, FaProjectDiagram, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hrShow, setHrShow] = useState(false);
    const [payrollShow, setPayrollShow] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleHrShow = () => {
        setHrShow(!hrShow);
    };

    const handlePayrollShow = () => {
        setPayrollShow(!payrollShow);
    };

    return (
        <>
            {/* Hamburger Icon */}
            <div className="lg:hidden p-4">
                <button onClick={toggleSidebar}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`lg:w-64 w-64 bg-white p-4 border-r border-gray-300 fixed lg:static transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-10`}>
                <nav>
                    <h2 className="text-gray-500 text-lg font-semibold">PUBLIC</h2>
                    <ul className="mt-4 space-y-2">
                        <li className="flex justify-between items-center text-gray-700 font-medium">
                            <div className="flex items-center space-x-2">
                                <FaUsers className="mr-2" />
                                <span>HR</span>
                            </div>
                            {hrShow ? (
                                <IoIosArrowDropup onClick={handleHrShow} />
                            ) : (
                                <IoIosArrowDropdown onClick={handleHrShow} />
                            )}
                        </li>
                        {hrShow && (
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
                        )}

                        <li className="flex justify-between items-center text-gray-700 font-medium mt-4">
                            <div className="flex items-center space-x-2">
                                <FaRegBuilding className="mr-2" />
                                <span>Payroll</span>
                            </div>
                            {payrollShow ? (
                                <IoIosArrowDropup onClick={handlePayrollShow} />
                            ) : (
                                <IoIosArrowDropdown onClick={handlePayrollShow} />
                            )}
                        </li>
                        {payrollShow && (
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
                        )}

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

            {/* Overlay for Sidebar on small screens */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
