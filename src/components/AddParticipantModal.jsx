import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import SignaturePad from "react-signature-canvas";
import axios from "../utils/axios";
import NotificationModal from "./NotificationModal";
import { base64ToBlob } from "../utils/dateTimeFunctions";

const AddParticipantModal = ({
  meetingId,
  meetingStartDate,
  showAddModal,
  setShowAddModal,
  onSuccess,
}) => {
  if (!showAddModal) return null; // Only render if modal is visible

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const [modalNotificationMessage, setModalNotificationMessage] = useState(""); // For error/success messages
  const [modalNotificationType, setModalNotificationType] = useState(""); // "success" or "error"
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [signatureDataURL, setSignatureDataURL] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    title: "",
    meetingRole: "participant",
    signature: null,
  });

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("/attendees/getAllAttendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      setModalNotificationMessage(
        "Error fetching attendees, check your internet connection:",
        error
      );
      setShowNotificationModal(true);
      setModalNotificationType("error");
    }
  };

  //function to clear the search field
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
    setSelectedResult(null);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setSignatureDataURL();
  };

  // function to handle searching in the new participant modal
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = attendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(query.toLowerCase()) ||
          attendee.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  //finction to click on one of the results from the search list
  const handleResultClick = (attendee) => {
    setFormData({
      ...formData,
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone,
      organization: attendee.organization,
      title: attendee.title,
    });
    setSelectedResult(attendee);
    setSearchQuery("");
    setFilteredResults([]);
  };

  // Handle drawing signature
  const [sigPad, setSigPad] = useState({});
  const handleClearSignature = () => sigPad.clear();

  const handleSaveSignature = async () => {
    if (!sigPad.isEmpty()) {
      const signatureURL = sigPad.getTrimmedCanvas().toDataURL("image/png");
      console.log("Signature saved:", signatureURL);

      // Convert the Base64 URL to a Blob
      const blob = base64ToBlob(signatureURL, "image/png");
      console.log(blob);

      // Update formData with the Blob
      setFormData((prevData) => ({
        ...prevData,
        signature: blob, // Store the Blob directly in formData.signature
      }));

      setSignatureDataURL(signatureURL); // Save for participantData if needed
    } else {
      console.log("Signature pad is empty");
    }
  };

  const handleAddParticipant = async () => {
    // // Ensure the signature is provided
    // if (!formData.signature) {
    //   alert("Please add your signature to record attendance.");
    //   // setShowNotificationModal(true);
    //   // setModalNotificationType("error");
    //   return;
    // }

    const participantData = new FormData(); // Use FormData to include the Blob
    participantData.append("name", formData.name);
    participantData.append("email", formData.email);
    participantData.append("phone", formData.phone);
    participantData.append("organization", formData.organization);
    participantData.append("title", formData.title);
    participantData.append("attendeeName", formData.name); // Needed for file naming
    participantData.append("meetingId", meetingId); // Make sure meetingId is passed correctly
    participantData.append("meetingDate", meetingStartDate); // Format this correctly
    participantData.append("meetingRole", formData.meetingRole);
    participantData.append(
      "signature",
      formData.signature,
      `${formData.name}_${Date.now()}`
    ); // Signature Blob

    try {
      let attendeeId;

      // Check if the attendee already exists
      const checkResponse = await axios.get("/attendees/checkAttendee", {
        params: {
          name: formData.name,
          email: formData.email,
        },
      });

      if (checkResponse.data.exists) {
        attendeeId = checkResponse.data.attendeeId;
        console.log("Existing Attendee ID:", attendeeId);

        const checkParticipant = await axios.get(
          `/participation/checkParticipant`,

          {
            params: {
              attendeeId,
              meetingId,
            },
          }
        );

        if (checkParticipant.data.exists) {
          setModalNotificationMessage(
            "This participant is already in the attendance list. Find the name from the attendance list on the table to add your signature"
          );
          setModalNotificationType("error");
          setShowNotificationModal(true);
          return;
        }
      } else {
        // Add attendee
        const addAttendeeResponse = await axios.post(
          "/attendees/createAttendee",
          participantData
        );
        attendeeId = addAttendeeResponse.data.attendeeId;
        console.log("New Attendee ID:", attendeeId);
      }

      participantData.append("attendeeId", attendeeId);
      console.log(participantData);

      const addParticipationResponse = await axios.post(
        "/participation/recordParticipation",
        participantData
      );

      if (addParticipationResponse.data.success === true) {
        setModalNotificationMessage(
          "Your meeting attendance has been recorded successfully. Kindly pass the device to the next person. Thank you"
        );
        setModalNotificationType("success");
        setShowNotificationModal(true);
        onSuccess();

        // Clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          title: "",
          meetingRole: "participant",
          signature: "",
        });
        sigPad.clear();
      }
    } catch (error) {
      console.error("Error recording attendance:", error);
      setModalNotificationMessage(
        "Failed to record attendance. Please try again."
      );
      setModalNotificationType("error");
      setShowNotificationModal(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition duration-300">
      <div className="bg-white rounded-lg p-6 w-2/3 relative">
        <button
          className="absolute text-2xl top-4 right-4 text-red-500 hover:text-red-700"
          onClick={() => {
            setShowAddModal(false);
          }}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-amber-700">
          Sign Your Attendance
        </h2>
        <p className="font-semibold mb-4 text-gray-500">
          Search your name or email in the search field below if you've ever
          used the system to sign attendance before
        </p>
        <div className="flex items-center "></div>
        <div className="relative mb-6">
          <div className="flex items-center bg-gray-200 md:text-base text-sm rounded-full px-4 py-[11px] md:py-3 w-full shadow-sm p-2 ">
            <FaSearch className="text-gray-600 md:mx-4" />
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search your name or email and select from the list results"
              className="bg-transparent focus:outline-none pl-2 w-full text-gray-700 font-semibold"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="ml-2 text-gray-500">
                <FaTimes />
              </button>
            )}
          </div>

          {/* Search Results Overlay */}
          {filteredResults.length > 0 ? (
            <div className="absolute left-10 right-10 bg-gray-200 border border-gray-300 rounded-sm shadow-lg max-h-56 overflow-y-auto z-10">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  <span className="font-semibold pl-5">{result.name}</span>
                  <span className="text-gray-500 font-semibold ml-4">
                    {result.email}
                  </span>
                </div>
              ))}
            </div>
          ) : searchQuery && filteredResults.length === 0 ? (
            <div className="absolute left-10 right-10 text-center bg-gray-200 border border-gray-300 rounded-sm shadow-lg z-10 p-4 text-gray-600">
              Name or email not found in the database
            </div>
          ) : null}
        </div>

        {selectedResult ? (
          <p className="font-semibold mb-4">
            Confirm your details below from the selection:
          </p>
        ) : (
          <p className="font-semibold mb-4">
            If not found, enter your details below:
          </p>
        )}

        <div className="flex">
          {/* Form Fields */}
          <div className="w-1/2 mr-10 font-semibold">
            <input
              type="text"
              name="name"
              placeholder="Enter your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 pl-5 p-3 border border-gray-300sm "
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization / Ministry / Company"
              value={formData.organization}
              onChange={handleChange}
              className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
            />
            <input
              type="text"
              name="title"
              placeholder="Job Title in your Organization / Ministry / Company"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
            />
          </div>

          {/* Signature Pad */}
          <div className="w-1/2">
            <select
              name="meetingRole"
              value={formData.meetingRole}
              onChange={handleChange}
              className="w-full mb-4 pl-5 font-semibold p-3 border border-gray-300sm"
            >
              <option value="participant">Participant</option>
              <option value="chair">Chair</option>
              <option value="rapporteur">Rapporteur</option>
              <option value="secretary">Secretary</option>
              <option value="speaker">Speaker</option>
              <option value="host">Host</option>
            </select>
            <p className="font-semibold text-gray-600">
              Please draw your signature in the gray box below:
            </p>
            <SignaturePad
              ref={(ref) => setSigPad(ref)}
              canvasProps={{
                className:
                  "signatureCanvas bg-gray-200 border border-gray-300 h-40 w-full mb-2",
              }}
            />
            <div className="">
              <button
                onClick={handleClearSignature}
                className="bg-red-500 text-sm font-semibold text-white px-4 py-2 rounded-sm"
              >
                Clear Signature
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              handleSaveSignature();
              setTimeout(handleAddParticipant, 100);
            }}
            className="mt-4 bg-blue-500 font-semibold text-white px-8 py-2 rounded-sm"
          >
            Submit Attendance
          </button>
        </div>
      </div>

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => {
          setShowNotificationModal(false);
          setShowAddModal(false);
        }}
        message={modalNotificationMessage}
        modalType={modalNotificationType}
      />
    </div>
  );
};

export default AddParticipantModal;
