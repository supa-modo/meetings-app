// src/components/AddParticipantModal.js
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SignaturePad from "react-signature-canvas";

const AddParticipantModal = ({
  showModal,
  setShowModal,
  formData,
  setFormData,
  handleSearchChange,
  filteredResults,
  handleResultClick,
  clearSearch,
  handleChange,
  sigPad,
  handleClearSignature,
  handleSaveSignature,
  handleAddParticipant,
  searchQuery,
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-2/3 relative">
            <button
              className="absolute text-2xl top-4 right-4 text-red-500 hover:text-red-700"
              onClick={() => setShowModal(false)}
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

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="flex items-center bg-gray-200 md:text-base text-sm rounded-full px-4 py-[11px] md:py-3 w-full shadow-sm p-2 ">
                <FaSearch className="text-gray-600 md:mx-4" />
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search your name or email if you've used the system to sign attendance before"
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
                      <span className="font-semibold">{result.name}</span>
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

            {/* Form Fields */}
            <div className="flex">
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
                  placeholder="Your Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mb-4 pl-5 p-3 border border-gray-300sm"
                />
              </div>

              {/* Signature Pad */}
              <div className="w-1/2">
                <SignaturePad
                  ref={(ref) => setSigPad(ref)}
                  canvasProps={{
                    className: "signatureCanvas border-2 w-full h-48",
                  }}
                />
                <button
                  onClick={handleClearSignature}
                  className="bg-red-500 text-white px-4 py-2 rounded-sm mt-4"
                >
                  Clear Signature
                </button>
                <button
                  onClick={handleSaveSignature}
                  className="bg-blue-500 text-white px-4 py-2 rounded-sm mt-4"
                >
                  Save Signature
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAddParticipant}
              className="bg-green-600 text-white px-8 py-2 rounded-sm mt-4"
            >
              Add Participant
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddParticipantModal;
