import React, { useEffect, useState, useRef } from "react";
import "./BookingDeatilscss.css";

const TripBookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState({ isOpen: false, bookingIndex: null, action: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Store token in useRef so it doesn't cause re-renders
  const tokenRef = useRef(localStorage.getItem("authToken"));

  // ✅ Fetch bookings only once (on mount)
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        "https://travella-server-v2.onrender.com/api/bookings/userbookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenRef.current}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenRef.current) fetchBookings();
    else {
      setError("No authentication token found. Please log in again.");
      setLoading(false);
    }
    // ✅ Empty dependency array → run only once
  },[]);

  // ✅ Filter bookings by status
  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  // ✅ Open modal for approve/reject
  const handleActionClick = (index, action) => {
    setModal({ isOpen: true, bookingIndex: index, action });
  };

  // ✅ Confirm update
  const handleConfirm = async () => {
    const booking = bookings[modal.bookingIndex];
    if (!booking?._id) return;

    try {
      const res = await fetch(
        `https://travella-server-v2.onrender.com/api/bookings/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenRef.current}`,
          },
          body: JSON.stringify({ status: modal.action }),
        }
      );

      if (!res.ok) throw new Error("Failed to update booking status");

      // ✅ Update state locally
      setBookings((prev) =>
        prev.map((b, idx) =>
          idx === modal.bookingIndex ? { ...b, status: modal.action } : b
        )
      );

      alert(`Booking ${modal.action.toLowerCase()} successfully!`);
    } catch (err) {
      alert(`Error updating booking: ${err.message}`);
    } finally {
      setModal({ isOpen: false, bookingIndex: null, action: "" });
    }
  };

  const handleCancel = () => setModal({ isOpen: false, bookingIndex: null, action: "" });

  // ✅ Helper for date range formatting
  const formatDate = (start, end) => {
    const s = new Date(start).toLocaleDateString();
    const e = new Date(end).toLocaleDateString();
    return `${s} → ${e}`;
  };

  // ✅ Render
  if (loading) return <p className="loading">Loading bookings...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trip Booking Management</h1>

      {/* ✅ Status Filters */}
      <div className="status-filters">
        {["All", "pending", "Approved", "Rejected"].map((status) => (
          <div
            key={status}
            className={`status-filter ${
              filter.toLowerCase() === status.toLowerCase() ? "active" : ""
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        ))}
      </div>

      {/* ✅ Bookings Grid */}
      <div className="bookings-grid">
        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          filteredBookings.map((booking, index) => {
            const userName = booking?.userId?.username || "Unknown User";
            const destinationName = booking?.destinationId?.name || "Unknown Destination";
            const destinationImage =
              booking?.destinationId?.images?.[0] ||
              "https://cdn-icons-png.flaticon.com/512/201/201623.png";
            const start = booking?.startDate;
            const end = booking?.endDate;
            const guests = booking?.guests || 1;
            const status = booking?.status || "pending";

            return (
              <div key={booking._id || index} className="booking-card">
                <div
                  className="booking-image"
                  style={{ backgroundImage: `url(${destinationImage})` }}
                ></div>

                <div className="booking-info">
                  <p className="booking-user">
                    <strong>{userName}</strong> booked <strong>{destinationName}</strong>
                  </p>
                  <p className="booking-dates">{formatDate(start, end)}</p>
                  <p className="booking-travelers">Guests: {guests}</p>

                  <div className={`booking-status ${status.toLowerCase()}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>

                  <div className="booking-actions">
                    <button
                      onClick={() => handleActionClick(index, "Approved")}
                      disabled={status === "Approved"}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleActionClick(index, "Rejected")}
                      disabled={status === "Rejected"}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ✅ Modal */}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>
              Are you sure you want to{" "}
              <strong>{modal.action.toLowerCase()}</strong> this booking?
            </p>
            <div className="modal-actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-btn">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripBookingDashboard;
