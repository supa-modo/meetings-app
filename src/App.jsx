// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MeetingManagement from "./pages/MeetingManagement";
import MeetingsPage from "./pages/Meetings";
import AttendanceList from "./components/AttendanceList";
import AttendanceModal from "./components/AttendanceModal";
import AttendeesDirectory from "./pages/AttendeesDirectory";
import MeetingAttendance from "./pages/MeetingAttendance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meetings" element={<MeetingAttendance />} />
        <Route path="/directory" element={<AttendeesDirectory />} />
        {/* Route for a specific Meeting Management */}
        <Route path="/meetings/:meetingId" element={<MeetingManagement />} />
        <Route path="attendance" element={<AttendanceList />} />
        <Route path="attendance/new" element={<AttendanceModal />} />
      </Routes>
    </Router>
  );
}

export default App;
