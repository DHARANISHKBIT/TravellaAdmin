import React, { useState } from "react";
import "./PlacesForDestination.css";

const DestinationDetails = () => {
  const [places, setPlaces] = useState([
    {
      name: "Eiffel Tower",
      description: "Iconic wrought-iron lattice tower on the Champ de Mars.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    },
    {
      name: "Louvre Museum",
      description: "World's largest art museum and a historic monument.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Louvre_Museum_Wikimedia_Commons.jpg/800px-Louvre_Museum_Wikimedia_Commons.jpg",
    },
    {
      name: "Notre-Dame Cathedral",
      description: "Medieval Catholic cathedral on the Île de la Cité.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Notre-Dame_de_Paris_Wikimedia_Commons.jpg/800px-Notre-Dame_de_Paris_Wikimedia_Commons.jpg",
    },
    {
      name: "Arc de Triomphe",
      description: "Honors those who fought and died for France.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Arc_de_Triomphe_Wikimedia_Commons.jpg/800px-Arc_de_Triomphe_Wikimedia_Commons.jpg",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPlace({ name: "", description: "", image: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlace.name && newPlace.description && newPlace.image) {
      setPlaces((prev) => [...prev, newPlace]);
      handleCloseModal();
    }
  };

  return (
    <div className="destination-container">
      <div className="destination-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
          alt="Paris"
          className="destination-banner"
        />
        <div className="destination-info">
          <h1>Paris, France</h1>
          <p className="region">Europe</p>
          <p className="description">
            The capital of France, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.
          </p>
          <button className="add-place-btn" onClick={handleOpenModal}>
            + Add Place
          </button>
        </div>
      </div>

      <h2 className="places-title">Places in this Destination</h2>
      <div className="places-grid">
        {places.map((place, index) => (
          <div key={index} className="place-card">
            <img src={place.image} alt={place.name} className="place-image" />
            <h3>{place.name}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Place</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Place Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newPlace.name}
                  onChange={handleInputChange}
                  placeholder="Enter place name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={newPlace.description}
                  onChange={handleInputChange}
                  placeholder="Enter place description"
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newPlace.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;