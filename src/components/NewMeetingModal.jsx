import React, { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";

const NewMeetingModal = ({ isOpen, closeModal, onAddMeeting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleAdd = (e) => {
    e.preventDefault();
    const newMeeting = {
      id: uuidv4(),
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      endTime,
      location,
      type,
    };
    onAddMeeting(newMeeting);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition duration-300">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full px-14 py-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-gray-500 mb-6">
              Create New Meeting
            </h2>
            <form onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-[15px] font-semibold text-gray-700"
                  >
                    Meeting Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Enter meeting title"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-[15px] font-medium text-gray-700"
                  >
                    Meeting Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter meeting Description / Agenda / Links - for virtual and hybrid meetings"
                    className="w-full h-28 p-2 mt-1 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-between space-x-10">
                  <div className="w-full">
                    <label
                      htmlFor="startDate"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full mt-1 px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="endDate"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full mt-1 px-4 py-3 font-semibold text-red-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between space-x-10">
                  <div className="w-full">
                    <label
                      htmlFor="startTime"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      Start Time
                    </label>
                    <input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full mt-1 px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="endTime"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      End Time
                    </label>
                    <input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full mt-1 px-4 py-3 font-semibold text-red-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center space-x-10">
                  <div className="w-full">
                    <label
                      htmlFor="location"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter meeting location"
                      className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="type"
                      className="block text-[15px] font-semibold text-gray-700"
                    >
                      Meeting Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    >
                      <option value="physical">Physical</option>
                      <option value="virtual">Virtual</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 font-semibold px-12 mt-6 text-white py-[10px] rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <div className="flex items-center">
                    <LuCalendarPlus size={20} className="mr-4" />
                    <span>Create New Meeting</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewMeetingModal;
