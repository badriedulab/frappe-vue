import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import * as XLSX from "xlsx";

const ExportModal = ({ isOpen, onClose, documentType }) => {
  const [fileType, setFileType] = useState("Excel");
  const [exportType, setExportType] = useState("All Records");
  const [selectedFields, setSelectedFields] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://document-backend-b3fs.onrender.com/document-fields?documentType=${documentType}`
        );
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error("Failed to fetch fields:", error);
      } finally {
        setLoading(false);
      }
    };

    if (documentType) {
      fetchFields();
    }
  }, [documentType]);

  const toggleField = (fieldName) => {
    setSelectedFields((prevSelected) =>
      prevSelected.includes(fieldName)
        ? prevSelected.filter((field) => field !== fieldName)
        : [...prevSelected, fieldName]
    );
  };

  const handleSelectAll = () => {
    setSelectedFields(fields.map((field) => field.field_name));
  };

  const handleSelectMandatory = () => {
    setSelectedFields(fields.filter((field) => field.mandatory).map((field) => field.field_name));
  };

  const handleDeselectAll = () => {
    setSelectedFields([]);
  };

  const handleExport = () => {
    // Mock data for export purposes
    const data = [
      { ID: 1, Employee: "John Doe", Series: "A", "First Name": "John", Gender: "Male", "Date of Birth": "1990-01-01", "Date of Joining": "2020-01-01", Status: "Active", Company: "ABC Corp", Relation: "Single" },
      { ID: 2, Employee: "Jane Smith", Series: "B", "First Name": "Jane", Gender: "Female", "Date of Birth": "1992-02-02", "Date of Joining": "2021-01-01", Status: "Active", Company: "XYZ Corp", Relation: "Married" },
    ];

    // Filter data to include only selected fields
    const filteredData = data.map((record) =>
      selectedFields.reduce((obj, field) => {
        if (record[field] !== undefined) obj[field] = record[field];
        return obj;
      }, {})
    );

    // Determine export type and prepare data accordingly
    let exportData = [];
    if (exportType === "Blank Template") {
      exportData = [Object.fromEntries(selectedFields.map((field) => [field, ""]))];
    } else if (exportType === "First Five Records") {
      exportData = filteredData.slice(0, 5);
    } else {
      exportData = filteredData;
    }

    // Call appropriate export function based on file type
    if (fileType === "Excel") {
      exportToExcel(exportData);
    } else {
      exportToCSV(exportData);
    }

    // Close the modal after export
    onClose();
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ExportedData");
    XLSX.writeFile(workbook, "ExportedData.xlsx");
  };

  const exportToCSV = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ExportedData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-white p-6 w-2/6  rounded shadow-md relative">
        <button onClick={onClose} className="absolute top-7 right-8 text-gray-600">
          <ImCross />
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Export Data</h2>

        {/* File Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium">File Type</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full text-sm p-1 border border-gray-300 rounded"
          >
            <option value="Excel">Excel</option>
            <option value="CSV">CSV</option>
          </select>
        </div>

        {/* Export Type */}
        <div className="mb-4">
          <label className="block text-gray-700  font-medium">Export Type</label>
          <select
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
            className="w-full text-sm p-1 border border-gray-300 rounded"
          >
            <option value="All Records">All Records</option>
            <option value="Filtered Data">Filtered Data</option>
            <option value="Blank Template">Blank Template</option>
            <option value="First Five Records">First Five Records</option>
          </select>
        </div>

        {/* Select/Deselect Options */}
        <div className="flex justify-between mb-4 text-sm">
          <button onClick={handleSelectAll} className="text-blue-600 underline">Select All</button>
          <button onClick={handleSelectMandatory} className="text-blue-600 underline">Select Mandatory</button>
          <button onClick={handleDeselectAll} className="text-blue-600 underline">Unselect All</button>
        </div>

        {/* Fields List */}
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded p-2">
          {loading ? (
            <p>Loading fields...</p>
          ) : (
            fields.map((field) => (
              <div key={field.field_id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.field_name)}
                  onChange={() => toggleField(field.field_name)}
                  className="mr-2"
                />
                <label className="text-gray-700">{field.field_name}</label>
              </div>
            ))
          )}
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
