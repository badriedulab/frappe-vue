import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import * as XLSX from "xlsx";

const ExportModal = ({ isOpen, onClose }) => {
  const [fileType, setFileType] = useState("CSV");
  const [exportType, setExportType] = useState("All Records");
  const [selectedFields, setSelectedFields] = useState([]);
  const [fields, setFields] = useState([
    { name: "ID", mandatory: true },
    { name: "Employee", mandatory: true },
    { name: "Series", mandatory: false },
    { name: "First Name", mandatory: true },
    { name: "Gender", mandatory: true },
    { name: "Date of Birth", mandatory: true },
    { name: "Date of Joining", mandatory: true },
    { name: "Status", mandatory: false },
    { name: "Company", mandatory: true },
    { name: "Relation", mandatory: false },
    // Add other fields as needed
  ]);

  const toggleField = (fieldName) => {
    setSelectedFields((prevSelected) =>
      prevSelected.includes(fieldName)
        ? prevSelected.filter((field) => field !== fieldName)
        : [...prevSelected, fieldName]
    );
  };

  const handleSelectAll = () => {
    setSelectedFields(fields.map((field) => field.name));
  };

  const handleSelectMandatory = () => {
    setSelectedFields(fields.filter((field) => field.mandatory).map((field) => field.name));
  };

  const handleDeselectAll = () => {
    setSelectedFields([]);
  };

  const handleExport = () => {
    const data = [
      // Sample data for demonstration; replace with your actual data
      { ID: 1, Employee: "John Doe", Series: "A", "First Name": "John", Gender: "Male", "Date of Birth": "1990-01-01", "Date of Joining": "2020-01-01", Status: "Active", Company: "ABC Corp", Relation: "Single" },
      { ID: 2, Employee: "Jane Smith", Series: "B", "First Name": "Jane", Gender: "Female", "Date of Birth": "1992-02-02", "Date of Joining": "2021-01-01", Status: "Active", Company: "XYZ Corp", Relation: "Married" },
    ];
  
    // Filter the data based on selected fields
    const filteredData = data.map((row) =>
      Object.keys(row)
        .filter((key) => selectedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = row[key];
          return obj;
        }, {})
    );
  
    // Handle export based on exportType
    if (exportType === "Blank Template") {
      // Create a blank template with only headers
      const blankTemplate = [Object.fromEntries(selectedFields.map((field) => [field, ""]))];
  
      if (fileType === "Excel") {
        exportToExcel(blankTemplate);
      } else {
        exportToCSV(blankTemplate);
      }
    } else {
      // Include data rows for other export types
      if (fileType === "Excel") {
        exportToExcel(filteredData);
      } else {
        exportToCSV(filteredData);
      }
    }
  
    onClose();
  };

  const exportToExcel = (data) => { 
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ExportedData");

    // Generate a download link
    XLSX.writeFile(workbook, "ExportedData.xlsx");
  };

  const exportToCSV = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link to download the CSV file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ExportedData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 w-full max-w-md rounded shadow-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          <ImCross />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Export Data</h2>

        {/* File Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">File Type</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Excel">Excel</option>
            <option value="CSV">CSV</option>
          </select>
        </div>

        {/* Export Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Export Type</label>
          <select
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="All Records">All Records</option>
            <option value="Filtered Data">Filtered Data</option>
            <option value="Blank Template">Blank Template</option>
            <option value="First Five Records">First Five Records</option>
          </select>
        </div>

        {/* Select/Deselect Options */}
        <div className="flex justify-between mb-4">
          <button onClick={handleSelectAll} className="text-blue-600 underline">Select All</button>
          <button onClick={handleSelectMandatory} className="text-blue-600 underline">Select Mandatory</button>
          <button onClick={handleDeselectAll} className="text-blue-600 underline">Unselect All</button>
        </div>

        {/* Fields List */}
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded p-2">
          {fields.map((field) => (
            <div key={field.name} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFields.includes(field.name)}
                onChange={() => toggleField(field.name)}
                className="mr-2"
              />
              <label className="text-gray-700">{field.name}</label>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <div className="flex justify-end mt-4">
          <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
