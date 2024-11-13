import React, { useState, useEffect } from "react";
import attendanceList from "../data/attendancelist.json";
import { FaMapMarkerAlt, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import SignaturePad from "react-signature-canvas";
import Header from "../components/Header";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import NotificationModal from "../components/NotificationModal";
import { IoCalendarOutline } from "react-icons/io5";
import AttendanceButton from "../components/AttendanceButtong";
import AddParticipantModal from "../components/AddParticipantModal";
import NavBar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { formatDate, formatTime } from "../utils/dateTimeFunctions";

const MeetingAttendance = () => {
  const { meetingID } = useParams(); // Extract the meeting ID from the URL parameters
  const navigate = useNavigate();
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [modalNotificationMessage, setModalNotificationMessage] = useState(""); // For error/success messages
  const [modalNotificationType, setModalNotificationType] = useState(""); // "success" or "error"
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [searchQueryList, setSearchQueryList] = useState("");
  const [filteredResultsTable, setFilteredResultsTable] = useState([]);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(`/meetings/getMeeting/${meetingID}`);
        setMeetingDetails(response.data); // Set the meeting details into state
      } catch (error) {
        console.error("Error fetching meeting details:", error);
        setModalNotificationMessage(
          "Error fetching meeting details. Please check your internet connection."
        );
        setModalNotificationType("error");
        setShowNotificationModal(true);
      }
    };

    fetchMeetingDetails();
  }, [meetingID]); // Re-fetch when the meeting ID changes

  // Set attendees list
  useEffect(() => {
    setAttendees(attendanceList);
  }, []);

  // Filter attendance list based on search query
  useEffect(() => {
    if (searchQueryList.trim() === "") {
      setFilteredResultsTable([]); // If no search query, reset the filtered results
    } else {
      const results = attendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(searchQueryList.toLowerCase()) ||
          attendee.email.toLowerCase().includes(searchQueryList.toLowerCase())
      );
      setFilteredResultsTable(results);
    }
  }, [searchQueryList, attendees]);

  if (!meetingDetails) {
    return <div>Loading meeting details...</div>; // Show loading message while fetching the meeting details
  }

  // function to simulate loading and starting the attendance signing
  const handleStartAttendance = () => {
    setIsLoading((prevIsLoading) => {
      const newLoadingState = !prevIsLoading;
      setIsAttendanceStarted(newLoadingState); // Sync with isLoading
      return newLoadingState;
    });
  };

  //function to handle searching in the Attendance list table
  const handleSearchChangeTable = (e) => {
    setSearchQueryList(e.target.value); // Update search query
  };

  const clearSearch = () => {
    setSearchQueryList(""); // Clear search input
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 ">
        <Header />
        <NavBar />
      </div>
      <div className="p-8 bg-gray-100 min-h-screen container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-amber-700">
          {meetingDetails?.title}
        </h1>

        {/* Meeting Details Section */}
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <div className="flex flex-wrap gap-10 mb-5 text-gray-500 font-semibold">
            <div className="flex items-center">
              <IoMdPeople size={20} className="mr-[10px]" />
              <span>
                {meetingDetails.type === "physical"
                  ? "Physical Meeting"
                  : meetingDetails.type === "virtual"
                  ? "Virtual Meeting"
                  : meetingDetails.type === "hybrid"
                  ? "Hybrid Meeting"
                  : "Unknown Meeting Type"}
              </span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt size={20} className="mr-[10px]" />
              <span>{meetingDetails.location || "Location N/A"}</span>
            </div>
            <div className="flex items-center">
              <IoCalendarOutline size={20} className="mr-[10px]" />
              <span className="text-green-600 mr-1">
                {formatDate(meetingDetails.startDate) || "Start Date"}
              </span>
              <span>-</span>
              <span className="text-red-700 ml-1">
                {formatDate(meetingDetails.endDate) || "End Date"}
              </span>
            </div>
            <div className="flex items-center">
              <MdOutlineAccessTime size={25} className="mr-[10px]" />
              <span className="mx-1">
                {" "}
                {formatTime(meetingDetails.startTime) || "00.00AM "}
              </span>
              to
              <span className="mx-1">
                {formatTime(meetingDetails.endTime) || " 00.00AM "}
              </span>
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-600 ">
              Meeting Description
            </span>
            <p className="line-clamp-3 text-ellipsis">
              {meetingDetails.description || "Meeting Description Placeholder"}
            </p>
          </div>

          <AttendanceButton
            isLoading={isLoading}
            onClick={handleStartAttendance}
          />
        </div>

        {/* Meeting Attendance Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl w-2/3 font-semibold text-amber-700">
            Meeting Attendance List
          </h2>
          <div className="w-full items-center flex space-x-8 mb-3">
            <button
              onClick={() => setShowAddModal(true)}
              disabled={!isAttendanceStarted}
              className={`bg-green-600 text-white px-10 py-2 text-[15px] font-semibold rounded-sm flex items-center ${
                !isAttendanceStarted ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaPlus className="mr-2" /> Add New Participant
            </button>
            <div className="flex items-center bg-gray-200 border border-gray-300 md:text-base text-sm rounded-md w-2/3 px-4 py-[10px] md:py-2 shadow-sm p-2 ">
              <FaSearch className="text-gray-600 md:mx-4" />
              <input
                type="text"
                name="search"
                value={searchQueryList}
                onChange={handleSearchChangeTable}
                placeholder="Search your name or email from the attendance list"
                className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
              />
              {searchQueryList && (
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
                } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-500`}
              >
                <td className="p-3">{index + 1} .</td>
                <td className="p-3 text-gray-700">{attendee.name}</td>
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
        <AddParticipantModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
        />

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
