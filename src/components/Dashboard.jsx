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
import meetingsData from "../data/meetings.json";
import AddAttendeeModal from "./AddAttendeeModal";

function DashboardContent() {
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState({});

  // Function to open the modal
  const handleOpenNewMeetingModal = () => {
    setIsNewMeetingOpen(true);
  };

  // Function to close the modal
  const handleCloseNewMeetingModal = () => {
    setIsNewMeetingOpen(false);
  };

  // Function to handle adding a new meeting
  const handleAddMeeting = (newMeeting) => {
    console.log("New meeting added:", newMeeting);
    // Here you can send the new meeting data to your server or state manager
    // After adding the meeting, close the modal
    handleCloseNewMeetingModal();
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
    // setAttendees([...attendees, newAttendee]);
    setShowAddModal(false);
  };

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    setMeetings(meetingsData); // Set the meetings data from JSON
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

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
              <div
                className={`calendar-container ${
                  showAddModal || isNewMeetingOpen ? "blur-background" : ""
                }`}
              >
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  events={[]}
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
                  // className="custom-calendar"
                  dayCellClassNames={(date) =>
                    date.dateStr === selectedDate ? "highlighted-date" : ""
                  }
                />
              </div>
            </div>

            {/* Meeting Details */}
            <div className="md:w-full py-4 pl-6 pr-3 overflow-y-auto">
              <h2 className="text-amber-600 text-lg font-semibold mt-5 mb-2">
                {selectedDate ? `Meetings on ${selectedDate}` : "Select a Date"}
              </h2>
              {selectedDate && meetings[selectedDate] ? (
                meetings[selectedDate].map((meeting, index) => (
                  <div
                    key={index}
                    className="meeting-card px-3 py-[6px] flex justify-between items-center mb-3"
                  >
                    <div>
                      <p className="text-gray-600 font-semibold">
                        {meeting.title}
                      </p>
                      <p className="text-gray-400 text-sm font-medium">
                        {meeting.time}
                      </p>
                    </div>
                    <span className="text-gray-400 font-semibold text-sm">
                      Virtual
                    </span>
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
          <NewMeetingModal onClose={handleCloseNewMeetingModal} />
        )}

        {/* Upcoming Meetings and Notifications */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Meetings */}
          <div className="bg-white p-4 rounded-md shadow-lg col-span-2 overflow-y-auto max-h-[300px]">
            <h2 className="text-blue-600 text-lg font-bold mb-3">
              Upcoming Meetings
            </h2>
            <ul className="space-y-3">
              <li className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Pre-Budget Committee Meeting
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-gray-400 text-sm">Virtual</span>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Pre-Budget Committee Meeting
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-gray-400 text-sm">Virtual</span>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Pre-Budget Committee Meeting
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-gray-400 text-sm">Virtual</span>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Pre-Budget Committee Meeting
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-gray-400 text-sm">Virtual</span>
              </li>
              <li className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Pre-Budget Committee Meeting
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-gray-400 text-sm">Virtual</span>
              </li>
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
                <p className="text-2xl font-bold">52</p>
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
                <p className="text-2xl font-bold">430</p>
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
