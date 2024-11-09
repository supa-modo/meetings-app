import React from "react";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

const MeetingCard = ({ meeting, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-md mb-6 shadow-md transition hover:shadow-lg space-y-2 w-[20rem] h-[15rem] flex-shrink-0 snap-center flex flex-col row-span-4"
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
      <div className="text-gray-500 text-sm capitalize flex-grow overflow-hidden">
        <p className="line-clamp-4">Description: {meeting.description}</p>
      </div>
      <button className="mt-auto w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
};

export default MeetingCard;
