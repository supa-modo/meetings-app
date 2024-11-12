import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa"; // For Save and Close icons

const EditMeetingModal = ({
  isOpen,
  closeModal,
  meeting,
  saveMeetingDetails,
}) => {
  const [formData, setFormData] = useState(
    meeting
    // title: meeting?.title || "",
    // description: meeting?.description || "",
    // startDate: meeting?.startDate || "",
    // endDate: meeting?.endDate || "",
    // startTime: meeting?.startTime || "",
    // endTime: meeting?.endTime || "",
    // location: meeting?.location || "",
    // type: meeting?.type || "",
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMeetingDetails(formData);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition duration-300">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full px-14  py-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold text-gray-500 mb-6">
              Edit Meeting Details -
              <span className="text-green-700">
                _Meeting ID. {meeting.id || "120322"}
              </span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* meeting title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-[15px] font-medium text-gray-600"
                  >
                    Meeting Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Enter meeting title"
                    required
                  />
                </div>
                {/* meeting description */}

                <div>
                  <label
                    htmlFor="description"
                    className="block text-[15px] font-medium text-gray-600"
                  >
                    Meeting Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter meeting Description / Agenda / Links - for virtual and hybrid meetings"
                    className=" w-full h-28 p-2 mt-1 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                  ></textarea>
                </div>
                {/* Dates for the meeting */}
                <div className="flex justify-between space-x-10">
                  <div className="w-full">
                    <label
                      htmlFor="startDate"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Meeting Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="endDate"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Meeting End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-3 font-semibold text-red-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Time inputs for the meeting */}

                <div className="flex justify-between space-x-10">
                  <div className="w-full">
                    <label
                      htmlFor="startTime"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Meeting Start Time
                    </label>
                    <input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-3 font-semibold text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="endTime"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Meeting End Time
                    </label>
                    <input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-3 font-semibold text-red-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center space-x-10">
                  {/* location of meeting */}
                  <div className="w-full ">
                    <label
                      htmlFor="location"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Location
                    </label>

                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter the meeting's location"
                      className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    />
                  </div>
                  {/* meeting type */}
                  <div className="w-full ">
                    <label
                      htmlFor="type"
                      className="block text-[15px] font-medium text-gray-600"
                    >
                      Meeting Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-3 font-semibold text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      required
                    >
                      <option value="physical">Physical Meeting</option>
                      <option value="virtual">Virtual Meeting</option>
                      <option value="hybrid">Hybrid Meeting</option>
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
                    <FaSave className="mr-4" />
                    <span> Update Meeting Details</span>
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

export default EditMeetingModal;
