import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Header from "../components/Header";
import NavBar from "../components/Navbar";

const MeetingManagement = () => {
  const { meetingId } = useParams(); // Get meetingId from URL params
  const [meeting, setMeeting] = useState(null);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Ensure the meeting exists before rendering
  if (!meeting) {
    return <div>Meeting not found!</div>;
  }

  const handleStartMeeting = () => {
    setIsMeetingStarted(true);
  };

  const handleAddAttendance = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 ">
        <Header />
        <NavBar />
      </div>
      <div className="bg-gray-50 md:container mx-auto p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          {meeting.title}
        </h1>
        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <p>
            <strong>Date:</strong> {meeting.date}
          </p>
          <p>
            <strong>Location:</strong> {meeting.location}
          </p>
          <p>
            <strong>Description:</strong> {meeting.description}
          </p>

          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
              onClick={handleStartMeeting}
            >
              Start Meeting
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
              Edit Meeting Details
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md">
              Add Attendees
            </button>
          </div>
        </div>

        {/* Attendance Modal */}
        {showModal && <AttendanceModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default MeetingManagement;
