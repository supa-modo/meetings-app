import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import NotificationModal from "./NotificationModal";
import { IoMdPersonAdd } from "react-icons/io";

const AddAttendeeModal = ({ onAddAttendee, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");

  const [modalNotificationMessage, setModalNotificationMessage] = useState(""); // For error/success messages
  const [modalNotificationType, setModalNotificationType] = useState(""); // "success" or "error"
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleAdd = () => {
    // Check if all fields have values before proceeding
    if (!name || !email || !phone || !organization || !title) {
      setModalNotificationMessage(
        "Please fill in all fields before proceeding."
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");

      return;
    }

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition duration-300">
      <div className="bg-white rounded-lg p-6 w-[50%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-500 mb-5">
          Add New Attendee
        </h2>
        <p className="pl-4 mb-4 font-semibold text-gray-600">
          Enter the new participant's details below
        </p>
        <div className="md:px-14 font-semibold">
          <input
            type="text"
            placeholder="Participant's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Participant's Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-[13px] border border-gray-300 rounded-lg w-full mb-2"
            required
          />

          <div className="text-center">
            <button
              onClick={handleAdd}
              className="bg-blue-500 font-semibold px-14 mt-6 text-white py-[10px] rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <div className="flex items-center">
                <IoMdPersonAdd size={20} className="mr-4" />
                <span>Add New Attendee</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => {
          setShowNotificationModal(false);
        }}
        message={modalNotificationMessage}
        modalType={modalNotificationType}
      />
    </div>
  );
};

export default AddAttendeeModal;
