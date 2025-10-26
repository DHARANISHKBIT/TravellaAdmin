import React, { useState } from "react";
import "./Destinationcss.css";

const AddDestination = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    description: "",
    image: "",
    bestSeason: "",
    tags: "",
    topAttractions: "",
    lat: "",
    lng: "",
    mapLink: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only check required fields
    const requiredFields = ["name", "country", "city", "description", "image"];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill the required field: ${field}`);
        return;
      }
    }

    const token = localStorage.getItem('authToken');

    // Prepare destination data
    const destinationData = {
      name: form.name,
      country: form.country,
      city: form.city,
      description: form.description,
      images: [form.image],
      ...(form.state && { state: form.state }),
      ...(form.bestSeason && { bestSeason: form.bestSeason }),
      ...(form.tags && { tags: form.tags.split(",").map((tag) => tag.trim()) }),
      ...(form.topAttractions && { topAttractions: form.topAttractions.split(",").map((place) => place.trim()) }),
      ...(form.lat && form.lng
        ? {
          mapLocation: {
            lat: parseFloat(form.lat),
            lng: parseFloat(form.lng),
            link: form.mapLink || "",
          },
        }
        : {}),
    };

    try {
      const response = await fetch(
        "https://travella-server-v2.onrender.com/api/destinations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(destinationData),
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        setForm({
          name: "",
          country: "",
          state: "",
          city: "",
          description: "",
          image: "",
          bestSeason: "",
          tags: "",
          topAttractions: "",
          lat: "",
          lng: "",
          mapLink: "",
        });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        alert("Failed to add destination: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {showSuccess && (
          <div className="success-alert">
            <div className="success-text">
              <span className="material-symbols-outlined">check_circle</span>
              <p>Destination added successfully!</p>
            </div>
            <button onClick={() => setShowSuccess(false)}>✕</button>
          </div>
        )}

        <h1 className="form-title">Add New Destination</h1>

        <form onSubmit={handleSubmit} className="form">
          {/* BASIC INFO */}
          <div className="form-group">
            <label htmlFor="name">Destination Name *</label>
            <input
              id="name"
              placeholder="Enter destination name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                id="country"
                placeholder="Enter country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                placeholder="Enter state (optional)"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              placeholder="Enter destination description"
              value={form.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              id="image"
              placeholder="Enter image URL"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          {/* OTHER DETAILS */}
          <div className="form-group">
            <label htmlFor="bestSeason">Best Season</label>
            <input
              id="bestSeason"
              placeholder="e.g., April to June, September to November"
              value={form.bestSeason}
              onChange={handleChange}
            />
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                placeholder="e.g., romantic, historic, museum"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="topAttractions">Top Attractions (comma-separated)</label>
              <input
                id="topAttractions"
                placeholder="e.g., Eiffel Tower, Louvre Museum"
                value={form.topAttractions}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* MAP LOCATION */}
          <h3 className="section-title">Map Location</h3>
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                id="lat"
                placeholder="Enter latitude"
                value={form.lat}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lng">Longitude</label>
              <input
                id="lng"
                placeholder="Enter longitude"
                value={form.lng}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mapLink">Map Link</label>
            <input
              id="mapLink"
              placeholder="Enter Google Maps link"
              value={form.mapLink}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDestination;
