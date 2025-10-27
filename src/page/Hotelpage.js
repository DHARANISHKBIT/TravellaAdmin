import React, { useEffect, useState } from "react";
import "./HotelPagecss.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editHotel, setEditHotel] = useState({
    id: "",
    name: "",
    city: "",
    country: "",
    pricePerNight: "",
  });

  // ✅ Fetch all hotels (GET)
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.getHotels();
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();

        const formatted = data.map((h) => ({
          id: h._id,
          name: h.name,
          city: h.city || "",
          country: h.country || "",
          pricePerNight: h.pricePerNight || "",
          image: h.images?.[0] || "",
        }));

        setHotels(formatted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // ✅ DELETE Hotel
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
    if (!confirmDelete) return;

    try {
      const response = await api.deleteHotel(id);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setHotels((prev) => prev.filter((h) => h.id !== id));
      alert("✅ Hotel deleted successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ OPEN Edit Modal
  const handleEdit = (hotel) => {
    setEditHotel({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      pricePerNight: hotel.pricePerNight,
    });
    setShowEditModal(true);
  };

  // ✅ UPDATE (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: editHotel.name,
      city: editHotel.city,
      country: editHotel.country,
      pricePerNight: Number(editHotel.pricePerNight),
    };

    try {
      const response = await api.updateHotel(editHotel.id, updatedData);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update");

      // Update local state
      setHotels((prev) =>
        prev.map((hotel) =>
          hotel.id === editHotel.id ? { ...hotel, ...updatedData } : hotel
        )
      );

      setShowEditModal(false);
      alert("✅ Hotel updated successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading) return <div className="loading">Loading hotels...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="hotels-page">
      <h1>Available Hotels</h1>

      <div className="btn">
        <button className="addhotel-btn" onClick={() => navigate("/hotels")}>
          <span className="material-symbols-outlined">add</span> Add Hotel
        </button>
      </div>

      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img
                src={
                  hotel.image ||
                  "https://cdn-icons-png.flaticon.com/512/201/201623.png"
                }
                alt={hotel.name}
                className="hotel-img"
              />
              <h3>{hotel.name}</h3>
              <p>
                📍 {hotel.city}, {hotel.country}
              </p>
              <p>💰 ₹{hotel.pricePerNight} / night</p>

              <div className="hotel-actions">
                <button onClick={() => handleEdit(hotel)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(hotel.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>

      {/* ✅ EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Hotel</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Hotel Name"
                value={editHotel.name}
                onChange={(e) =>
                  setEditHotel({ ...editHotel, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={editHotel.city}
                onChange={(e) =>
                  setEditHotel({ ...editHotel, city: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={editHotel.country}
                onChange={(e) =>
                  setEditHotel({ ...editHotel, country: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price Per Night"
                value={editHotel.pricePerNight}
                onChange={(e) =>
                  setEditHotel({
                    ...editHotel,
                    pricePerNight: e.target.value,
                  })
                }
                required
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
