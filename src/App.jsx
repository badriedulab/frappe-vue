import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./components/Modal"; // Import the modal
import Sidebar from "./components/Sidebar";
import Navbar from './components/Navbar';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
    <Navbar/>
    </div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div>
          <Sidebar/>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center">
            {/* List View and Add Customer */}
            <button className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 text-sm">
              List View
            </button>
            <div className="flex space-x-4">
              <button className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 text-sm">
                <BsThreeDotsVertical />
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
                onClick={handleOpenModal}
              >
                + Add Customer
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuYm3rq_jtkAOX3JFZRuSmV0DAKJalyUb8qA&s"
              alt="Empty"
              className="h-240 w-240 mb-4"
            />
            <p className="text-gray-500 mb-4 text-sm">
              You haven’t created a Customer yet
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
              onClick={handleOpenModal}
            >
              Create your first Customer
            </button>
            {
              isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            }
          </div>
        </div>

        {/* Modal Component */}
      </div>
    </>
  );
};

export default App;
