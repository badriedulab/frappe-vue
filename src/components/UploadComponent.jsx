import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const UploadComponent = ({ closeUploadModal, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [spreadsheetLink, setSpreadsheetLink] = useState("");
  const [spreadsheetData, setSpreadsheetData] = useState([]);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Parse and preview Excel file data
    const file = newFiles[0]; // Previewing only the first file for simplicity
    if (file && (file.type.includes("excel") || file.type.includes("spreadsheet"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setSpreadsheetData(sheetData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      Swal.fire("Error", "Please upload a valid Excel file.", "error");
    }
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
        .catch(() => {
          Swal.fire("Error", "Camera access was denied or unavailable.", "error");
        });
    } else {
      Swal.fire("Error", "Camera not supported in this browser.", "error");
    }
  };

  const handleLinkClick = () => {
    setShowLinkInput(true);
  };

  const handleLinkSubmit = async () => {
    const googleSheetRegex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const match = spreadsheetLink.match(googleSheetRegex);

    if (match) {
      const sheetId = match[1];
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setSpreadsheetData(data.values || []);
        Swal.fire("Success", "Valid Google Spreadsheet link!", "success");
        setShowLinkInput(false);
        setSpreadsheetLink("");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not fetch spreadsheet data.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Please enter a valid Google Spreadsheet link.",
      });
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      Swal.fire("Error", "Please upload at least one file.", "error");
    } else {
      Swal.fire("Uploaded!", "Your files have been uploaded successfully.", "success").then(() => {
        setFiles([]); // Clear the files after upload if desired
        onUploadComplete(); // Call the onUploadComplete function to close modals
      });

    }
    setSpreadsheetData([]);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md relative">
      <button onClick={closeUploadModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
        <ImCross />
      </button>

      <h2 className="text-lg font-semibold mb-4">Upload</h2>
      <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <p className="mb-4 text-gray-600">Drag and drop files here or upload from</p>
        <div className="flex justify-around w-full">
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
              accept=".xlsx, .xls"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
          </div>
          <button className="flex flex-col items-center cursor-pointer" onClick={handleLibraryClick}>
            <span className="text-green-500 text-xl">📚</span>
            <span>Library</span>
          </button>
          <button className="flex flex-col items-center cursor-pointer" onClick={handleLinkClick}>
            <span className="text-orange-500 text-xl">🔗</span>
            <span>Link</span>
          </button>
          <button className="flex flex-col items-center cursor-pointer" onClick={handleCameraClick}>
            <span className="text-red-500 text-xl">📷</span>
            <span>Camera</span>
          </button>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Uploaded Files:</h3>
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700">
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLinkInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Google Spreadsheet link"
            value={spreadsheetLink}
            onChange={(e) => setSpreadsheetLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button onClick={handleLinkSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Submit Link
          </button>
        </div>
      )}

{spreadsheetData.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Spreadsheet Preview:</h3>
    <div className="overflow-auto max-h-64 border border-gray-200 rounded-lg">
      <table className="table-auto w-full text-sm text-left">
        <thead>
          <tr>
            {spreadsheetData[0].map((header, index) => (
              <th key={index} className="border p-2 bg-gray-100">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spreadsheetData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border p-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      
      <div className="mt-4 flex justify-end">
        <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadComponent;
