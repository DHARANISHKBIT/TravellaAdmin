import React, { useEffect, useState } from "react";
import "./CarRentalsPage.css";
import { useNavigate } from "react-router-dom";

const CarRentalsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCar, setEditCar] = useState({
    id: "",
    provider: "",
    carType: "",
    carModel: "",
    pricePerDay: "",
    location: "",
  });

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("⚠️ Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://travella-server-v2.onrender.com/api/carrentals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch car rentals");
        const data = await res.json();

        const formatted = data.map((c) => ({
          id: c._id,
          provider: c.provider,
          carType: c.carType,
          carModel: c.carModel,
          pricePerDay: c.pricePerDay,
          location: c.location,
        }));

        setCars(formatted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Delete car
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    const token = localStorage.getItem("authToken");
    if (!token) return alert("⚠️ Please log in first.");

    try {
      const res = await fetch(`https://travella-server-v2.onrender.com/api/carrentals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete car");

      setCars((prev) => prev.filter((car) => car.id !== id));
      alert("✅ Car deleted successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Open Edit Modal
  const handleEdit = (car) => {
    setEditCar({ ...car });
    setShowEditModal(true);
  };

  // Update Car (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) return alert("⚠️ Please log in first.");

    const updatedData = {
      provider: editCar.provider,
      carType: editCar.carType,
      carModel: editCar.carModel,
      pricePerDay: Number(editCar.pricePerDay),
      location: editCar.location,
    };

    try {
      const res = await fetch(
        `https://travella-server-v2.onrender.com/api/carrentals/${editCar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update car");

      setCars((prev) =>
        prev.map((c) => (c.id === editCar.id ? { ...c, ...updatedData } : c))
      );

      setShowEditModal(false);
      alert("✅ Car updated successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="cars-page">
      <h1>Car Rentals</h1>

      <div className="btn">
        <button className="add-car-btn" onClick={() => navigate("/car-rent")}>
          <span className="material-symbols-outlined">add</span> Add Car
        </button>
      </div>

      <div className="car-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
                 <img
                src={
                  car.image ||
                  "https://cdn-icons-png.flaticon.com/512/201/201623.png"
                }
                alt={car.name}
                className="hotel-img"
              />
              <h3>{car.provider}</h3>
              <p>🚗 {car.carModel} ({car.carType})</p>
              <p>📍 {car.location}</p>
              <p>💰 ${car.pricePerDay} / day</p>

              <div className="car-actions">
                <button onClick={() => handleEdit(car)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(car.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Car Rental</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Provider"
                value={editCar.provider}
                onChange={(e) =>
                  setEditCar({ ...editCar, provider: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Car Type"
                value={editCar.carType}
                onChange={(e) =>
                  setEditCar({ ...editCar, carType: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Car Model"
                value={editCar.carModel}
                onChange={(e) =>
                  setEditCar({ ...editCar, carModel: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price Per Day"
                value={editCar.pricePerDay}
                onChange={(e) =>
                  setEditCar({ ...editCar, pricePerDay: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={editCar.location}
                onChange={(e) =>
                  setEditCar({ ...editCar, location: e.target.value })
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

export default CarRentalsPage;
