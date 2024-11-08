import React from "react";
import MeetingCard from "../components/MeetingCard";
import { useNavigate } from "react-router-dom";

const MeetingsPage = () => {
  // Example meetings data
  const meetings = [
    {
      id: 1,
      title: "Pre-Budget Review Committee",
      date: "2024-11-07",
      time: "10:00 AM",
      location: "Virtual",
      description:
        "A review meeting to discuss the budget plans for the upcoming fiscal year.",
    },
    {
      id: 2,
      title: "Monetary Union Project Meeting",
      date: "2024-11-07",
      time: "2:00 PM",
      location: "In-Person",
      description:
        "Meeting to discuss the progress of the Monetary Union project.",
    },
    {
      id: 3,
      title: "Client Meeting",
      date: "2024-11-10",
      time: "1:00 PM",
      location: "Hybrid",
      description:
        "Discuss client requirements and expectations for the new project.",
    },
    {
      id: 4,
      title: "Team Meeting",
      date: "2024-11-10",
      time: "3:00 PM",
      location: "Virtual",
      description:
        "Regular team sync-up meeting to discuss project status and deliverables.",
    },
    {
      id: 5,
      title: "Project Planning Meeting",
      date: "2024-11-14",
      time: "1:00 PM",
      location: "In-Person",
      description:
        "Initial project planning session for the new development project.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Upcoming Meetings
      </h1>

      {/* Display meetings in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onClick={() => navigate(`/meetings/${meeting.id}`)} // Navigate to meeting details
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingsPage;
