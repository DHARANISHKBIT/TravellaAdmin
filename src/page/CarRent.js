import React, { useState } from "react";
import "./CarRentstyle.css";

const AddCarRental = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="add-car-rental">
      {/* Sidebar */}
    

      {/* Main Content */}
      <main className="main-content">
        <h1>Add New Car Rental</h1>
        <p className="subtitle">
          Fill in the details below to add a new car rental to the system.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Provider Name</span>
            <input type="text" placeholder="e.g. Hertz" />
          </label>
          <label>
            <span>Car Type</span>
            <input type="text" placeholder="e.g. SUV" />
          </label>
          <label>
            <span>Car Model</span>
            <input type="text" placeholder="e.g. Toyota RAV4" />
          </label>
          <label>
            <span>Price per Day</span>
            <input type="number" placeholder="e.g. 50" />
          </label>
          <label style={{ gridColumn: "span 2" }}>
            <span>Location</span>
            <input type="text" placeholder="e.g. New York, NY" />
          </label>
          <button type="submit">Add Car Rental</button>
        </form>

        {showAlert && (
          <div className="success-alert show">
            <span className="material-symbols-outlined">check_circle</span>
            Car rental added successfully!
          </div>
        )}
      </main>
    </div>
  );
};

export default AddCarRental;
