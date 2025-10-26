import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); // 🔹 Get token

  // 🔹 State to store API data
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
  });

  // 🔹 Fetch booking stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        console.warn("No authentication token found.");
        return;
      }

      try {
        // Fetch bookings stats
        const bookingRes = await fetch(
          "https://travella-server-v2.onrender.com/api/bookings/stats",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const bookingData = await bookingRes.json();

        // Fetch users list
        const usersRes = await fetch(
          "https://travella-server-v2.onrender.com/api/auth/userlist",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const usersData = await usersRes.json();

        // Update state
        setStats({
          totalBookings: bookingData.totalBookings || 0,
          pendingBookings: bookingData.pendingBookings || 0,
          totalUsers: Array.isArray(usersData) ? usersData.length : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  // 🔹 Handle navigation
  const handleOnClick = (name) => {
    if (name === "Add Destination") navigate("/destination");
    else if (name === "Add Hotel") navigate("/hotels");
    else if (name === "Add Car Rental") navigate("/car-rent");
    else if (name === "New Booking") navigate("/bookings");
  };

  return (
    <div className="fullpage">
      {/* Header */}
      <div className="header">
        <div>
          <p className="title">Welcome, Admin!</p>
          <p className="subtitle">Here's your travel booking system overview.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card">
          <p>Total Bookings</p>
          <p className="value">{stats.totalBookings}</p>
          <p className="change">+5%</p>
        </div>
        <div className="stats-card">
          <p>Pending Bookings</p>
          <p className="value">{stats.pendingBookings}</p>
          <p className="change">+8%</p>
        </div>
        <div className="stats-card">
          <p>User Count</p>
          <p className="value">{stats.totalUsers}</p>
          <p className="change">+12%</p>
        </div>
        <div className="stats-card">
          <p>Active Listings</p>
          <p className="value">890</p>
          <p className="change">+2%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {[
          { label: "Add Destination", icon: "add_location_alt" },
          { label: "Add Hotel", icon: "add_home_work" },
          { label: "Add Car Rental", icon: "directions_car" },
          { label: "New Booking", icon: "add" },
        ].map((btn, i) => (
          <button key={i} className="primary" onClick={() => handleOnClick(btn.label)}>
            <span className="material-symbols-outlined">{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <ul>
          {[
            { title: "New Booking: #B12345", text: "John Doe booked a trip to Paris." },
            { title: "New User Registered", text: "jane.doe@example.com" },
            { title: "System Alert", text: "Pending approval for new hotel listing." },
            { title: "New Listing Added", text: "The Grand Hotel in New York." },
             { title: "New Booking: #B12345", text: "John Doe booked a trip to Paris." },
            { title: "New User Registered", text: "jane.doe@example.com" },
            { title: "System Alert", text: "Pending approval for new hotel listing." },
            { title: "New Listing Added", text: "The Grand Hotel in New York." },
          ].map((act, i) => (
            <li key={i}>
              <div className="activity-info">
                <div className="icon">✓</div>
                <div>
                  <p className="title">{act.title}</p>
                  <p className="text">{act.text}</p>
                </div>
              </div>
              <p className="time">2 min ago</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
