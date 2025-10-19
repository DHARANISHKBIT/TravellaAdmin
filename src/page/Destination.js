import React, { useState } from "react";
import "./Destinationcss.css";

const AddDestination = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    destinationName: "",
    country: "",
    city: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.destinationName && form.country && form.city && form.description) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
          <div className="form-group">
            <label htmlFor="destinationName">Destination Name</label>
            <input
              id="destinationName"
              placeholder="Enter destination name"
              value={form.destinationName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                placeholder="Enter country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
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
