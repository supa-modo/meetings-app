import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewAttendeeModal = ({ attendee, onClose }) => {
  const meetings = [
    {
      title: "Annual Tech Conference",
      date: "2024-08-15",
      time: "10:00 AM - 12:00 PM",
    },
    {
      title: "Project Kickoff Meeting",
      date: "2024-09-01",
      time: "2:00 PM - 3:00 PM",
    },
    {
      title:
        "Quarterly Review Client Feedback Session Kickoff Meeting Annual Tech Conference",
      date: "2024-10-20",
      time: "11:00 AM - 1:00 PM",
    },
    {
      title: "Client Feedback Session",
      date: "2024-11-05",
      time: "9:00 AM - 10:30 AM",
    },
    {
      title: "Project Kickoff Meeting",
      date: "2024-09-01",
      time: "2:00 PM - 3:00 PM",
    },
    {
      title: "Quarterly Review",
      date: "2024-10-20",
      time: "11:00 AM - 1:00 PM",
    },
  ];

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
            {/* <p className="text-gray-500">
              <strong className="font-medium ">Name:</strong>
              <span className="pl-4 font-semibold text-blue-700 text-[15px]">
                {attendee.name}
              </span>
            </p> */}
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

        <div className="w-3/5 px-4 py-5">
          <h2 className="text-xl font-semibold text-green-700 underline mb-4">
            Meetings Attended
          </h2>
          <div className=" overflow-y-auto max-h-[90%] space-y-2 pr-2">
            {meetings?.map((meeting, index) => (
              <div
                key={index}
                className="bg-gray-200 px-4 py-[11px] rounded-lg shadow"
              >
                <p className="text-gray-800 pb-[5px] font-medium line-clamp-1 text-ellipsis">
                  {meeting.title}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-500 font-semibold text-sm ">
                    Date: {meeting.date} to {meeting.date}
                  </p>
                  <p className="text-gray-500 font-semibold text-sm">
                    Time: {meeting.time}
                  </p>
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
