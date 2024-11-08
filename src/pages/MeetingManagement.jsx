import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import AttendanceList from "../components/AttendanceList";
import AttendanceModal from "../components/AttendanceModal";
import OngoingMeetingPanel from "../components/OngoingMeetingPanel";
import Header from "../components/Header";

// Example meeting data (replace this with a fetch from an API or context)
const meetingsData = [
  {
    id: 1,
    title: "Pre-Budget Review Committee",
    date: "2024-11-07",
    time: "10:00 AM",
    location: "Virtual",
    description:
      "A review meeting to discuss the budget plans for the upcoming fiscal year.",
    attendees: ["John Doe", "Jane Smith"],
  },
  // Add other meetings here...
];

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

const MeetingManagement = () => {
  const { meetingId } = useParams(); // Get meetingId from URL params
  const [meeting, setMeeting] = useState(null);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Find the meeting based on the meetingId
  useEffect(() => {
    const foundMeeting = meetingsData.find((m) => m.id === parseInt(meetingId));
    setMeeting(foundMeeting);
  }, [meetingId]);

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
      <Header />
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
        <OngoingMeetingPanel />

        {isMeetingStarted && (
          <AttendanceList
            attendees={exampleAttendees}
            onAddAttendance={handleAddAttendance}
          />
        )}

        {/* Attendance Modal */}
        {showModal && <AttendanceModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default MeetingManagement;
