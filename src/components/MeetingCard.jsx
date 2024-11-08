import React from "react";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

const MeetingCard = ({ meeting, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-md shadow-md transition hover:shadow-lg space-y-2"
    >
      <h3 className="text-lg font-semibold text-gray-700">{meeting.title}</h3>
      <div className="flex items-center text-gray-500 text-sm">
        <IoCalendarOutline className="mr-1" />
        <span>
          {meeting.date} at {meeting.time}
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <IoLocationOutline className="mr-1" />
        <span>{meeting.location}</span>
      </div>
      {/* Removed meeting.type reference */}
      <div className="text-gray-500 text-sm capitalize">
        Description: {meeting.description}
      </div>
      <button className="mt-3 w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
};

export default MeetingCard;
