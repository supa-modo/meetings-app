// OngoingMeetingPanel.js

import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const OngoingMeetingPanel = ({
  meeting,
  addAttendeeSignature,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [signaturePad, setSignaturePad] = useState(null);

  // Dummy attendee directory - replace with actual data fetch
  const attendeeDirectory = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Catherine Lee" },
    // Additional attendees
  ];

  // Filter attendees based on search term
  const filteredAttendees = attendeeDirectory.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle attendee selection
  const handleSelectAttendee = (attendee) => {
    setSelectedAttendee(attendee);
  };

  // Save signature for selected attendee
  const handleSaveSignature = () => {
    if (signaturePad.isEmpty()) return alert("Please provide a signature.");

    // Get signature data URL
    const signatureData = signaturePad.toDataURL();

    // Callback to save signature
    addAttendeeSignature(selectedAttendee, signatureData);

    // Clear for next attendee
    signaturePad.clear();
    setSelectedAttendee(null);
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Ongoing Meeting: "Example meeting"
      </h2>

      <div className="mt-4">
        {/* Physical Attendees Section */}
        <h3 className="text-lg font-semibold text-gray-600">
          Physical Attendees
        </h3>
        {!selectedAttendee ? (
          <>
            <input
              type="text"
              placeholder="Search or enter your name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full mt-2"
            />
            <ul className="mt-2 space-y-2">
              {filteredAttendees.map((attendee) => (
                <li
                  key={attendee.id}
                  onClick={() => handleSelectAttendee(attendee)}
                  className="cursor-pointer text-gray-700 p-2 bg-white rounded-md shadow-sm hover:bg-gray-100"
                >
                  {attendee.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-gray-700 mt-2">
              Selected Attendee: {selectedAttendee.name}
            </p>

            {/* Signature Canvas */}
            <SignatureCanvas
              penColor="black"
              ref={(ref) => setSignaturePad(ref)}
              canvasProps={{
                width: 500,
                height: 200,
                className: "border border-gray-300 rounded-md mt-2",
              }}
            />
            <button
              onClick={handleSaveSignature}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
            >
              Confirm Attendance
            </button>
          </>
        )}
      </div>

     
    </div>
  );
};

export default OngoingMeetingPanel;
