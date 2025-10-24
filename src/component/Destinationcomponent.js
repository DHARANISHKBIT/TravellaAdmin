import React from "react";
import "./Detinationcomponentcardcss.css";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ destination, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="destination-card" onClick={() => navigate('/Addplacefordestination')}>
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
          <button className="edit-btn" >
            <span className="material-symbols-outlined">edit</span>Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(destination.id)}
          >
            <span className="material-symbols-outlined">delete</span>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
