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
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Add New Attendee
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Add Attendee
        </button>
      </div>
    </div>
  );
};

export default AddAttendeeModal;
