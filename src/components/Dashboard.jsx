import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  FaCalendarAlt,
  FaPlus,
  FaUserFriends,
  FaChartPie,
  FaBell,
} from "react-icons/fa";
import "../assets/DashboardContent.css";
import { MdOutlineClearAll } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewMeetingModal from "./AddMeetingModal";
import AddAttendeeModal from "./AddAttendeeModal";
import axios from "../utils/axios";
import { formatDate, formatTime } from "../utils/dateTimeFunctions";

function DashboardContent() {
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [sortedMeetings, setSortedMeetings] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const navigate = useNavigate();

  // Open new meeting modal
  const handleOpenNewMeetingModal = () => {
    setIsNewMeetingOpen(true);
  };

  // Close new meeting modal
  const handleCloseNewMeetingModal = () => {
    setIsNewMeetingOpen(false);
  };

  const handleAllMeetingsClick = () => {
    navigate("/meetings");
  };

  const handleDirectoryClick = () => {
    navigate("/directory");
  };

  const handleReportsClick = () => {
    navigate("/reports");
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
  };

  const handleAddAttendee = (newAttendee) => {
    setShowAddModal(false);
  };

  useEffect(() => {
    // Fetch meetings from the backend
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("/meetings/getAllMeetings");
        const meetingsData = response.data;
        const sortedMeetings = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setSortedMeetings(sortedMeetings);
        // Process meetings into calendar events
        const events = meetingsData.map((meeting) => ({
          title: meeting.title,
          start: meeting.startDate, // Ensure startDate is in ISO format
          id: meeting.id,
        }));

        setMeetings(meetingsData || []);
        setCalendarEvents(events);

        // Default to today's date
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    fetchAttendees();
  });

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("/attendees/getAllAttendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      setModalNotificationMessage(
        "Error fetching attendees, check your internet connection:",
        error
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");
    }
  };

  return (
    <main className="px-6 pt-3 pb-6 bg-gray-100 min-h-screen flex-1">
      <div className="md:container mx-auto px-4">
        <h1 className="md:text-2xl text-lg font-bold text-gray-600 pb-2 ">
          Meetings Scheduler and Management
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Calendar + Meeting Details */}
          <div className="bg-gray-200 px-6 py-4 rounded-md shadow-lg col-span-2 flex flex-col md:flex-row overflow-hidden max-h-[600px] md:h-[460px]">
            {/* Calendar */}
            <div className="md:w-[45%] flex-shrink-0">
              <h2 className="text-amber-700 text-xl font-bold mb-4">
                Meetings Calendar
              </h2>
              <div className="calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  events={calendarEvents}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                  }}
                  buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                  }}
                  eventContent={(eventInfo) => {
                    // Custom dots for events
                    const eventsOnDay = calendarEvents.filter(
                      (e) =>
                        e.start.split("T")[0] ===
                        eventInfo.event.startStr.split("T")[0]
                    );

                    return (
                      <div
                        style={{ textAlign: "center", position: "relative" }}
                      >
                        {Array(eventsOnDay.length)
                          .fill(null)
                          .map((_, index) => (
                            <span
                              key={index}
                              style={{
                                display: "inline-block",
                                width: "3px",
                                height: "3px",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                margin: "1px",
                              }}
                            ></span>
                          ))}
                      </div>
                    );
                  }}
                  dayCellContent={(dayCellInfo) => (
                    // Ensure date numbers are visible
                    <div>
                      <span>{dayCellInfo.dayNumberText}</span>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Meeting Details */}
            <div className="md:w-full py-4 pl-6 pr-3 overflow-y-auto">
              <h2 className="text-amber-600 text-lg font-semibold mt-5 mb-2">
                {selectedDate ? `Meetings on ${selectedDate}` : "Select a Date"}
              </h2>
              {selectedDate &&
              meetings.filter((m) => m.startDate.startsWith(selectedDate))
                .length > 0 ? (
                meetings
                  .filter((m) => m.startDate.startsWith(selectedDate))
                  .map((meeting) => (
                    <div
                      key={meeting.id}
                      onClick={() =>
                        navigate(`/meetings/${meeting.id}/${meeting.startDate}`)
                      }
                      className="meeting-card transition-transform duration-200 ease-in-out hover:-translate-x-1 cursor-pointer px-3 py-[6px] items-center mb-3"
                    >
                      <div>
                        <p className="text-gray-600 font-semibold line-clamp-1">
                          {meeting.title}
                        </p>
                        <div className="flex justify-between pt-3">
                          <p className="text-gray-400 text-sm font-medium">
                            {formatTime(meeting.startTime)} -{" "}
                            {formatTime(meeting.endTime)}
                          </p>
                          <span className="text-gray-400 font-semibold text-sm">
                            {meeting.location || "Virtual"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">
                  No meetings scheduled for this date.
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-md shadow-lg max-h-[550px] overflow-y-auto">
            <h2 className="text-amber-700 text-xl font-bold mb-3">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleOpenNewMeetingModal}
                className="quick-action-button w-full flex items-center bg-green-500 hover:bg-green-600 transition"
              >
                <FaPlus className="mr-3" />
                Schedule New Meeting
              </button>
              <button
                onClick={handleAllMeetingsClick}
                className="quick-action-button w-full flex items-center bg-gray-500 hover:bg-gray-400 transition"
              >
                <MdOutlineClearAll size={25} className="mr-3" />
                All Meetings Overview
              </button>
              <button
                onClick={handleDirectoryClick}
                className="quick-action-button w-full flex items-center bg-blue-500 hover:bg-blue-600 transition"
              >
                <FaUserFriends className="mr-3" />
                Attendees Directory
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="quick-action-button w-full flex items-center px-4 py-4 font-semibold bg-amber-600 text-white rounded-md shadow-md hover:bg-amber-700 transition"
              >
                <FaPlus className="mr-3" />
                Add New Attendee to Directory
              </button>
              <button
                onClick={handleReportsClick}
                className="quick-action-button w-full flex items-center bg-purple-500 hover:bg-purple-600 transition"
              >
                <FaChartPie className="mr-3" />
                Meeting Reports
              </button>
            </div>
          </div>
        </section>

        {showAddModal && (
          <AddAttendeeModal
            onAddAttendee={handleAddAttendee}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {/* New Meeting Modal */}
        {isNewMeetingOpen && (
          <NewMeetingModal
            isOpen={isNewMeetingOpen}
            closeModal={handleCloseNewMeetingModal}
          />
        )}

        {/* Upcoming Meetings and Notifications */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Meetings */}
          <div className="bg-white p-4 rounded-md shadow-lg col-span-2 overflow-y-auto max-h-[300px]">
            <h2 className="text-gray-700 text-lg font-bold mb-3">
              Upcoming Meetings
            </h2>
            <ul className="space-y-3">
              {meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 font-semibold rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg text-amber-800 font-semibold line-clamp-1">
                        {meeting.title}
                      </p>
                      <p className=" text-gray-500">
                        {formatDate(meeting.startDate)} -{" "}
                        {formatDate(meeting.endDate)}
                      </p>
                    </div>
                    <div className="flex-col">
                      <p className="text-gray-400  text-end">
                        {meeting.type === "physical"
                          ? "Physical Meeting"
                          : meeting.type === "virtual"
                          ? "Virtual Meeting"
                          : meeting.type === "hybrid"
                          ? "Hybrid Meeting"
                          : "Unknown Meeting Type"}
                      </p>
                      <p className="text-gray-400 ">{meeting.location}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No upcoming meetings
                </p>
              )}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white p-4 rounded-md shadow-lg overflow-y-auto max-h-[300px]">
            <h2 className="text-green-600 text-lg font-bold mb-3">
              Notifications
            </h2>
            <ul className="space-y-3">
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex items-center">
                <FaBell className="text-yellow-500 mr-3" />
                <p className="text-gray-600">
                  Meeting reminder: Project kickoff tomorrow at 9 AM
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Analytics Summary */}
        <section className="bg-white p-4 rounded-md shadow-lg overflow-hidden">
          <h2 className="text-blue-600 text-lg font-bold mb-3">
            Analytics Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-100 rounded-md flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-semibold">Total Meetings</p>
                <p className="text-2xl font-bold">{meetings.length}</p>
              </div>
            </div>
            <div className="p-4 bg-blue-100 rounded-md flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-semibold">Attendance Rate</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
            <div className="p-4 bg-purple-100 rounded-md flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-semibold">Total Attendees</p>
                <p className="text-2xl font-bold">{attendees.length}</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-md flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-semibold">Hybrid Meetings</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardContent;
