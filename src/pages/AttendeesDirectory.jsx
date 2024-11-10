import React, { useState, useEffect } from "react";
import ViewAttendeeModal from "../components/ViewAttendeeModal";
import AddAttendeeModal from "../components/AddAttendeeModal";
import EditAttendeeModal from "../components/EditAttendeeModal";
import { FaPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import attendeesData from "../data/attendees.json";
import Header from "../components/Header";

const AttendeesDirectory = () => {
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAttendees(attendeesData);
    setFilteredAttendees(attendeesData);
  }, []);

  useEffect(() => {
    setFilteredAttendees(
      attendees.filter((attendee) =>
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, attendees]);

  const handleViewAttendee = (attendee) => {
    setSelectedAttendee(attendee);
    setShowViewModal(true);
  };

  const handleDeleteAttendee = (id) => {
    setAttendees(attendees.filter((attendee) => attendee.id !== id));
  };

  const handleAddAttendee = (newAttendee) => {
    setAttendees([...attendees, newAttendee]);
    setShowAddModal(false);
  };

  const handleEditAttendee = (updatedAttendee) => {
    setAttendees(
      attendees.map((attendee) =>
        attendee.id === updatedAttendee.id ? updatedAttendee : attendee
      )
    );
    setShowEditModal(false);
  };

  const handleOpenEditModal = (attendee, e) => {
    e.stopPropagation();
    setSelectedAttendee(attendee);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="md:container mx-auto px-4 p-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Attendees Directory
          </h1>
          <div className="flex flex-col md:flex-row items-center space-x-3 w-full md:w-1/2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-center text-white px-4 w-1/3 py-2 font-semibold rounded-md hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Attendee
            </button>
            <div className="flex items-center bg-gray-200 border border-gray-300 md:text-base text-sm rounded-md px-4 py-[10px] md:py-2 w-2/3">
              <FaSearch className="text-gray-600 md:mx-4" />
              <input
                type="text"
                placeholder="Search Name, email or phone to filter"
                className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500">
            <tr className="text-white font-semibold">
              <th className="p-4 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Organization</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.map((attendee, index) => (
              <tr
                key={attendee.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-500`}
                onClick={() => handleViewAttendee(attendee)}
              >
                <td className="p-3">{index + 1} .</td>
                <td className="p-3 text-gray-700">{attendee.name}</td>
                <td className="p-3">{attendee.email}</td>
                <td className="p-3">{attendee.phone}</td>
                <td className="p-3">{attendee.organization}</td>
                <td className="p-3">{attendee.title}</td>
                <td className="p-3 text-center flex items-center space-x-3">
                  <div
                    onClick={(e) => handleOpenEditModal(attendee, e)}
                    className="text-blue-500 flex items-center hover:text-blue-600"
                  >
                    <FaEdit />
                    <p className="px-3 font-semibold">Edit</p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAttendee(attendee.id);
                    }}
                    className="text-red-500 hover:text-red-600 flex items-center"
                  >
                    <FaTrash />
                    <p className="px-3 font-semibold">Delete</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showViewModal && (
          <ViewAttendeeModal
            attendee={selectedAttendee}
            onClose={() => setShowViewModal(false)}
          />
        )}
        {showAddModal && (
          <AddAttendeeModal
            onAddAttendee={handleAddAttendee}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showEditModal && (
          <EditAttendeeModal
            attendee={selectedAttendee}
            onSave={handleEditAttendee}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AttendeesDirectory;
