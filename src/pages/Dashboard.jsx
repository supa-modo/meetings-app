import React from "react";
import DashboardContent from "../components/Dashboard";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/* Dashboard Content */}
      <DashboardContent />
    </div>
  );
}

export default Dashboard;
