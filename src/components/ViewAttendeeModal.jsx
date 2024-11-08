import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewAttendeeModal = ({ attendee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg relative px-10 lg:w-[25%]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="flex justify-center items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex justify-center items-center text-2xl font-semibold">
            {attendee.name[0]} {/* Initial of the attendee's name */}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Attendee Details
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Name:</strong>
            <span className="pl-4 ">{attendee.name}</span>
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Email:</strong>
            <span className="pl-4 ">{attendee.email}</span>
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Phone:</strong>
            <span className="pl-4 ">{attendee.phone}</span>
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Organization:</strong>
            <span className="pl-4 ">{attendee.organization}</span>
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Title:</strong>
            <span className="pl-4 ">{attendee.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendeeModal;
