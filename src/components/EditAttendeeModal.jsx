import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const EditAttendeeModal = ({ attendee, onSave, onClose }) => {
  const [formData, setFormData] = useState(attendee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-500 mb-6">
          Edit Attendee Details
        </h2>
        <form onSubmit={handleSubmit} className="px-14">
          <div className="mb-4 ">
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full font-semibold px-4 py-3 text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 font-semibold px-12 mt-4 text-white py-[10px] rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <div className="flex items-center">
                <FaSave className="mr-4" />
                <span> Update Participant Details</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAttendeeModal;
