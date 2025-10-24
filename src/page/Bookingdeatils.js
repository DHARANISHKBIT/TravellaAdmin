import React, { useState } from "react";
import "./BookingDeatilscss.css";

const initialBookings = [
  {
    id: 1,
    user: "John Doe",
    destination: "Paris, France",
    dates: "June 1, 2024 - June 10, 2024",
    travelers: "2 Adults",
    status: "Pending",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeM7dxd6XahmwwyH4ST4xnt6LeFrepHqjq217HH7edkltnbb14V88woKz4DTyytPlzSGUXnnyMUL-Tg1ZJ2gW1weSw4nEWG_O7xCn2uECBHVM0C8VXk5vGWuZDwKEKzbWqFAuFyn5FXC7lLBzG8ZhZPpr0Ovjkc752DHpbvN_Y1lq_wmmh80mpAqCaP3ttEz0CuX67KiyC94QGcogfW-OAZ70mKsHHejxbLYPKzvbnOBxyHIa5HfGZWpYMDiTvNhl5X3UDeW7MU0"
  },
  {
    id: 2,
    user: "Jane Smith",
    destination: "Tokyo, Japan",
    dates: "July 15, 2024 - July 25, 2024",
    travelers: "3 Adults",
    status: "Approved",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiMWCt4CZaGY9xR4Nwe5T3ZcTtKQA-68x6anBoW7ylca3AM9boBGNojEiAvF7fwX_AzwKXsGzKyJknbMgsYxGNn-ZIIry6vjXBi8T-52zen7j7G9utC-3X5N0zpXRNihSdsbq9ReY7CIYPDPUorvhwbm18yeXHlH4SMpXKFGaviMOtldH4ycdL7X1ZW5RMP4BU21Vxyd9gCOgJDx1-Pp1xlfbsApcvXwpLZw5UFbrgqlUR0kxOfFhS1Wd8X3Anmu1qdA2fQ8odb6M"
  },
  {
    id: 3,
    user: "John Doe",
    destination: "Paris, France",
    dates: "June 1, 2024 - June 10, 2024",
    travelers: "2 Adults",
    status: "Pending",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeM7dxd6XahmwwyH4ST4xnt6LeFrepHqjq217HH7edkltnbb14V88woKz4DTyytPlzSGUXnnyMUL-Tg1ZJ2gW1weSw4nEWG_O7xCn2uECBHVM0C8VXk5vGWuZDwKEKzbWqFAuFyn5FXC7lLBzG8ZhZPpr0Ovjkc752DHpbvN_Y1lq_wmmh80mpAqCaP3ttEz0CuX67KiyC94QGcogfW-OAZ70mKsHHejxbLYPKzvbnOBxyHIa5HfGZWpYMDiTvNhl5X3UDeW7MU0"
  },
  {
    id: 4,
    user: "Jane Smith",
    destination: "Tokyo, Japan",
    dates: "July 15, 2024 - July 25, 2024",
    travelers: "3 Adults",
    status: "Approved",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiMWCt4CZaGY9xR4Nwe5T3ZcTtKQA-68x6anBoW7ylca3AM9boBGNojEiAvF7fwX_AzwKXsGzKyJknbMgsYxGNn-ZIIry6vjXBi8T-52zen7j7G9utC-3X5N0zpXRNihSdsbq9ReY7CIYPDPUorvhwbm18yeXHlH4SMpXKFGaviMOtldH4ycdL7X1ZW5RMP4BU21Vxyd9gCOgJDx1-Pp1xlfbsApcvXwpLZw5UFbrgqlUR0kxOfFhS1Wd8X3Anmu1qdA2fQ8odb6M"
  },
  {
    id: 5,
    user: "John Doe",
    destination: "Paris, France",
    dates: "June 1, 2024 - June 10, 2024",
    travelers: "2 Adults",
    status: "Pending",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVeM7dxd6XahmwwyH4ST4xnt6LeFrepHqjq217HH7edkltnbb14V88woKz4DTyytPlzSGUXnnyMUL-Tg1ZJ2gW1weSw4nEWG_O7xCn2uECBHVM0C8VXk5vGWuZDwKEKzbWqFAuFyn5FXC7lLBzG8ZhZPpr0Ovjkc752DHpbvN_Y1lq_wmmh80mpAqCaP3ttEz0CuX67KiyC94QGcogfW-OAZ70mKsHHejxbLYPKzvbnOBxyHIa5HfGZWpYMDiTvNhl5X3UDeW7MU0"
  },
  {
    id: 6,
    user: "Jane Smith",
    destination: "Tokyo, Japan",
    dates: "July 15, 2024 - July 25, 2024",
    travelers: "3 Adults",
    status: "Rejected",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiMWCt4CZaGY9xR4Nwe5T3ZcTtKQA-68x6anBoW7ylca3AM9boBGNojEiAvF7fwX_AzwKXsGzKyJknbMgsYxGNn-ZIIry6vjXBi8T-52zen7j7G9utC-3X5N0zpXRNihSdsbq9ReY7CIYPDPUorvhwbm18yeXHlH4SMpXKFGaviMOtldH4ycdL7X1ZW5RMP4BU21Vxyd9gCOgJDx1-Pp1xlfbsApcvXwpLZw5UFbrgqlUR0kxOfFhS1Wd8X3Anmu1qdA2fQ8odb6M"
  },
  // Add more bookings...
];

const TripBookingDashboard = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState({ isOpen: false, bookingIndex: null, action: "" });

  // Filtered bookings based on selected status
  const filteredBookings = filter === "All" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const handleActionClick = (index, action) => {
    setModal({ isOpen: true, bookingIndex: index, action });
  };

  const handleConfirm = () => {
    setBookings((prev) =>
      prev.map((b, idx) =>
        idx === modal.bookingIndex ? { ...b, status: modal.action } : b
      )
    );
    setModal({ isOpen: false, bookingIndex: null, action: "" });
  };

  const handleCancel = () => setModal({ isOpen: false, bookingIndex: null, action: "" });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trip Booking Management</h1>

      {/* Status Filters */}
      <div className="status-filters">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <div
            key={status}
            className={`status-filter ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </div>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="bookings-grid">
        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => {
            const bookingIndex = bookings.indexOf(booking);
            return (
              <div key={bookingIndex} className="booking-card">
                <div
                  className="booking-image"
                  style={{ backgroundImage: `url(${booking.image})` }}
                ></div>
                <div className="booking-info">
                  <p className="booking-user">{booking.user} to {booking.destination}</p>
                  <p className="booking-dates">{booking.dates}</p>
                  <p className="booking-travelers">{booking.travelers}</p>
                  <div className={`booking-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </div>
                  <div className="booking-actions">
                    <button
                      onClick={() => handleActionClick(bookingIndex, "Approved")}
                      disabled={booking.status === "Approved"}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleActionClick(bookingIndex, "Rejected")}
                      disabled={booking.status === "Rejected"}
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

      {/* Modal */}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>Are you sure you want to {modal.action.toLowerCase()} this booking?</p>
            <div className="modal-actions">
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
              <button onClick={handleConfirm} className="confirm-btn">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripBookingDashboard;