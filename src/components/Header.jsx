import React, { useState } from "react";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { IoLogoIonitron } from "react-icons/io5";
function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  return (
    <header className="flex sticky justify-between items-center px-3 md:px-12 py-4 border-b bg-white shadow-sm">
      {/* Logo / App Name */}
      <div className="flex items-center text-green-600 cursor-pointer w-1/3">
        <IoLogoIonitron size={35} className="mr-2 text-2xl" />{" "}
        <span className="md:text-2xl text-base text-gray-500 font-bold">
          Organization Name
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-200 border border-gray-300 md:text-base text-sm rounded-full px-4 py-[10px] md:py-2 w-[45%] md:w-2/5">
        <FaSearch className="text-gray-600 md:mx-4" />
        <input
          type="text"
          placeholder="Search meetings or attendees directory"
          className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
        />
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-7 lg:pr-32">
        {/* Notifications */}
        <div className="relative">
          <FaBell
            className="text-gray-600 hover:text-blue-600 text-xl cursor-pointer"
            onClick={toggleNotification}
          />
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 text-sm">
              <p className="text-gray-700 font-semibold">Notifications</p>
              <ul className="mt-2 space-y-2">
                <li className="text-gray-600">
                  Meeting reminder: Tomorrow 10 AM
                </li>
                <li className="text-gray-600">New attendee added</li>
                <li className="text-gray-600">Upcoming meeting rescheduled</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative  ">
          <div
            onClick={toggleProfile}
            className="flex cursor-pointer text-gray-500 hover:text-blue-600"
          >
            <FaUser className="  text-xl " />
            <p className="font-semibold ml-3 md:block hidden">Logged In User</p>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-100 rounded-sm shadow-lg text-sm">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-green-300 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-green-300 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-red-400 hover:text-white cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
