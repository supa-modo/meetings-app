import React, { useState, useEffect, useRef } from "react";
import axios from "../utils/axios";
import MeetingCard from "../components/MeetingCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import NewMeetingModal from "../components/AddMeetingModal";
import EditMeetingModal from "../components/EditMeetingModal";
import { formatDate, formatTime } from "../utils/dateTimeFunctions";
import { FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import NotificationModal from "../components/NotificationModal";

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [isEditMeetingModalOpen, setIsEditMeetingModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const navigate = useNavigate();

  const [modalNotificationMessage, setModalNotificationMessage] = useState(""); // For error/success messages
  const [modalNotificationType, setModalNotificationType] = useState(""); // "success" or "error"
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    setFilteredMeetings(
      meetings.filter((meetings) =>
        meetings.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, meetings]);

  const sortedMeetings = filteredMeetings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("/meetings/getAllMeetings");
      setMeetings(response.data);
    } catch (error) {
      console.error(
        "Error fetching attendees, Please check your internet connection"
      );
      setModalNotificationMessage(
        "Error fetching meetings, check your internet connection:"
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");
    }
  };

  // Update a meeting
  const saveMeetingDetails = async (updatedData) => {
    try {
      const response = await axios.put(
        `/meetings/updateMeeting/${selectedMeeting.id}`,
        updatedData
      );
      setMeetings(
        meetings.map((meeting) =>
          meeting.id === selectedMeeting.id ? response.data : meeting
        )
      );
      setIsEditMeetingModalOpen(false);
      setSelectedMeeting(null);
      setModalNotificationMessage("Meeting has been updated successfully");
      setShowNotificationModal(true);
      setModalNotificationType("success");
      await fetchMeetings();
    } catch (error) {
      console.error("Error updating meeting:", error);
      setModalNotificationMessage(
        "Error updating meeting details, Please check your internet connection and try again"
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");
    }
  };

  // Delete a meeting
  const handleDeleteMeeting = async (id) => {
    try {
      await axios.delete(`/meetings/deleteMeeting/${id}`);
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== id)
      );
      setModalNotificationMessage("Meeting has been deleted successfully");
      setShowNotificationModal(true);
      setModalNotificationType("success");
      await fetchMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      setModalNotificationMessage(
        "Error deleting meeting, Please check your internet connection and try again"
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");
    }
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Calculate number of dots based on meetings
  const totalCards = meetings.length;
  const dotsCount = Math.ceil(totalCards / 3); // Display 3 cards per view (adjust as needed)
  const activeDotIndex = Math.floor(
    (scrollPosition / (scrollContainerRef.current?.offsetWidth || 1)) *
      dotsCount
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = meetings.filter((meeting) =>
        meeting.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeetings(results);
    } else {
      setFilteredMeetings([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredMeetings([]);
  };

  const openNewMeetingModal = () => setIsNewMeetingModalOpen(true);
  const closeNewMeetingModal = () => {
    setIsNewMeetingModalOpen(false);
    fetchMeetings();
  };

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setIsEditMeetingModalOpen(true);
  };

  const closeEditMeetingModal = () => {
    setIsEditMeetingModalOpen(false);
    setSelectedMeeting(null);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="sticky top-0 z-10 ">
        <Header />
        <NavBar />
      </div>
      <div className="md:container mx-auto px-10 py-4 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-amber-700 mb-4">
          Upcoming Meetings
        </h1>
        {/* Display meetings in a single row with horizontal scrolling */}
        <div className="relative mb-6">
          <div
            ref={scrollContainerRef}
            className="cards-overflow flex overflow-x-auto space-x-6 sm:space-x-4 md:space-x-6 lg:space-x-8 snap-x snap-mandatory"
          >
            {sortedMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
              />
            ))}
          </div>

          {/* Dot Indicator Below Cards */}
          <div className="flex justify-center mt-1">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-2 cursor-pointer ${
                  index === activeDotIndex ? "bg-green-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Meetings Table */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-amber-700 ">All Meetings</h1>
          <div className="flex space-x-8 w-2/3">
            <button
              onClick={openNewMeetingModal}
              className="bg-blue-500 text-[15px] text-center text-white pl-8 pr-12 py-2 w-1/4 font-semibold rounded-sm hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-3" /> Add New Meeting
            </button>
            <div className="flex items-center bg-gray-200 rounded-md w-3/4 px-4 shadow-sm">
              <FaSearch className="text-gray-600" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search meeting name or title"
                className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="ml-2 text-gray-500">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Meetings Table */}
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500 text-left">
            <tr className="text-white font-medium">
              <th className="pl-3">Meeting ID</th>
              <th className="pl-2 py-3">Meeting Title</th>
              <th className="pl-2 py-3">Meeting Date</th>
              <th className="pl-2 py-3">Time</th>
              <th className="pl-2 py-3">Location</th>
              <th className="pl-2 py-3">Type</th>
              <th className="pl-2 text-center">Attended</th>
              <th className="pl-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(sortedMeetings.length ? sortedMeetings : meetings).map(
              (meeting, index) => (
                <tr
                  key={meeting.id}
                  className={`pl-2 py-3 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                  } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-600`}
                  onClick={() => navigate(`/meetings/${meeting.id}`)}
                >
                  <td className="pl-3">{meeting.id}</td>
                  <td className="pl-2 py-3 text-gray-700 max-w-[260px] truncate">
                    {meeting.title}
                  </td>
                  <td className="pl-2 py-3">
                    <span className="text-gray-500">
                      {formatDate(meeting.startDate)} -{" "}
                    </span>
                    <span className="text-gray-500">
                      {formatDate(meeting.endDate)}
                    </span>
                  </td>
                  <td>
                    <span className="text-green-600">
                      {formatTime(meeting.startTime)} -{" "}
                    </span>
                    <span className="text-red-500">
                      {formatTime(meeting.endTime)}
                    </span>
                  </td>

                  <td className="pl-2 py-3 max-w-[160px] truncate">
                    {meeting.location}
                  </td>
                  <td className="pl-2 py-3">{meeting.type}</td>
                  <td className="pl-2 py-3 font-semibold text-center">
                    {meeting.attended || "--"}
                  </td>

                  <td className="pr-3 py-3 text-center flex items-center max-w-[150px] space-x-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMeeting(meeting);
                      }}
                      className="text-blue-500 flex items-center hover:text-blue-600 cursor-pointer"
                    >
                      <FaEdit />
                      <p className="px-3 font-semibold">Edit</p>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMeeting(meeting.id);
                      }}
                      className="text-red-500 hover:text-red-600 flex items-center cursor-pointer"
                    >
                      <FaTrash />
                      <p className="px-3 font-semibold">Delete</p>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Modals */}
        {isNewMeetingModalOpen && (
          <NewMeetingModal
            isOpen={isNewMeetingModalOpen}
            closeModal={closeNewMeetingModal}
          />
        )}
        {isEditMeetingModalOpen && (
          <EditMeetingModal
            isOpen={isEditMeetingModalOpen}
            closeModal={closeEditMeetingModal}
            meeting={selectedMeeting}
            saveMeetingDetails={saveMeetingDetails}
          />
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

export default MeetingsPage;
