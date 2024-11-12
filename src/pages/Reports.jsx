// src/screens/ReportsScreen.js

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import jsPDF from "jspdf";
import * as XLSX from "xlsx"; // For exporting to Excel

const ReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState("meetingStats");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);

  // Simulated local report data
  const mockData = {
    meetingStats: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [15, 20, 25, 30],
    },
    participantStats: {
      labels: [
        "Participant 1",
        "Participant 2",
        "Participant 3",
        "Participant 4",
      ],
      data: [10, 15, 20, 25],
    },
  };

  // Use useEffect to simulate fetching report data
  useEffect(() => {
    // Simulate data fetch and update state
    setReportData(mockData); // Directly setting the mock data instead of fetching from an API
  }, [selectedReport, startDate, endDate]);

  // Ensure reportData exists before trying to access properties
  const chartData = {
    meetingStats: {
      labels: reportData?.meetingStats?.labels || [],
      datasets: [
        {
          label: "Meetings Held",
          data: reportData?.meetingStats?.data || [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    participantStats: {
      labels: reportData?.participantStats?.labels || [],
      datasets: [
        {
          label: "Meetings Attended",
          data: reportData?.participantStats?.data || [],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
  };

  // Handle report selection
  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
  };

  // Handle date filters
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Export to PDF using jsPDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text("Report: " + selectedReport, 20, 20);
    doc.addPage();
    doc.text("Data Preview", 20, 40);
    doc.autoTable({
      head: [["Label", "Data"]],
      body: Array.isArray(reportData?.[selectedReport])
        ? reportData[selectedReport].map((item) => [item.label, item.data])
        : [], // Ensure it's an array before mapping
    });
    doc.save(`${selectedReport}_report.pdf`);
  };

  // Export to Excel using xlsx
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["Label", "Data"],
      ...(Array.isArray(reportData?.[selectedReport])
        ? reportData[selectedReport].map((item) => [item.label, item.data])
        : []), // Ensure it's an array before mapping
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Report Data");
    XLSX.writeFile(wb, `${selectedReport}_report.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Navigation */}
      <div className="sticky top-0 z-10 ">
        <Header />
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto bg-gray-100 px-4 py-6 min-h-screen">
        {/* Reports Header Section */}
        <div className="mb-8 ">
          <h1 className="text-3xl font-bold text-amber-700 mb-4">
            Meeting Reports
          </h1>
          <p className="text-lg text-gray-500 font-semibold">
            View, filter, and export various reports to help track the system's
            performance.
          </p>
        </div>

        {/* Flexbox Layout for Filters and Report Preview */}
        <div className="flex flex-wrap gap-8">
          {/* Filters Section */}
          <div className="flex-1 bg-white p-6 rounded-md shadow-md">
            <div className="mb-6">
              <label
                htmlFor="reportType"
                className="font-semibold text-gray-700"
              >
                Select Report Type
              </label>
              <select
                id="reportType"
                value={selectedReport}
                onChange={handleReportChange}
                className="mt-2 p-3 border font-semibold text-gray-600 border-gray-300 rounded-md w-full"
              >
                <option value="meetingStats">Meeting Stats</option>
                <option value="participantStats">Participant Stats</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="mt-2 font-semibold text-gray-600 p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="endDate" className="font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="mt-2 p-3 font-semibold text-gray-600 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Report Preview Section */}
          <div className="flex-1 bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                Report Preview
              </h2>
              <div className="flex space-x-4 font-semibold text-[15px]">
                <button
                  onClick={exportToPDF}
                  className="px-4 py-2 bg-green-600 text-white rounded-sm shadow-md hover:bg-green-700"
                >
                  Export to PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="px-4 py-2 bg-blue-500 text-white rounded-sm shadow-md hover:bg-blue-600"
                >
                  Export to Excel
                </button>
              </div>
            </div>

            {/* Chart Display */}
            <div className="mb-6">
              <Bar
                data={chartData[selectedReport]}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Table for Report Data */}
        <div className="bg-white p-6 rounded-md shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Report Data
          </h3>
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-700">Label</th>
                <th className="px-4 py-2 text-left text-gray-700">Data</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reportData?.[selectedReport]) &&
                reportData[selectedReport].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {item.label}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {item.data}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;
