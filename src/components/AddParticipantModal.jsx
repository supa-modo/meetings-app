import React from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import SignaturePad from "react-signature-canvas";

const AddParticipantModal = ({
  showAddModal,
  setShowAddModal,
  searchQuery,
  handleSearchChange,
  clearSearch,
  filteredResults,
  handleResultClick,
  selectedResult,
  formData,
  handleChange,
  setSigPad,
  handleClearSignature,
  handleAddParticipant,
}) => {
  if (!showAddModal) return null; // Only render if modal is visible

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-2/3 relative">
        <button
          className="absolute text-2xl top-4 right-4 text-red-500 hover:text-red-700"
          onClick={() => setShowAddModal(false)}
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
            onClick={handleAddParticipant}
            className="mt-4 bg-blue-500 font-semibold text-white px-8 py-2 rounded-sm"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipantModal;
