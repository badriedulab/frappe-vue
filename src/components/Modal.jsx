import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2"; // SweetAlert2 for alerts
import UploadComponent from "./UploadComponent"; // Import the UploadComponent
import ExportModal from "./ExportModal";

const Modal = ({ isOpen, onClose }) => {
  const [documentType, setDocumentType] = useState("");
  const [importType, setImportType] = useState("");
  const [show, setShow] = useState(false);
  const [dontSendEmails, setDontSendEmails] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for the upload modal
  const [isExportModalOpen, setExportModalOpen] = useState(false);

  const [googleSheetUrl, setGoogleSheetUrl] = useState(""); // State for Google Sheet URL
  const [sheetUrlError, setSheetUrlError] = useState(""); // Error state for URL validation

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://document-backend-b3fs.onrender.com/document-type"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch document types");
        }
        const data = await response.json();
        setDocumentTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentTypes();
  }, []);

  const handleSave = () => {
    console.log("Saved!");
    setShow(!show);
  };

  const handleDoctypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true); // Open the UploadComponent as a modal
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false); // Close the UploadComponent modal
  };

  const handleGoogleSheetUrlChange = (e) => {
    setGoogleSheetUrl(e.target.value);
    setSheetUrlError(""); // Reset error message on input change
  };

  const validateGoogleSheetUrl = () => {
    const googleSheetRegex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/;
    if (googleSheetRegex.test(googleSheetUrl)) {
      Swal.fire("Success", "Valid Google Spreadsheet link!", "success");
      setSheetUrlError("");
    } else {
      setSheetUrlError("Please enter a valid Google Spreadsheet link.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Container */}
      <div className="inset-0 z-30 p-6 w-full">
        <div className="bg-gray-100 p-6 w-full rounded-lg text-sm">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            <ImCross />
          </button>

          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              New Data Import
            </h2>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={dontSendEmails}
                onChange={() => setDontSendEmails(!dontSendEmails)}
                className="mr-2"
              />
              <label className="text-gray-700">Don't Send Emails</label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Document Type *
              </label>
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color="#0000ff" size={30} />
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <select
                  value={documentType}
                  onChange={handleDoctypeChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="">Select Document Type</option>
                  {documentTypes?.map((docType) => (
                    <option key={docType.id} value={docType.document_name}>
                      {docType.document_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Import Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Import Type *
              </label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded text-sm"
              >
                <option value="">Select Import Type</option>
                <option value="add">Add New</option>
                <option value="update">Update Existing</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          {!show && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white p-3 rounded text-sm"
              >
                Save
              </button>
            </div>
          )}

          {/* Additional Fields After Save */}
          {show && (
            <div>
              <div>
                <button
                  className="bg-white p-2 text-sm"
                  onClick={() => setExportModalOpen(true)}
                >
                  Download Template
                </button>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-6">
                <label>Import File</label>
                <div>
                  <button onClick={openUploadModal} className="bg-white p-2 text-sm">
                    Attach file
                  </button>
                </div>
              </div>
              {/* Export Modal */}
              <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setExportModalOpen(false)}
                documentType={documentType}
              />
              <div className="mt-4">
                <h2>Or</h2>
                <div>
                  <label>Import from Google Sheets</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Google Sheets URL"
                    value={googleSheetUrl}
                    onChange={handleGoogleSheetUrlChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                  {sheetUrlError && (
                    <p className="text-red-500 mt-2">{sheetUrlError}</p>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={validateGoogleSheetUrl}
                    className="bg-blue-600 text-white p-2 rounded text-sm"
                  >
                    Validate Link
                  </button>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white p-3 rounded text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* UploadComponent Modal Overlay */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative text-sm">
            <UploadComponent closeUploadModal={closeUploadModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
