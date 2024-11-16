import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
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
import AttendanceTable from "../components/AttendanceTable";

// Helper function to calculate the number of days
const getMeetingDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = [];
  while (start <= end) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return days;
};

const MeetingAttendance = () => {
  const { meetingID, meetingDate } = useParams(); 
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

  const [meetingDays, setMeetingDays] = useState([]);
  const [meetingStartDate, setMeetingStartDate] = useState([]);

  useEffect(() => {
    fetchMeetingDetails();
  }, []);

  const fetchMeetingDetails = async () => {
    try {
      const response = await axios.get(`/meetings/getMeeting/${meetingID}`);
      setMeetingDetails(response.data);
      setMeetingStartDate(response.data.startDate);
      const days = getMeetingDays(
        response.data.startDate,
        response.data.endDate
      );
      setMeetingDays(days);
    } catch (error) {
      console.error("Error fetching meeting details:", error);
      setModalNotificationMessage(
        "Error fetching meeting details. Please check your internet connection."
      );
      setModalNotificationType("error");
      setShowNotificationModal(true);
    }
  };

  // Set attendees list
  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        `/participation/getParticipationByMeeting/${meetingID}/${meetingDate}`
      );
      const participantsData = response.data;

      // Sort participantsData by `id` in descending order (latest at the top)
      const sortedParticipants = participantsData.sort((a, b) => b.id - a.id);

      setAttendees(sortedParticipants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  // Fetch participants whenever the modal closes
  useEffect(() => {
    if (!showAddModal) {
      fetchParticipants();
    }
  }, [showAddModal]);

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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-amber-700 border-solid border-opacity-80"></div>
        <p className="mt-4 text-gray-500 font-semibold text-lg">
          Loading meeting details...
        </p>
      </div>
    ); // Show loading message while fetching the meeting details
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

        <div className="meeting-days-overflow pl-2 flex space-x-6 mb-3 overflow-x-auto">
          {meetingDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <p
                key={index}
                className={`px-4 max-h-7 min-w-[12%] py-1 text-sm cursor-pointer font-semibold rounded-sm text-gray-500 ${
                  isToday
                    ? "bg-amber-600 text-white"
                    : "bg-gray-300 hover:bg-amber-600 hover:text-white"
                }`}
              >
                Day {index + 1}: {formatDate(day)}
              </p>
            );
          })}
        </div>

        {/* Attendance Table */}
        <AttendanceTable meetingDays={meetingDays} attendees={attendees} />

        {/* Add New Participant Modal */}
        <AddParticipantModal
          meetingId={meetingID}
          meetingStartDate={meetingStartDate}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          // onSuccess={() => setShowAddModal(false)}
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
