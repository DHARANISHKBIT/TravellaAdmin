import React, { useState } from "react";
import "./Hotelstyle.css";

const AddHotel = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowAlert(true);
      e.target.reset();

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }, 2000); // Simulate network request
  };

  return (
    <div className="add-hotel">
      {/* Sidebar */}
  

      {/* Main Content */}
      <main className="main-content">
        <h1>Add New Hotel</h1>
        <p className="subtitle">
          Fill in the details below to add a new hotel to the system.
        </p>

        {showAlert && (
          <div className="success-alert show">
            <span className="material-symbols-outlined">check_circle</span>
            Hotel added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <label>
            <span>Hotel Name</span>
            <input type="text" placeholder="Enter hotel name" required />
          </label>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <label style={{ flex: 1 }}>
              <span>City</span>
              <input type="text" placeholder="Enter city" required />
            </label>
            <label style={{ flex: 1 }}>
              <span>Country</span>
              <input type="text" placeholder="Enter country" required />
            </label>
          </div>

          <label className="price-wrapper">
            <span>$</span>
            <input
              type="number"
              placeholder="0.00"
              required
              style={{ paddingLeft: "32px" }}
            />
          </label>

          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Add Hotel"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddHotel;
