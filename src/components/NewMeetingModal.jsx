import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const NewMeetingModal = ({ onAddMeeting, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [agenda, setAgenda] = useState("");

  const handleAdd = () => {
    const newMeeting = {
      id: uuidv4(),
      title,
      date,
      time,
      location,
      type,
      agenda,
    };
    onAddMeeting(newMeeting);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[50%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold text-gray-700 mb-3">
          Create New Meeting
        </h2>
        <p className="pl-4 mb-4 font-semibold text-gray-600">
          Enter the meeting details below
        </p>
        <div className="md:px-14 font-semibold">
          <input
            type="text"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          >
            <option value="">Select Type</option>
            <option value="virtual">Virtual</option>
            <option value="physical">Physical</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <textarea
            placeholder="Meeting Agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          ></textarea>
          <div className="text-center">
            <button
              onClick={handleAdd}
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md w-full md:w-1/2"
            >
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMeetingModal;
