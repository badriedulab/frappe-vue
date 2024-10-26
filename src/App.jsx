import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./components/Modal"; // Import the modal

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
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/6 bg-gray-50 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Filter By</h2>
          {/* Filter Dropdowns */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Assigned To</label>
            <select className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-500">
              <option>Select...</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Created By</label>
            <select className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-500">
              <option>Select...</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Tags</label>
            <button className="text-blue-600">Show Tags</button>
          </div>
          {/* Save Filter */}
          <div className="mt-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Save Filter
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center">
            {/* List View and Add Customer */}
            <button className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
              List View
            </button>
            <div className="flex space-x-4">
              <button className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
                <BsThreeDotsVertical />
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
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
            <p className="text-gray-500 mb-4">
              You haven’t created a Customer yet
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
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
