// AttendanceList.js

import React from "react";

const exampleAttendees = [
  {
    name: "Alice Johnson",
    signature: "https://example.com/signatures/alice.png", // Replace with an actual image URL
  },
  {
    name: "Bob Smith",
    signature: "https://example.com/signatures/bob.png", // Replace with an actual image URL
  },
  {
    name: "Carlos Rivera",
    signature: "https://example.com/signatures/carlos.png", // Replace with an actual image URL
  },
  {
    name: "Diana Chen",
    signature: "https://example.com/signatures/diana.png", // Replace with an actual image URL
  },
];

const AttendanceList = ({ attendees, onAddAttendance }) => (
  <div className="mt-6 bg-white p-4 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
      Attendance List
    </h2>
    <ul className="space-y-2">
      {attendees.map((attendee, index) => (
        <li
          key={index}
          className="flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm"
        >
          <span className="text-gray-700">{attendee.name}</span>
          <img src={attendee.signature} alt="Signature" className="h-8 w-20" />
        </li>
      ))}
    </ul>
    <button
      onClick={onAddAttendance}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md w-full"
    >
      Mark New Attendance
    </button>
  </div>
);

export default AttendanceList;
