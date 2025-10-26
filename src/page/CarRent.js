import React, { useState, useEffect } from "react";
import "./CarRentstyle.css";

const AddCarRental = () => {
  const [form, setForm] = useState({
    provider: "",
    destination: "",
    carType: "",
    carModel: "",
    pricePerDay: "",
    features: "",
    images: "",
    location: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("authToken");

  // ✅ Fetch all destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "https://travella-server-v2.onrender.com/api/destinations"
        );
        const data = await response.json();
        setDestinations(data);
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

  const handleDestinationChange = (e) => {
    setForm({ ...form, destination: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const carData = {
      provider: form.provider,
      destination: form.destination, // destination ID
      carType: form.carType,
      carModel: form.carModel,
      pricePerDay: parseFloat(form.pricePerDay),
      features: form.features
        ? form.features.split(",").map((f) => f.trim())
        : [],
      images: form.images ? form.images.split(",").map((img) => img.trim()) : [],
      location: form.location,
    };

    try {
      const response = await fetch(
        "https://travella-server-v2.onrender.com/api/carrentals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(carData),
        }
      );

      if (response.ok) {
        setShowAlert(true);
        setForm({
          provider: "",
          destination: "",
          carType: "",
          carModel: "",
          pricePerDay: "",
          features: "",
          images: "",
          location: "",
        });
        setTimeout(() => setShowAlert(false), 4000);
      } else {
        alert("Failed to add car rental!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="add-car-rental">
      <main className="main-content">
        <h1 className="page-title">Add New Car Rental</h1>
        <p className="subtitle">
          Fill in the details below to add a new car rental to the system.
        </p>

        {showAlert && (
          <div className="success-alert show">
            <span className="material-symbols-outlined">check_circle</span>
            Car rental added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="provider">Provider Name *</label>
            <input
              id="provider"
              type="text"
              placeholder="e.g. Hertz Rentals"
              value={form.provider}
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
              <label htmlFor="carType">Car Type *</label>
              <input
                id="carType"
                type="text"
                placeholder="e.g. SUV"
                value={form.carType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="carModel">Car Model *</label>
              <input
                id="carModel"
                type="text"
                placeholder="e.g. Toyota RAV4"
                value={form.carModel}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pricePerDay">Price per Day ($) *</label>
            <input
              id="pricePerDay"
              type="number"
              placeholder="e.g. 95"
              value={form.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Features (comma-separated)</label>
            <input
              id="features"
              type="text"
              placeholder="e.g. Air Conditioning, GPS, Bluetooth"
              value={form.features}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Image URLs (comma-separated)</label>
            <input
              id="images"
              type="text"
              placeholder="e.g. https://image1.jpg, https://image2.jpg"
              value={form.images}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Paris, France"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Add Car Rental"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCarRental;
