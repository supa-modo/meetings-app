import React from "react";
import { FaLocationPin } from "react-icons/fa6";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";

const MeetingCard = ({ meeting, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-md mb-6 shadow-md transition hover:shadow-lg space-y-2 w-[26rem] h-[15rem] flex-shrink-0 snap-center flex flex-col row-span-4"
    >
      <h3 className="text-lg font-semibold text-gray-700">{meeting.title}</h3>
      <div className="flex items-center text-gray-500 text-sm font-semibold">
        <IoCalendarOutline size={18} className="mr-2" />
        <span>
          {meeting.date} at {meeting.time}
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm font-semibold">
        <MdLocationPin size={19} className="mr-2 text-red-600" />
        <span>{meeting.location}</span>
      </div>
      <div className="text-gray-500 text-sm capitalize flex-grow overflow-hidden">
        <p className="line-clamp-4 font-semibold text-gray-600">
          Description: <span className="font-normal">{meeting.description}</span>
        </p>
      </div>
      <button className="mt-auto w-full py-2 text-white bg-green-600 font-semibold rounded-sm hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
};

export default MeetingCard;
