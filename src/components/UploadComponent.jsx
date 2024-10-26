import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const UploadComponent = ({ closeUploadModal }) => {
  const [files, setFiles] = useState([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [spreadsheetLink, setSpreadsheetLink] = useState("");

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleLibraryClick = () => {
    window.open("https://drive.google.com", "_blank");
  };

  const handleCameraClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          Swal.fire("Camera accessed successfully!").then(() => {
            stream.getTracks().forEach((track) => track.stop());
          });
        })
        .catch((error) => {
          Swal.fire("Error", "Camera access was denied or unavailable.", "error");
        });
    } else {
      Swal.fire("Error", "Camera not supported in this browser.", "error");
    }
  };

  const handleLinkClick = () => {
    setShowLinkInput(true);
  };

  const handleLinkSubmit = () => {
    const googleSheetRegex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/;
    if (googleSheetRegex.test(spreadsheetLink)) {
      Swal.fire("Success", "Valid Google Spreadsheet link!", "success");
      setShowLinkInput(false);
      setSpreadsheetLink("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Please enter a valid Google Spreadsheet link.",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md relative">
      {/* Close Button */}
      <button
        onClick={closeUploadModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <ImCross />
      </button>

      <h2 className="text-lg font-semibold mb-4">Upload</h2>

      <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <p className="mb-4 text-gray-600">Drag and drop files here or upload from</p>
        <div className="flex justify-around w-full">
          {/* Device Upload */}
          <div className="relative flex flex-col items-center">
            <button
              onClick={() => document.getElementById("fileUpload").click()}
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-blue-500 text-xl">📂</span>
              <span>My Device</span>
            </button>
            <input
              id="fileUpload"
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
          </div>

          {/* Library Button */}
          <button className="flex flex-col items-center cursor-pointer" onClick={handleLibraryClick}>
            <span className="text-green-500 text-xl">📚</span>
            <span>Library</span>
          </button>

          {/* Link Button */}
          <button className="flex flex-col items-center cursor-pointer" onClick={handleLinkClick}>
            <span className="text-orange-500 text-xl">🔗</span>
            <span>Link</span>
          </button>

          {/* Camera Button */}
          <button className="flex flex-col items-center cursor-pointer" onClick={handleCameraClick}>
            <span className="text-red-500 text-xl">📷</span>
            <span>Camera</span>
          </button>
        </div>
      </div>

      {/* File Preview */}
      <div className="mt-4">
        {files.length > 0 ? (
          <div>
            <h3 className="font-semibold mb-2">Uploaded Files:</h3>
            <ul className="list-disc pl-5">
              {files.map((file, index) => (
                <li key={index} className="text-gray-700">
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No files uploaded yet.</p>
        )}
      </div>

      {/* Google Spreadsheet Link Input */}
      {showLinkInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Google Spreadsheet link"
            value={spreadsheetLink}
            onChange={(e) => setSpreadsheetLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleLinkSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Link
          </button>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadComponent;
