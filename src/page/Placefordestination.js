import React, { useState, useEffect } from "react";
import "./PlacesForDestination.css";
import { useLocation, useNavigate } from "react-router-dom";

const DestinationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { destinationId, destinationName, destinationImage } = location.state || {};

  const [places, setPlaces] = useState([]);

  // 🟢 Fetch existing places for the selected destination
  useEffect(() => {
    if (destinationId) {
      fetch(`https://travella-server-v2.onrender.com/api/places/destination/${destinationId}`)
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .catch((err) => console.error("Error fetching places:", err));
    }
  }, [destinationId]);

  // ✅ Navigate to Add Place page
  const handleOpenplaceModel = () => {
    navigate("/Addplace", {
      state: {
        destinationId,
        destinationName,
        destinationImage,
      },
    });
  };

  return (
    <div className="destination-container">
      <div className="destination-header">
        <img
          src={
            destinationImage ||
            "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
          }
          alt={destinationName || "Destination"}
          className="destination-banner"
        />

        <div className="destination-info">
          <h1>{destinationName || "Destination Details"}</h1>
          <p className="description">Manage and view places for this destination.</p>
          <button className="add-place-btn" onClick={handleOpenplaceModel}>
            + Add Place
          </button>
        </div>
      </div>

      <h2 className="places-title">Places in this Destination</h2>
      <div className="places-grid">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className="place-card">
              <img
                src={place.image_url}
                alt={place.place_name}
                className="place-image"
              />
              <h3>{place.place_name}</h3>
              <p>{place.description}</p>
              <p>
                <b>Category:</b> {place.category}
              </p>
              <p>
                <b>Best Season:</b> {place.best_season}
              </p>
              <p>
                <b>Rating:</b> {place.rating}
              </p>
              <p>
                <b>Price:</b> ${place.price}
              </p>
            </div>
          ))
        ) : (
          <p>No places available for this destination.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;
