import { React, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateTimeFunctions";

const ViewAttendeeModal = ({ attendee, onClose }) => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `/participation/getParticipationByAttendee/${attendee.id}`
        );
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [attendee.id]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition duration-300">
      <div className="bg-white rounded-lg pr-8 pl-0 shadow-lg relative px-10 lg:w-[50%] max-h-[50%] flex">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="w-2/5 px-3 pl-10 py-12 bg-amber-50">
          <div className="flex px-14 justify-center mb-4">
            <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex justify-center items-center text-2xl font-semibold">
              {attendee.name[0]}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-500 mb-4 line-clamp-2">
            {attendee.name}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-500">
              <strong className="font-medium ">Email:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {attendee.email}
              </span>
            </p>
            <p className="text-gray-500">
              <strong className="font-medium ">Phone:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {attendee.phone}
              </span>
            </p>
            <p className="text-gray-500 line-clamp-2">
              <strong className="font-medium ">Organization:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {attendee.organization}
              </span>
            </p>
            <p className="text-gray-500 line-clamp-2">
              <strong className="font-medium ">Title:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {attendee.title}
              </span>
            </p>
            <p className="text-gray-500">
              <strong className="font-medium ">Meetings Attended:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {23}
              </span>
            </p>
          </div>
        </div>

        <div className="w-3/5 pl-4 py-5">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Meetings Attended{" "}
            <span className="font-bold">({meetings?.length || 0})</span>
          </h2>
          <div className="overflow-y-auto max-h-[90%] space-y-3 pr-2">
            {meetings?.map((meeting, index) => (
              <div
                key={attendee.id}
                onClick={() =>
                  navigate(`/meetings/${meeting.id}/${meeting.startDate}`)
                }
                className="bg-gray-200 mx-2 px-4 py-[11px] border-l-4 border-blue-500 rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:-translate-x-1  cursor-pointer"
              >
                <p className="text-gray-800 pb-[5px] font-medium line-clamp-1 text-ellipsis">
                  {meeting.title}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-500 font-semibold text-sm">
                    {`${formatDate(meeting.startDate)} to ${formatDate(
                      meeting.endDate
                    )}`}
                  </p>
                  <div className="flex max-w-[50%] items-center text-gray-500 text-sm font-semibold truncate">
                    <MdLocationPin size={20} className="mr-2 text-red-600" />
                    <span className="line-clamp-1">{meeting.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendeeModal;
