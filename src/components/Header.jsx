import { formatDate } from "@fullcalendar/core/index.js";
import React, { useState } from "react";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
import axios from "../utils/axios";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setIsSearchOpen(false);
      setSearchResults([]);
      return;
    }

    // Simulate an API call to fetch results from both databases
    Promise.all([
      axios
        .get(`/attendees/searchAttendee`, { params: { search: query } })
        .then((res) => res.data),
      axios
        .get(`/meetings/searchMeetings`, { params: { search: query } })
        .then((res) => res.data),
    ])
      .then(([meetings, attendees]) => {
        const combinedResults = [
          ...meetings.map((meeting) => ({
            type: "Meeting",
            name: meeting.name,
            subtitle: `${meeting.type} - ${formatDate(
              meeting.startDate
            )} - ${formatDate(meeting.endDate)}`,
          })),
          ...attendees.map((attendee) => ({
            type: "Participant",
            name: attendee.name,
            subtitle: attendee.email,
          })),
        ];

        setSearchResults(combinedResults);
        setIsSearchOpen(true);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err.message);
      });
  };

  return (
    <header className="flex sticky justify-between items-center px-3 md:px-12 py-4 border-b border-gray-100 bg-white shadow-sm">
      {/* Logo / App Name */}
      <div className="flex items-center text-green-600 cursor-pointer w-1/3">
        <IoLogoIonitron size={35} className="mr-2 text-2xl" />{" "}
        <span className="md:text-2xl text-base text-gray-500 font-bold">
          Organization Name
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center bg-gray-200 border border-gray-300 md:text-base text-sm rounded-full px-4 py-[10px] md:py-2 w-[45%] md:w-2/5">
        <FaSearch
          className={`${
            searchQuery ? "text-blue-600" : "text-gray-600"
          } md:mx-4 transition-colors duration-200`}
        />

        <input
          type="text"
          placeholder="Search meetings or attendees directory"
          value={searchQuery}
          // onChange={handleSearchChange}
          className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
        />

        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
              setIsSearchOpen(false);
            }}
            className="absolute right-4 text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white shadow-lg rounded-md z-50 max-h-72 overflow-y-auto transition-all duration-300">
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {result.name}
                      </p>
                      <p className="text-sm text-gray-500">{result.subtitle}</p>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        result.type === "Meeting"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {result.type}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-gray-500">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-7 lg:pr-32">
        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-gray-600 hover:text-blue-600 text-xl cursor-pointer" />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div className="flex cursor-pointer text-gray-500 hover:text-blue-600">
            <FaUser className="text-xl" />
            <p className="font-semibold ml-3 md:block hidden">Logged In User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
