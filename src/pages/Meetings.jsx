import React, { useState, useEffect, useRef } from "react";
import MeetingCard from "../components/MeetingCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const MeetingsPage = () => {
  const meetings = [
    {
      id: 1,
      title: "Pre-Budget Review Committee",
      date: "2024-11-07",
      time: "10:00 AM",
      location: "Virtual",
      description:
        "A review meeting to discuss the budget plans for the upcoming fiscal year.",
      attended: 114,
    },
    {
      id: 2,
      title: "Monetary Union Project Meeting",
      date: "2024-11-07",
      time: "2:00 PM",
      location: "In-Person",
      description:
        "Meeting to discuss the progress of the Monetary Union project.",
      attended: 22,
    },
    {
      id: 3,
      title: "Client Meeting",
      date: "2024-11-10",
      time: "1:00 PM",
      location: "Hybrid",
      description:
        "Discuss client requirements and expectations for the new project.",
      attended: 14,
    },
    {
      id: 4,
      title: "Team Meeting",
      date: "2024-11-10",
      time: "3:00 PM",
      location: "Virtual",
      description:
        "Regular team sync-up meeting to discuss project status and deliverables.",
      attended: 19,
    },
    {
      id: 5,
      title: "Project Planning Meeting",
      date: "2024-11-14",
      time: "1:00 PM",
      location: "In-Person",
      description:
        "Initial project planning session for the new development project.",
      attended: 38,
    },
    {
      id: 6,
      title: "Monetary Union Project Meeting",
      date: "2024-11-07",
      time: "2:00 PM",
      location: "In-Person",
      description:
        "Meeting to discuss the progress of the Monetary Union project.",
      attended: 100,
    },
    {
      id: 7,
      title: "Client Meeting",
      date: "2024-11-10",
      time: "1:00 PM",
      location: "Hybrid",
      description:
        "Discuss client requirements and expectations ipsum for the new project.",
      attended: 54,
    },
    {
      id: 8,
      title: "Team Meeting",
      date: "2024-11-10",
      time: "3:00 PM",
      location: "Virtual",
      description:
        "Regular team sync-up meeting to discuss lorem project status and deliverables.",
      attended: 43,
    },
    {
      id: 9,
      title: "Project Planning Meeting",
      date: "2024-11-14",
      time: "1:00 PM",
      location: "In-Person",
      description:
        "Initial project planning session for the new lorem ipsum calipr navigate cry takenr terkin ashet french development project.",
      attended: 18,
    },
  ];

  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="md:container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Upcoming Meetings
        </h1>

        {/* Display meetings in a single row with horizontal scrolling */}
        <div className="relative mb-6">
          <div
            ref={scrollContainerRef}
            className="cards-overflow flex overflow-x-auto space-x-6 sm:space-x-4 md:space-x-6 lg:space-x-8 snap-x snap-mandatory"
          >
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onClick={() => navigate("/meetings2")}
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          All Meetings
        </h1>
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500">
            <tr className="text-white font-medium">
              <th className="p-4 text-left">#</th>
              <th className="p-3 text-left w-1/12">Title</th>{" "}
              {/* Set width for Title column */}
              <th className="p-3 text-left w-1/12">Description</th>{" "}
              {/* Set width for Description column */}
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Type</th>
              <th className="pr-3">Attended</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr
                key={meeting.id}
                className={`pl-3 py-3 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200`}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
              >
                <td className="p-3">{index + 1}.</td>
                <td className="p-3 font-semibold truncate">
                  {meeting.title}
                </td>{" "}
                {/* Truncate title */}
                <td className="p-3 truncate">{meeting.description}</td>{" "}
                {/* Truncate description */}
                <td className="p-3">{meeting.date}</td>
                <td className="p-3">{meeting.time}</td>
                <td className="p-3">{meeting.location}</td>
                <td className="p-3">
                  {meeting.location === "Virtual"
                    ? "Virtual"
                    : meeting.location === "In-Person"
                    ? "Physical"
                    : "Hybrid"}
                </td>
                <td className="p-2 font-semibold text-center">
                  {meeting.attended}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingsPage;
