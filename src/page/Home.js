import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // 🔹 All dashboard stats
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
    totalDestinations: 0,
  });

  // 🔹 Recent bookings data
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all stats and bookings
  useEffect(() => {
    if (!token) {
      setError("No authentication token found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // 🟢 1. Fetch booking stats
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

        // 🟢 2. Fetch user list
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

        // 🟢 3. Fetch destinations
        const destinationsRes = await fetch(
          "https://travella-server-v2.onrender.com/api/destinations",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const destinationsData = await destinationsRes.json();

        // 🟢 4. Fetch all bookings for recent activity
        const bookingsRes = await fetch(
          "https://travella-server-v2.onrender.com/api/bookings/userbookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const bookingsData = await bookingsRes.json();

        // ✅ Update all dashboard stats
        setStats({
          totalBookings: bookingData?.totalBookings || 0,
          pendingBookings: bookingData?.pendingBookings || 0,
          totalUsers: Array.isArray(usersData) ? usersData.length : 0,
          totalDestinations: Array.isArray(destinationsData)
            ? destinationsData.length
            : 0,
        });

        // ✅ Update recent bookings
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // ✅ Navigation handler
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
          <p className="subtitle">
            Here's your travel booking system overview.
          </p>
        </div>
      </div>

      {/* Stats Section */}
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
          <p>Total Destinations</p>
          <p className="value">{stats.totalDestinations}</p>
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
        <h3 className="ti">Recent Bookings</h3>
        {loading ? (
          <p>Loading recent activity...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : bookings.length === 0 ? (
          <p>No recent activity found.</p>
        ) : (
          <ul>
            {bookings.slice(-5).reverse().map((booking, i) => (
              <li key={i}>
                <div className="activity-info">
                  <div className="icon">✓</div>
                  <div>
                    <p className="title">
                      New Booking:{" "}
                      <strong>{booking.destinationId?.name || "Unknown"}</strong>
                    </p>
                    <p className="text">
                      {booking.userId?.username || "Unknown user"} booked a trip to{" "}
                      {booking.destinationId?.city
                        ? `${booking.destinationId.city}, ${booking.destinationId.country}`
                        : "a destination"}
                      .
                    </p>
                  </div>
                </div>
                <p className="time">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
