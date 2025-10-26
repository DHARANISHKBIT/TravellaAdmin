import React, { useEffect, useState } from "react";
import DestinationCard from "../component/Destinationcomponent.js";
import "./Destinationpagecss.css";
import { useNavigate } from "react-router-dom";

const DestinationsPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 For Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDestination, setEditDestination] = useState({
    id: "",
    name: "",
    description: "",
    country: "",
    state: "",
    city: "",
    image: "",
    bestSeason: "",
  });

  // ✅ Fetch all destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "https://travella-server-v2.onrender.com/api/destinations"
        );
        if (!response.ok) throw new Error("Failed to fetch destinations");
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item._id,
          name: item.name,
          location: `${item.city}, ${item.country}`,
          description: item.description,
          image: item.images?.[0] || "",
          country: item.country,
          state: item.state,
          city: item.city,
          bestSeason: item.bestSeason || "",
        }));

        setDestinations(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // ✅ DELETE Destination
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("⚠️ Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        `https://travella-server-v2.onrender.com/api/destinations/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      setDestinations((prev) => prev.filter((d) => d.id !== id));
      alert("✅ Destination deleted successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ EDIT (Open Modal)
  const handleEdit = (destination) => {
    setEditDestination({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      country: destination.country,
      state: destination.state,
      city: destination.city,
      image: destination.image,
      bestSeason: destination.bestSeason,
    });
    setShowEditModal(true);
  };

  // ✅ UPDATE (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("⚠️ Please log in first.");
      return;
    }

    const updatedData = {
      name: editDestination.name,
      description: editDestination.description,
      country: editDestination.country,
      state: editDestination.state,
      city: editDestination.city,
      bestSeason: editDestination.bestSeason,
      images: [editDestination.image],
    };

    try {
      const response = await fetch(
        `https://travella-server-v2.onrender.com/api/destinations/${editDestination.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update");

      // Update local state
      setDestinations((prev) =>
        prev.map((dest) =>
          dest.id === editDestination.id
            ? { ...dest, ...updatedData, image: editDestination.image }
            : dest
        )
      );

      setShowEditModal(false);
      alert("✅ Destination updated successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading) return <div className="loading">Loading destinations...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="destinations-page">
      <h1>Popular Destinations</h1>

      <div className="btn">
        <button
          className="adddestination-btn"
          onClick={() => navigate("/destination")}
        >
          <span className="material-symbols-outlined">add</span> Add Destination
        </button>
      </div>

      <div className="destination-list">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onDelete={() => handleDelete(destination.id)}
              onEdit={() => handleEdit(destination)}
            />
          ))
        ) : (
          <p>No destinations available.</p>
        )}
      </div>

      {/* ✅ EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Destination</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                value={editDestination.name}
                onChange={(e) =>
                  setEditDestination({ ...editDestination, name: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={editDestination.description}
                onChange={(e) =>
                  setEditDestination({
                    ...editDestination,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={editDestination.country}
                onChange={(e) =>
                  setEditDestination({ ...editDestination, country: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="State"
                value={editDestination.state}
                onChange={(e) =>
                  setEditDestination({ ...editDestination, state: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={editDestination.city}
                onChange={(e) =>
                  setEditDestination({ ...editDestination, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Best Season"
                value={editDestination.bestSeason}
                onChange={(e) =>
                  setEditDestination({
                    ...editDestination,
                    bestSeason: e.target.value,
                  })
                }
              />
              <input
                type="url"
                placeholder="Image URL"
                value={editDestination.image}
                onChange={(e) =>
                  setEditDestination({ ...editDestination, image: e.target.value })
                }
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

export default DestinationsPage;
