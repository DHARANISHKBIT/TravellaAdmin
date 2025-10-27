import React from "react";
import "./Detinationcomponentcardcss.css";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ destination, onDelete, onEdit }) => {
  const navigate = useNavigate();

  // Navigate when the card (except buttons) is clicked
  const handleCardClick = () => {
    navigate("/Addplacefordestination", {
      state: {
        destinationId: destination.id,
        destinationName: destination.name,
        destinationImage: destination.image,
      },
    });
  };

  return (
    <div className="destination-card" onClick={handleCardClick}>
      <div
        className="destination-image"
        style={{ backgroundImage: `url(${destination.image})` }}
      ></div>

      <div className="destination-details">
        <p className="destination-name">{destination.name}</p>

        <div className="destination-location">
          <span className="material-symbols-outlined">location_on</span>
          <p>{destination.location}</p>
        </div>

        <p className="destination-description">{destination.description}</p>

        <div className="destination-actions">
          {/* ✅ Fixed Edit Button */}
          <button
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              onEdit(destination); // ✅ call the parent's edit handler
            }}
          >
            <span className="material-symbols-outlined">edit</span>Edit
          </button>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              onDelete(destination.id);
            }}
          >
            <span className="material-symbols-outlined">delete</span>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
