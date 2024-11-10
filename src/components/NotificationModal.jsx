import { React, useState } from "react";

const NotificationModal = ({
  isOpen,
  onClose,
  message = "Notification",
  modalType = "success",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-sm shadow-lg text-center w-[90vw] sm:w-[80vw] md:w-1/2 lg:w-2/6 ${className}`}
      >
        <p
          className={`text-base lg:text-lg font-semibold ${
            modalType === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
        <button
          className={`mt-6 lg:mt-10 text-white py-2 lg:px-10 px-8 rounded-sm text-sm lg:text-base font-semibold ${
            modalType === "success" ? "bg-green-700" : "bg-red-700"
          }`}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
