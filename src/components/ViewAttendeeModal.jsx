import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewAttendeeModal = ({ attendee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Attendee Details
        </h2>
        <p>
          <strong>Name:</strong> {attendee.name}
        </p>
        <p>
          <strong>Email:</strong> {attendee.email}
        </p>
        <p>
          <strong>Phone:</strong> {attendee.phone}
        </p>
        <p>
          <strong>Organization:</strong> {attendee.organization}
        </p>
        <p>
          <strong>Title:</strong> {attendee.title}
        </p>
      </div>
    </div>
  );
};

export default ViewAttendeeModal;
