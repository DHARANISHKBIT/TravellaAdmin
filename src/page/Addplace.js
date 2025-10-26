import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Addplacecss.css";

const AddPlace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { destinationId, destinationName } = location.state || {};

  const [newPlace, setNewPlace] = useState({
    place_name: "",
    description: "",
    category: "",
    time_slot: "",
    rating: "",
    price: "",
    duration_hours: "",
    image_url: "",
    best_season: "",
    lat: "",
    lng: "",
    is_popular: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPlace((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destinationId) {
      alert("⚠️ Missing destination ID. Please go back and select a destination.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("⚠️ No auth token found. Please log in first.");
      return;
    }

    // 🟢 Rename 'place_name' → 'name' for backend compatibility
    const placeData = {
      name: newPlace.place_name,
      description: newPlace.description,
      category: newPlace.category,
      time_slot: newPlace.time_slot,
      rating: parseFloat(newPlace.rating) || 0,
      price: parseFloat(newPlace.price) || 0,
      duration_hours: parseFloat(newPlace.duration_hours) || 0,
      image_url: newPlace.image_url,
      best_season: newPlace.best_season,
      destination: destinationId,
      location: {
        lat: parseFloat(newPlace.lat) || 0,
        lng: parseFloat(newPlace.lng) || 0,
      },
      is_popular: newPlace.is_popular,
    };

    try {
      const response = await fetch(
        "https://travella-server-v2.onrender.com/api/places",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(placeData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "❌ Failed to add place");
        return;
      }

      alert("✅ Place added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error adding place:", error);
      alert("❌ Something went wrong while adding the place.");
    }
  };

  return (
    <div className="add-place-page">
      <div className="add-place-container">
        <h1 className="place-header">
          Add New Place for <span>{destinationName || "Destination"}</span>
        </h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <div className="form-group">
              <label>Place Name *</label>
              <input
                name="place_name"
                value={newPlace.place_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={newPlace.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                value={newPlace.category}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Time Slot</label>
              <input
                name="time_slot"
                value={newPlace.time_slot}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                value={newPlace.rating}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={newPlace.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Duration (Hours)</label>
              <input
                type="number"
                name="duration_hours"
                value={newPlace.duration_hours}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                name="lat"
                step="0.0001"
                value={newPlace.lat}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                name="lng"
                step="0.0001"
                value={newPlace.lng}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                name="image_url"
                value={newPlace.image_url}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Best Season</label>
              <input
                name="best_season"
                value={newPlace.best_season}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlace;
