import React, { useState, useEffect, useRef } from "react";
import MeetingCard from "../components/MeetingCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import NewMeetingModal from "../components/NewMeetingModal";

const MeetingsPage = () => {
  const meetings = [
    {
      id: 16701020,
      title: "Pre-Budget Review Committee",
      date: "2024-11-07",
      time: "10:00 AM",
      location: "Virtual",
      description:
        "A review meeting to discuss the budget plans for the upcoming fiscal year.",
      attended: 114,
    },
    {
      id: 13291020,
      title: "Monetary Union Project Meeting",
      date: "2024-11-07",
      time: "2:00 PM",
      location: "In-Person",
      description:
        "Meeting to discuss the progress of the Monetary Union project.",
    },
    {
      id: 31241020,
      title: "Client Meeting",
      date: "2024-11-10",
      time: "1:00 PM",
      location: "Hybrid",
      description:
        "Discuss client requirements and expectations for the new project.",
    },
    {
      id: 24301020,
      title: "Team Meeting",
      date: "2024-11-10",
      time: "3:00 PM",
      location: "Virtual",
      description:
        "Regular team sync-up meeting to discuss project status and deliverables.",
      attended: 19,
    },
    {
      id: 32101024,
      title: "Project Planning Meeting",
      date: "2024-11-14",
      time: "1:00 PM",
      location: "In-Person",
      description:
        "Initial project planning session for the new development project.",
      attended: 38,
    },
    {
      id: 22431022,
      title: "Monetary Union Project Planning Client Example Long Text Meeting",
      date: "2024-11-07",
      time: "2:00 PM",
      location: "In-Person",
      description:
        "Meeting to discuss the progress of the Monetary Union project.",
      attended: 100,
    },
    {
      id: 12211021,
      title: "Client Meeting",
      date: "2024-11-10",
      time: "1:00 PM",
      location: "Hybrid",
      description:
        "Discuss client requirements and expectations ipsum for the new project.",
      attended: 54,
    },
    {
      id: 22301020,
      title: "Team Meeting",
      date: "2024-11-10",
      time: "3:00 PM",
      location: "Virtual",
      description:
        "Regular team sync-up meeting to discuss lorem project status and deliverables.",
      attended: 43,
    },
    {
      id: 2431020,
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = meetings.filter((meeting) =>
        meeting.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
  };

  // Function to open the add meeting modal
  const handleOpenNewMeetingModal = () => {
    setIsNewMeetingOpen(true);
  };

  // Function to close the new meeting modal
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

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <Header />
      </div>
      <div className="md:container mx-auto px-10 py-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-amber-700 mb-4">
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-amber-700 ">All Meetings</h1>
          <div className="flex space-x-8 w-2/3">
            <button
              onClick={handleOpenNewMeetingModal}
              className="bg-blue-500 text-center text-white pl-8 pr-12 py-2 font-semibold rounded-sm hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-3" /> Add New Meeting
            </button>
            <div className="flex items-center bg-gray-200 border border-gray-300 md:text-base text-sm rounded-md w-2/3 px-4 md:py-[7px] shadow-sm ">
              <FaSearch className="text-gray-600 md:mx-4" />
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

        {/* New Meeting Modal */}
        {isNewMeetingOpen && (
          <NewMeetingModal onClose={handleCloseNewMeetingModal} />
        )}

        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500">
            <tr className="text-white font-medium">
              <th className="p-4 text-left">Meeting ID</th>
              <th className="pr-3 py-3 text-left">Meeting Title</th>
              <th className="pr-3 py-3 text-left">Meeting Date</th>
              <th className="pr-3 py-3 text-left">Time</th>
              <th className="pr-3 py-3 text-left">Location</th>
              <th className="pr-3 py-3 text-left">Type</th>
              <th className="pr-3">Attended</th>
            </tr>
          </thead>
          <tbody>
            {(filteredResults.length ? filteredResults : meetings).map(
              (meeting, index) => (
                <tr
                  key={meeting.id}
                  className={`pl-3 py-3 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                  } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-600`}
                  onClick={() => navigate(`/meetings/${meeting.id}`)}
                >
                  <td className="p-3">{meeting.id}</td>
                  <td className="pr-2 py-3 text-gray-700 text-ellipsis">
                    {meeting.title}
                  </td>
                  <td className="pr-2 py-3">
                    <span className="text-green-600">{meeting.date}</span> -{" "}
                    <span className="text-red-500">{meeting.date}</span>
                  </td>
                  <td>
                    <span className="text-gray-600">{meeting.time}</span> -{" "}
                    <span className="text-gray-600">{meeting.time}</span>
                  </td>

                  <td className="pr-2 py-3">{meeting.location}</td>
                  <td className="pr-2 py-3">
                    {meeting.location === "Virtual"
                      ? "Virtual"
                      : meeting.location === "In-Person"
                      ? "Physical"
                      : "Hybrid"}
                  </td>
                  <td className="pr-2 py-3 font-semibold text-center">
                    {meeting.attended || "--"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingsPage;
