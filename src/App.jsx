// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MeetingsPage from "./pages/Meetings";
import AttendeesDirectory from "./pages/AttendeesDirectory";
import MeetingAttendance from "./pages/MeetingAttendance";
import ReportsScreen from "./pages/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/directory" element={<AttendeesDirectory />} />
        {/* Route for a specific Meeting Management */}
        <Route path="/meetings2/" element={<MeetingAttendance />} />
        <Route path="/reports/" element={<ReportsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
