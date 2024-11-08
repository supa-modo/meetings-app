import React, { useState } from "react";

const NewMeetingModal = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "",
    agenda: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Meeting:", formData);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Create New Meeting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Meeting Title"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none"
          />
          <input
            type="date"
            name="date"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none"
          />
          <input
            type="time"
            name="time"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none"
          />
          <select
            name="type"
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="virtual">Virtual</option>
            <option value="physical">Physical</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <textarea
            name="agenda"
            placeholder="Meeting Agenda"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none"
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMeetingModal;
