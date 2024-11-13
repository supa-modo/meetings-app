import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import axios from "../utils/axios";
import { formatTime2 } from "../utils/dateTimeFunctions";
import moment from "moment";
import NotificationModal from "./NotificationModal";

const NewMeetingModal = ({ isOpen, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("physical"); // default to "physical"
  const [loading, setLoading] = useState(false);

  // Notification state
  const [modalNotificationMessage, setModalNotificationMessage] = useState("");
  const [modalNotificationType, setModalNotificationType] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const validateForm = () => {
    if (
      !title ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !location ||
      !type
    ) {
      setModalNotificationMessage("All fields are required.");
      setModalNotificationType("error");
      return false;
    }

    if (moment(startDate).isAfter(moment(endDate))) {
      setModalNotificationMessage("Start date must be before end date.");
      setModalNotificationType("error");
      return false;
    }

    if (moment(startTime, "HH:mm").isAfter(moment(endTime, "HH:mm"))) {
      setModalNotificationMessage("Start time must be before end time.");
      setModalNotificationType("error");
      return false;
    }

    return true;
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowNotificationModal(true);
      return;
    }

    setLoading(true);
    const meetingData = {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      type,
    };

    try {
      await axios.post("/meetings/createMeeting", meetingData);
      setModalNotificationMessage("New Meeting has been added successfully");
      setModalNotificationType("success");
      closeModal();
    } catch (error) {
      setModalNotificationMessage("Error adding meeting. Please try again.");
      setModalNotificationType("error");
    } finally {
      setShowNotificationModal(true);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "type":
        setType(value);
        break;
      default:
        break;
    }
  };

  const handleInputChangeTime = (e) => {
    const { name, value } = e.target;
    const formattedTime = new Date(`1970-01-01T${value}:00`).toISOString();
    name === "startTime"
      ? setStartTime(formattedTime)
      : setEndTime(formattedTime);
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      value={startTime ? formatTime2(startTime, "HH:mm") : ""}
                      onChange={handleInputChangeTime}
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
                      value={endTime ? formatTime2(endTime, "HH:mm") : ""}
                      onChange={handleInputChangeTime}
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
                      onChange={handleInputChange}
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
                    <LuCalendarPlus size={20} className="mr-4" />
                    <span>Create New Meeting</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => {
          setShowNotificationModal(false);
        }}
        message={modalNotificationMessage}
        modalType={modalNotificationType}
      />
    </>
  );
};

export default NewMeetingModal;
