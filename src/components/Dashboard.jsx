import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // For clickable dates
import {
  FaCalendarAlt,
  FaPlus,
  FaUserFriends,
  FaChartPie,
  FaBell,
} from "react-icons/fa";

function DashboardContent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr); // Set the selected date
  };

  // Sample meetings data
  const meetings = {
    "2024-11-07": [
      { time: "10:00 AM", title: "Team Sync" },
      { time: "2:00 PM", title: "Project Review" },
    ],
    "2024-11-10": [{ time: "1:00 PM", title: "Client Meeting" }],
  };

  return (
    <main className="p-6 bg-gray-100 flex-1">
      <div className="md:container mx-auto px-4">
        {/* Calendar + Meeting Details and Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Calendar + Meeting Details Box */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row col-span-2">
            {/* Calendar View */}
            <div className="flex-2 md:w-[53%]">
              <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
                Calendar View
              </h2>
              <div className="border-t pt-4">
                {/* FullCalendar component */}
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  events={[]} // Add events if needed or fetch from API
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth",
                  }}
                  eventClick={(info) => {
                    console.log(info.event.title); // Handle event click
                  }}
                  height="340px" // Custom height for the calendar
                  className="w-full max-w-[100px]" // Restrict the width of the calendar
                />
              </div>
            </div>

            {/* Meeting Details View */}
            <div className="flex-1 md:w-[47%] p-4 overflow-auto">
              <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
                {selectedDate ? `Meetings on ${selectedDate}` : "Select a Date"}
              </h2>
              <div className="space-y-3">
                {selectedDate && meetings[selectedDate] ? (
                  meetings[selectedDate].map((meeting, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 rounded-md flex justify-between items-center"
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
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                <FaPlus className="mr-4" />
                Schedule New Meeting
              </button>

              <button className="w-full flex items-center px-4 py-3 font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                <FaUserFriends className="mr-4" /> Attendees Directory
              </button>
              <button className="w-full flex items-center px-4 py-3 font-semibold bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700">
                <FaPlus className="mr-4" /> Add New Attendee to Directory
              </button>
              <button className="w-full flex items-center px-4 py-3 font-semibold bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                <FaChartPie className="mr-4" /> Attendance Reports
              </button>
            </div>
          </div>
        </section>

        {/* Upcoming Meetings and Notifications */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Meetings */}
          <div className="bg-white p-4 rounded-lg shadow-lg col-span-2">
            <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
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
                    Monetary Union Project Review Meeting
                  </p>
                  <p className="text-sm text-gray-500">Thursday at 2:00 PM</p>
                </div>
                <span className="text-gray-400 text-sm">Hybrid</span>
              </li>
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
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
                  Upcoming meeting rescheduled to next Friday
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Analytics Summary */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-600 text-lg md:text-xl font-bold mb-3">
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
