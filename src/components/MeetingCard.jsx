import React from "react";
import { FaLocationPin } from "react-icons/fa6";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { formatDate, formatTime } from "../utils/dateTimeFunctions";
import { FcOvertime } from "react-icons/fc";

const MeetingCard = ({ meeting, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-md mb-6 shadow-md transition hover:shadow-lg space-y-2 w-[26rem] h-[15rem] flex-shrink-0 snap-center flex flex-col row-span-4"
    >
      <h3 className="text-lg font-bold text-gray-500 line-clamp-2 text-ellipsis">
        {meeting.title}
      </h3>
      <div className="flex items-center text-gray-500 text-sm font-semibold">
        <IoCalendarOutline size={18} className="mr-2" />
        <span>
          {formatDate(meeting.startDate)} to {formatDate(meeting.endDate)}
        </span>
      </div>
      <div className="flex">
        <div className="flex items-center w-full text-gray-500 text-sm font-semibold">
          <FcOvertime size={22} className="mr-2" />
          <span>
            {formatTime(meeting.startTime)} to {formatTime(meeting.endTime)}
          </span>
        </div>
        <div className="flex w-full items-center text-gray-500 text-sm font-semibold ">
          <MdLocationPin size={20} className="mr-2 text-red-600" />
          <span className="line-clamp-1">{meeting.location}</span>
        </div>
      </div>

      <div className="text-gray-500 text-sm capitalize flex-grow overflow-hidden">
        <p className="line-clamp-2 text-ellipsis font-semibold text-gray-600">
          Description:{" "}
          <span className="font-normal">{meeting.description}</span>
        </p>
      </div>
      <button className="mt-auto w-full py-2 text-white bg-green-600 font-semibold rounded-sm hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
};

export default MeetingCard;
