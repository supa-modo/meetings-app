import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const AddAttendeeModal = ({ onAddAttendee, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const newAttendee = {
      id: uuidv4(),
      name,
      email,
      phone,
      organization,
      title,
    };
    onAddAttendee(newAttendee);
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
          Add New Attendee
        </h2>
        <p className="pl-4 mb-4 font-semibold text-gray-600">Enter the participant's details below</p>
        <div className=" md:px-14 font-semibold">
          <input
            type="text"
            placeholder="Participant's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            placeholder="Participant's Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
          />
          <div className=" text-center">
            <button
              onClick={handleAdd}
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md w-full md:w-1/2"
            >
              Add Attendee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAttendeeModal;
