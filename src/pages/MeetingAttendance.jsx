import React, { useState, useEffect } from "react";
import attendeesData from "../data/attendees.json";
import attendanceList from "../data/attendancelist.json";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import SignaturePad from "react-signature-canvas";
import Header from "../components/Header";

const MeetingAttendance = () => {
  const [attendees, setAttendees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    title: "",
    meetingRole: "participant",
    signature: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = attendeesData.filter((attendee) =>
        attendee.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleResultClick = (attendee) => {
    setFormData({
      ...formData,
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone,
      organization: attendee.organization,
      title: attendee.title,
    });
    setSearchQuery("");
    setFilteredResults([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
  };

  // Fetch attendance data for the table
  useEffect(() => {
    setAttendees(attendanceList);
  }, []);

  // Save data to local storage JSON file (simulating backend save)
  const saveAttendees = (newAttendees) => {
    setAttendees(newAttendees);
    // Here, you'd replace this with a call to your backend API in production
  };

  // Handle adding a new participant
  const handleAddParticipant = () => {
    // Check for existing attendee by name or email to avoid duplicates
    const attendeeExists = attendees.some(
      (attendee) =>
        attendee.name === formData.name || attendee.email === formData.email
    );

    if (attendeeExists) {
      alert("This participant is already registered.");
      return;
    }

    // Create a new attendee with signature placeholders for each day
    const newAttendee = {
      ...formData,
      signatures: {
        day1: "", // Placeholder for day 1 signature
        day2: "", // Placeholder for day 2 signature
        day3: "", // Placeholder for day 3 signature
      },
    };

    const updatedAttendees = [...attendees, newAttendee];
    saveAttendees(updatedAttendees);
    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      title: "",
      meetingRole: "participant",
      signature: "",
    });
    sigPad.clear(); // Clear the signature pad after submission
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle drawing signature
  const [sigPad, setSigPad] = useState({});
  const handleClearSignature = () => sigPad.clear();
  const handleSaveSignature = () => {
    if (!sigPad.isEmpty()) {
      setFormData((prevData) => ({
        ...prevData,
        signature: sigPad.getTrimmedCanvas().toDataURL("image/png"),
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-8 bg-gray-100 h-screen container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Meeting Name</h1>

        {/* Meeting Details Section */}
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <p>
            <strong>Venue:</strong> Online
          </p>
          <p>
            <strong>Date:</strong> 2024-11-08
          </p>
          <p>
            <strong>Meeting Type:</strong> Virtual
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 float-right">
            Mark Attendance
          </button>
        </div>

        {/* Meeting Attendance Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Meeting Attendance
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Add New Participant
          </button>
        </div>
        <p>Day 1: 2024-11-08</p>

        {/* Attendance Table */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left text-gray-700">Participant Name</th>
              <th className="p-4 text-left text-gray-700">Email</th>
              <th className="p-4 text-left text-gray-700">Phone</th>
              <th className="p-4 text-left text-gray-700">Organization</th>
              <th className="p-4 text-left text-gray-700">Meeting Role</th>
              <th className="p-4 text-left text-gray-700">Day 1</th>
              <th className="p-4 text-left text-gray-700">Day 2</th>
              <th className="p-4 text-left text-gray-700">Day 3</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((attendee, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="p-4">{attendee.name}</td>
                <td className="p-4">{attendee.email}</td>
                <td className="p-4">{attendee.phone}</td>
                <td className="p-4">{attendee.organization}</td>
                <td className="p-4">{attendee.meetingRole}</td>

                {/* Display signatures for each day */}
                <td className="p-4 italic text-sm text-blue-500 text-center">
                  {attendee.signatures.day1 ? (
                    <img
                      src={attendee.signatures.day1}
                      alt="Day 1 Signature"
                      className="h-8 mx-auto "
                    />
                  ) : (
                    "Not Signed"
                  )}
                </td>
                <td className="p-4 italic text-sm text-blue-500 text-center">
                  {attendee.signatures.day2 ? (
                    <img
                      src={attendee.signatures.day2}
                      alt="Day 2 Signature"
                      className="h-8 mx-auto"
                    />
                  ) : (
                    "Not Signed"
                  )}
                </td>
                <td className="p-4 italic text-sm text-blue-500 text-center">
                  {attendee.signatures.day3 ? (
                    <img
                      src={attendee.signatures.day3}
                      alt="Day 3 Signature"
                      className="h-8 mx-auto"
                    />
                  ) : (
                    "Not Signed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Participant Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-2/3 relative">
              <button
                className="absolute text-2xl top-4 right-4 text-red-500 hover:text-red-700"
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-amber-700">
                Sign Your Attendance
              </h2>
              <p className="font-semibold mb-4 text-gray-500">
                Search your name or email in the search field below if you've
                ever used the system to sign attendance before
              </p>
              <div className="flex items-center "></div>
              <div className="relative mb-6">
                <div className="flex items-center bg-gray-200 md:text-base text-sm rounded-full px-4 py-[11px] md:py-3 w-full shadow-sm p-2 ">
                  <FaSearch className="text-gray-600 md:mx-4" />
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search your name or email if you've used the system to sign attendance before"
                    className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="ml-2 text-gray-500"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Search Results Overlay */}
                {filteredResults.length > 0 && (
                  <div className="absolute left-10 right-10 bg-gray-200 border border-gray-300 rounded-sm shadow-lg max-h-56 overflow-y-auto z-10">
                    {filteredResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <span className="font-semibold">{result.name}</span>
                        <span className="text-gray-500 font-semibold ml-4">
                          {result.email}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="font-semibold mb-4">
                Confirm the Selected details below:
              </p>

              <p className="font-semibold mb-4">
                If not found, enter your details below:
              </p>
              <div className="flex">
                {/* Form Fields */}
                <div className="w-1/2 mr-10 font-semibold">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300 rounded-md "
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization / Ministry / Company"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title in your Organization / Ministry / Company"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Signature Pad */}
                <div className="w-1/2">
                  <select
                    name="meetingRole"
                    value={formData.meetingRole}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 font-semibold p-3 border border-gray-300 rounded-md"
                  >
                    <option value="participant">Participant</option>
                    <option value="chair">Chair</option>
                    <option value="rapporteur">Rapporteur</option>
                    <option value="secretary">Secretary</option>
                    <option value="speaker">Speaker</option>
                    <option value="host">Host</option>
                  </select>
                  <SignaturePad
                    ref={(ref) => setSigPad(ref)}
                    canvasProps={{
                      className:
                        "signatureCanvas bg-gray-200 border border-gray-300 rounded-md h-40 w-full mb-2",
                    }}
                  />
                  <div className="">
                    <button
                      onClick={handleClearSignature}
                      className="bg-red-500 text-sm font-semibold text-white px-4 py-2 rounded-sm"
                    >
                      Clear Signature
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleAddParticipant}
                  className="mt-4 bg-blue-500 font-semibold text-white px-4 py-2 rounded-sm"
                >
                  Submit Attendance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingAttendance;
