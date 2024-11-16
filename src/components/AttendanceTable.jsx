import { React, useState } from "react";
import axios from "../utils/axios";

const AttendanceTable = ({ meetingDays, attendees }) => {
  const [showAllDays, setShowAllDays] = useState(false);
  const backend_Url = "http://localhost:3500";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-500">
          <tr className="text-white">
            <th className="p-4 text-left">#</th>
            <th className="px-3 py-4 text-left hidden">ID</th>
            <th className="px-3 py-4 text-left">Participant Name</th>
            <th className="px-3 py-4 text-left">Email</th>
            <th className="px-3 py-4 text-left">Phone</th>
            <th className="px-3 py-4 text-left">Organization</th>

            {/* Display only the first 5 days in the table */}
            {meetingDays.slice(0, 5).map((day, index) => (
              <th key={index} className="px-3 py-4 text-left">
                Day {index + 1}
              </th>
            ))}

            {/* Display "More" button if there are more than 5 days */}
            {meetingDays.length > 5 && (
              <th className="px-3 py-4 text-left">
                <button
                  onClick={() => setShowAllDays(true)}
                  className="text-amber-200 underline"
                >
                  + More
                </button>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-orange-50" : "bg-amber-10"
              } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-500`}
            >
              <td className="p-3">{index + 1}.</td>
              <td className="p-3 text-gray-700 hidden">
                {attendee.Attendee ? attendee.Attendee.id : "N/A"}
              </td>
              <td className="p-3 text-gray-700 max-w-[200px] truncate">
                {attendee.Attendee ? attendee.Attendee.name : "N/A"}
              </td>
              <td className="p-3 max-w-[200px] truncate">
                {attendee.Attendee ? attendee.Attendee.email : "N/A"}
              </td>
              <td className="p-3">
                {attendee.Attendee ? attendee.Attendee.phone : "N/A"}
              </td>
              <td className="p-3 max-w-[250px] truncate">
                {attendee.Attendee ? attendee.Attendee.organization : "N/A"}
              </td>

              {/* Display signatures for the first 5 days */}
              {meetingDays.slice(0, 6).map((day, dayIndex) => (
                <td key={dayIndex} className="p-3 text-center">
                  {attendee.signature ? (
                    <img
                      src={`${backend_Url}${attendee.signature}`}
                      alt={`${day}`}
                      className="h-8 max-w-[100px] mx-auto line-clamp-1 truncate"
                    />
                  ) : (
                    "Not Signed"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display all days with signatures */}
      {showAllDays && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center z-50 transition duration-300">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-[80%] overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setShowAllDays(false)}
              className="float-right font-bold text-red-500"
            >
              Close
            </button>
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              All Meeting Days
            </h3>

            <table className="min-w-full bg-white">
              <thead className="bg-gray-500">
                <tr className="text-white">
                  <th className="px-3 py-4 text-left">#</th>
                  <th className="px-3 py-4 text-left">Participant Name</th>
                  {/* Render all days in modal */}
                  {meetingDays.map((_, dayIndex) => (
                    <th key={dayIndex} className="px-3 py-4 text-left">
                      Day {dayIndex + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-amber-50"
                    } cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-200 font-semibold text-gray-500`}
                  >
                    <td className="p-3">{index + 1}.</td>
                    <td className="p-3">
                      {attendee.Attendee ? attendee.Attendee.name : "N/A"}
                    </td>

                    {meetingDays.map((_, dayIndex) => (
                      <td key={dayIndex} className="p-3 text-center">
                        {attendee.signature ? (
                          <img
                            src={`${backend_Url}${attendee.signature}`}
                            alt={`signature`}
                            className="h-8 max-w-[100px] mx-auto line-clamp-1 truncate"
                          />
                        ) : (
                          "Not Signed"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
