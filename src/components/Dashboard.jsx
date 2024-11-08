import React, { useState } from "react";
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
import "./DashboardContent.css";
import { MdOutlineClearAll } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewMeetingModal from "./NewMeetingModal";

function DashboardContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleAllMeetingsClick = () => {
    navigate("/meetings");
  };
  const handleDirectoryClick = () => {
    navigate("/directory");
  };

  const handleNewMeeting = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
  };

  const meetings = {
    "2024-11-07": [
      { time: "10:00 AM", title: "Pre-Budget Review Committee" },
      { time: "2:00 PM", title: "Monetary Union Project Meeting" },
    ],
    "2024-11-10": [
      { time: "1:00 PM", title: "Client Meeting" },
      { time: "2:00 PM", title: "Project Planning Meeting" },
    ],
  };

  return (
    <main className="px-6 pt-3 pb-6 bg-gray-100 min-h-screen flex-1">
      <div className="md:container mx-auto px-4">
        <h1 className="md:text-2xl text-lg font-semibold text-gray-600 pb-2 ">
          Meetings Scheduler and Management
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Calendar + Meeting Details */}
          <div className="bg-gray-200 px-6 py-4 rounded-md shadow-lg col-span-2 flex flex-col md:flex-row overflow-hidden max-h-[600px] md:max-h-[480px]">
            {/* Calendar */}
            <div className="md:w-[50%] flex-shrink-0">
              <h2 className="text-amber-900 text-lg font-bold mb-3">
                Calendar View
              </h2>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={[]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth",
                }}
                className="custom-calendar"
                dayCellClassNames={(date) =>
                  date.dateStr === selectedDate ? "highlighted-date" : ""
                }
              />
            </div>

            {/* Meeting Details */}
            <div className="md:w-1/2 py-4 pl-6 pr-3 overflow-y-auto">
              <h2 className="text-green-600 text-lg font-bold mb-3">
                {selectedDate ? `Meetings on ${selectedDate}` : "Select a Date"}
              </h2>
              {selectedDate && meetings[selectedDate] ? (
                meetings[selectedDate].map((meeting, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-md flex justify-between items-center mb-2"
                  >
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {meeting.title}
                      </p>
                      <p className="text-sm text-gray-500">{meeting.time}</p>
                    </div>
                    <span className="text-gray-400 text-sm">Virtual</span>
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
            <h2 className="text-amber-900 text-lg font-bold mb-3">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleNewMeeting}
                className="w-full flex items-center px-4 py-4 font-semibold bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
              >
                <FaPlus className="mr-3" />
                Schedule New Meeting
              </button>
              <button
                onClick={handleAllMeetingsClick}
                className="w-full flex items-center px-4 py-4 font-semibold bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-400 transition"
              >
                <MdOutlineClearAll size={25} className="mr-3" />
                All Meetings Overview
              </button>
              <button onClick={handleDirectoryClick} className="w-full flex items-center px-4 py-4 font-semibold bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                <FaUserFriends className="mr-3" />
                Attendees Directory
              </button>
              <button className="w-full flex items-center px-4 py-4 font-semibold bg-amber-600 text-white rounded-md shadow-md hover:bg-amber-700 transition">
                <FaPlus className="mr-3" />
                Add New Attendee to Directory
              </button>
              <button className="w-full flex items-center px-4 py-4 font-semibold bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition">
                <FaChartPie className="mr-3" />
                Attendance Reports
              </button>
            </div>
          </div>
        </section>

        {/* New Meeting Modal */}
        {isOpen && (
          <NewMeetingModal onClose={handleCloseModal} />
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
