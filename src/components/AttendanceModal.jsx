// AttendanceModal.js

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const AttendanceModal = ({ onClose, onConfirm }) => {
  const signaturePadRef = useRef(null);

  const handleConfirm = () => {
    if (signaturePadRef.current.isEmpty())
      return alert("Please provide a signature.");

    const signatureData = signaturePadRef.current.toDataURL();
    // Trigger onConfirm callback with attendee details and signature data
    onConfirm({ name: "John Doe", signature: signatureData });
    signaturePadRef.current.clear();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Mark Attendance
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-2 w-full mb-4 rounded-md"
        />

        <SignatureCanvas
          penColor="black"
          ref={signaturePadRef}
          canvasProps={{
            width: 400,
            height: 150,
            className: "border border-gray-300 rounded-md mb-4",
          }}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Confirm Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
