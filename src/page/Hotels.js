import React, { useState, useEffect } from "react";
import "./Hotelstyle.css";

const AddHotel = () => {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    city: "",
    country: "",
    pricePerNight: "",
    amenities: "",
    images: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("authToken");

  // ✅ Fetch all destinations from API when component loads
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("https://travella-server-v2.onrender.com/api/destinations");
        const data = await res.json();
        setDestinations(data); // Store destinations in state
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  // ✅ Handle destination select (set destination ID)
  const handleDestinationChange = (e) => {
    const selectedId = e.target.value;
    setForm({ ...form, destination: selectedId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const hotelData = {
      name: form.name,
      destination: form.destination, // send destination ID
      city: form.city,
      country: form.country,
      pricePerNight: parseFloat(form.pricePerNight),
      amenities: form.amenities
        ? form.amenities.split(",").map((a) => a.trim())
        : [],
      images: form.images ? form.images.split(",").map((img) => img.trim()) : [],
    };

    try {
      const response = await fetch("https://travella-server-v2.onrender.com/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hotelData),
      });

      if (response.ok) {
        setShowAlert(true);
        setForm({
          name: "",
          destination: "",
          city: "",
          country: "",
          pricePerNight: "",
          amenities: "",
          images: "",
        });
        setTimeout(() => setShowAlert(false), 4000);
      } else {
        alert("Failed to add hotel!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="add-hotel">
      <main className="main-content">
        <h1 className="page-title">Add New Hotel</h1>
        <p className="subtitle">
          Fill in the details below to add a new hotel to the destination.
        </p>

        {showAlert && (
          <div className="success-alert show">
            <span className="material-symbols-outlined">check_circle</span>
            Hotel added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Hotel Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Enter hotel name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Destination Dropdown */}
          <div className="form-group">
            <label htmlFor="destination">Select Destination *</label>
            <select
              id="destination"
              value={form.destination}
              onChange={handleDestinationChange}
              required
              className="select"
            >
              <option value="">-- Choose Destination --</option>
              {destinations.map((dest) => (
                <option key={dest._id} value={dest._id}>
                  {dest.name} ({dest.country})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                id="country"
                type="text"
                placeholder="Enter country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pricePerNight">Price Per Night ($) *</label>
            <input
              id="pricePerNight"
              type="number"
              placeholder="Enter price per night"
              value={form.pricePerNight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amenities">Amenities (comma-separated)</label>
            <input
              id="amenities"
              type="text"
              placeholder="e.g., Free WiFi, Pool, Breakfast"
              value={form.amenities}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Image URLs (comma-separated)</label>
            <input
              id="images"
              type="text"
              placeholder="e.g., https://image1.jpg, https://image2.jpg"
              value={form.images}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Add Hotel"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddHotel;
