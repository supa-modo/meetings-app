import React, { useState, useEffect } from "react";
import attendeesData from "../data/attendees.json";
import attendanceList from "../data/attendancelist.json";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import SignaturePad from "react-signature-canvas";
import Header from "../components/Header";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import NotificationModal from "../components/NotificationModal";

const MeetingAttendance = () => {
  const [attendees, setAttendees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    title: "",
    meetingRole: "participant",
    signature: "",
  });

  const [modalNotificationMessage, setModalNotificationMessage] = useState(""); // For error/success messages
  const [modalNotificationType, setModalNotificationType] = useState(""); // "success" or "error"
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryList, setSearchQueryList] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsTable, setFilteredResultsTable] = useState([]);

  const handleSearchChangeTable = (e) => {
    const query = e.target.value;
    setSearchQueryList(query);

    if (query) {
      const results = attendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(query.toLowerCase()) ||
          attendee.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResultsTable(results);
    } else {
      setFilteredResultsTable([]);
    }
  };

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
    setSelectedResult(attendee);
    setSearchQuery("");
    setFilteredResults([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
    setSelectedResult(null);
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
      setModalNotificationMessage(
        "This participant is already in the attendance list. Find the name from the attendance list on the table to add your signature"
      );
      setModalNotificationType("error");
      setShowNotificationModal(true);
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
    setModalNotificationMessage(
      "Your attendance has been recorded successfully. Please pass the device to the next person"
    );
    setModalNotificationType("success");
    setShowNotificationModal(true);
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
    console.log(newAttendee);
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
        <h1 className="text-2xl font-bold mb-4 text-amber-700">
          Meeting Name PlaceHolder Text Example
        </h1>

        {/* Meeting Details Section */}
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <div className="flex flex-wrap gap-10 mb-5 text-gray-500 font-semibold">
            <div className="flex items-center">
              <IoMdPeople size={20} className="mr-[10px]" />
              <span>{"Physical Meeting"}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt size={20} className="mr-[10px]" />
              <span>{"Arusha, Tanzania"}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt size={20} className="mr-[10px]" />
              <span className="text-green-600 mr-1">{"November 11, 2024"}</span>
              <span>-</span>
              <span className="text-red-700 ml-1">{"November 14, 2024"}</span>
            </div>
            <div className="flex items-center">
              <MdOutlineAccessTime size={25} className="mr-[10px]" />
              <span>{"9.00AM - 5.00PM"}</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-600">Description</span>
            <p className="line-clamp-3 text-ellipsis">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              optio! Dolorem facere tempora mollitia. Voluptatibus dolorem id
              quam veritatis ab iusto corrupti nam vel. Officia enim porro ab
              quisquam sunt. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Adipisci enim ipsum harum dolorem eaque modi deleniti
              facere, sed perferendis aspernatur repellat laborum nulla odit
              animi tempore nobis? Libero, maxime autem. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Cum blanditiis commodi fugit
              doloribus officia qui inventore ullam aliquam, dolores odit ipsum
              reiciendis voluptatibus neque ex culpa totam tenetur ea! Harum!
            </p>
          </div>

          <div className="">
            <button className="bg-blue-500 text-white font-semibold px-8 py-2 text-[14px] rounded-sm mt-4 ">
              Start Marking Attendance
            </button>
          </div>
        </div>

        {/* Meeting Attendance Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl w-2/3 font-bold text-amber-700">
            Meeting Attendance
          </h2>
          <div className="w-full items-center flex space-x-8 mb-3">
            {/* <div className=" items-center"> */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-10 py-2 text-[15px] font-semibold rounded-sm flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Participant
            </button>
            {/* </div> */}
            <div className="flex items-center bg-gray-200 md:text-base text-sm rounded-md w-2/3 px-4 py-[10px] md:py-2 shadow-sm p-2 ">
              <FaSearch className="text-gray-600 md:mx-4" />
              <input
                type="text"
                name="search"
                value={searchQueryList}
                onChange={handleSearchChangeTable}
                placeholder="Search your name or email"
                className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="ml-2 text-red-500">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pl-2 flex space-x-6 mb-3">
          <p
            onClick={null}
            className="px-4 py-1 text-sm cursor-pointer hover:bg-amber-600 hover:text-white font-semibold rounded-sm text-gray-500 bg-gray-300"
          >
            Day 1: 2024-11-08
          </p>
          <p className="px-4 py-1 text-sm cursor-pointer hover:bg-amber-600 hover:text-white font-semibold rounded-sm text-white bg-amber-600">
            Day 2: 2024-11-08
          </p>
          <p className="px-4 py-1 text-sm cursor-pointer hover:bg-amber-600 hover:text-white font-semibold rounded-sm text-gray-500 bg-gray-300">
            Day 3: 2024-11-08
          </p>
          <p className="px-4 py-1 text-sm cursor-pointer hover:bg-amber-600 hover:text-white font-semibold rounded-sm text-gray-500 bg-gray-300">
            Day 4: 2024-11-08
          </p>

          <p className="px-4 py-1 text-sm cursor-pointer hover:bg-amber-600 hover:text-white font-semibold rounded-sm text-gray-500 bg-gray-300">
            Day 5: 2024-11-08
          </p>
        </div>

        {/* Attendance Table */}
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500">
            <tr className="text-white">
              <th className="p-4 text-left">#</th>
              <th className="px-3 py-4 text-left ">Participant Name</th>
              <th className="px-3 py-4 text-left ">Email</th>
              <th className="px-3 py-4 text-left ">Phone</th>
              <th className="px-3 py-4 text-left ">Organization</th>
              <th className="px-3 py-4 text-left ">Meeting Role</th>
              <th className="px-3 py-4 text-left ">Day 1</th>
              <th className="px-3 py-4 text-left ">Day 2</th>
              <th className="px-3 py-4 text-left ">Day 3</th>
            </tr>
          </thead>
          <tbody>
            {(filteredResultsTable.length
              ? filteredResultsTable
              : attendees
            ).map((attendee, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200`}
              >
                <td className="p-3">{index + 1} .</td>
                <td className="p-3">{attendee.name}</td>
                <td className="p-3">{attendee.email}</td>
                <td className="p-3">{attendee.phone}</td>
                <td className="p-3">{attendee.organization}</td>
                <td className="p-3">{attendee.meetingRole}</td>

                {/* Display signatures for each day */}
                <td className="p-3 italic text-sm text-blue-500 text-center">
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
                <td className="p-3 italic text-sm text-blue-500 text-center">
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
                <td className="p-3 italic text-sm text-blue-500 text-center">
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
                    placeholder="Search your name or email and select from the list results"
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
                {filteredResults.length > 0 ? (
                  <div className="absolute left-10 right-10 bg-gray-200 border border-gray-300 rounded-sm shadow-lg max-h-56 overflow-y-auto z-10">
                    {filteredResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <span className="font-semibold pl-5">
                          {result.name}
                        </span>
                        <span className="text-gray-500 font-semibold ml-4">
                          {result.email}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : searchQuery && filteredResults.length === 0 ? (
                  <div className="absolute left-10 right-10 text-center bg-gray-200 border border-gray-300 rounded-sm shadow-lg z-10 p-4 text-gray-600">
                    Name or email not found in the database
                  </div>
                ) : null}
              </div>

              {selectedResult ? (
                <p className="font-semibold mb-4">
                  Confirm your details below from the selection:
                </p>
              ) : (
                <p className="font-semibold mb-4">
                  If not found, enter your details below:
                </p>
              )}

              <div className="flex">
                {/* Form Fields */}
                <div className="w-1/2 mr-10 font-semibold">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300sm "
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
                  />
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization / Ministry / Company"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title in your Organization / Ministry / Company"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
                  />
                </div>

                {/* Signature Pad */}
                <div className="w-1/2">
                  <select
                    name="meetingRole"
                    value={formData.meetingRole}
                    onChange={handleChange}
                    className="w-full mb-4 pl-5 font-semibold p-3 border border-gray-300sm"
                  >
                    <option value="participant">Participant</option>
                    <option value="chair">Chair</option>
                    <option value="rapporteur">Rapporteur</option>
                    <option value="secretary">Secretary</option>
                    <option value="speaker">Speaker</option>
                    <option value="host">Host</option>
                  </select>
                  <p className="font-semibold text-gray-600">
                    Please draw your signature in the empty box below:
                  </p>
                  <SignaturePad
                    ref={(ref) => setSigPad(ref)}
                    canvasProps={{
                      className:
                        "signatureCanvas bg-gray-200 border border-gray-300sm h-40 w-full mb-2",
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
                  className="mt-4 bg-blue-500 font-semibold text-white px-8 py-2 rounded-sm"
                >
                  Submit Attendance
                </button>
              </div>
            </div>
          </div>
        )}

        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => {
            setShowNotificationModal(false);
          }}
          message={modalNotificationMessage}
          modalType={modalNotificationType}
        />
      </div>
    </div>
  );
};

export default MeetingAttendance;
