import React, { useState } from "react";
import DestinationCard from "../component/Destinationcomponent.js";
import "./Destinationpagecss.css";
import { useNavigate } from "react-router-dom";
const DestinationsPage = () => {
    const navigate = useNavigate();
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Eiffel Tower",
      location: "Paris, France",
      description:
        "An iconic symbol of Paris, offering breathtaking views from its observation decks.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ1VsVrhgKQuREBq3b2nMvwIYrhFm6L6xlG6sORC4WN7_73kSmoZ-rJIMBh5Fze31yPbY3ttxYWO6mHFrIUkEcg_4PaGAvayIMEVQNl_ryGUEOi2DQUcx-NBzq8BqVQHFT-7YfTfqhw671kdNZJEoGM0qRdco6mvaMaQwOUP3Mgu-ymsPijrPzLK38bi7yFXv380XnLNEhrZL_bLLiZSC3uWUj3k6PD3YyvlgXho9Ejn9_Re8UXtpVVTSPrLOi2COUVTJ7cdRTl30L",
    },
    {
      id: 2,
      name: "Colosseum",
      location: "Rome, Italy",
      description:
        "The largest ancient amphitheater ever built, a testament to Roman engineering.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJYg3KaPxrphuCSpASi6tZq7XghaHQhh4knwUZ-ifFxNLtZeF11-vjhaVxdgmAyy0aBLDdTNcyTuEz0PPnihrfPxTqZA6yNiTaKuhdBDw6Y331bcWFAwSTuYABFdT8SBxBiElN4WGd4GNZQpNEGVz0j-cKCi9M3PoRCARb-xbOXtaao-U2rS0_xgPXwk2BQj9M9cQuLdH-hsBJR0Gn-UM_8KD2wU-FuRLn9qo8I-W7ywxw3j_ULp3Mj17cSBKxVt_LhQO41mErmJzn",
    },
    {
      id: 3,
      name: "Taj Mahal",
      location: "Agra, India",
      description:
        "A UNESCO World Heritage site and one of the most beautiful examples of Mughal architecture.",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    },
    {
      id: 1,
      name: "Eiffel Tower",
      location: "Paris, France",
      description:
        "An iconic symbol of Paris, offering breathtaking views from its observation decks.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ1VsVrhgKQuREBq3b2nMvwIYrhFm6L6xlG6sORC4WN7_73kSmoZ-rJIMBh5Fze31yPbY3ttxYWO6mHFrIUkEcg_4PaGAvayIMEVQNl_ryGUEOi2DQUcx-NBzq8BqVQHFT-7YfTfqhw671kdNZJEoGM0qRdco6mvaMaQwOUP3Mgu-ymsPijrPzLK38bi7yFXv380XnLNEhrZL_bLLiZSC3uWUj3k6PD3YyvlgXho9Ejn9_Re8UXtpVVTSPrLOi2COUVTJ7cdRTl30L",
    },
    {
      id: 2,
      name: "Colosseum",
      location: "Rome, Italy",
      description:
        "The largest ancient amphitheater ever built, a testament to Roman engineering.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJYg3KaPxrphuCSpASi6tZq7XghaHQhh4knwUZ-ifFxNLtZeF11-vjhaVxdgmAyy0aBLDdTNcyTuEz0PPnihrfPxTqZA6yNiTaKuhdBDw6Y331bcWFAwSTuYABFdT8SBxBiElN4WGd4GNZQpNEGVz0j-cKCi9M3PoRCARb-xbOXtaao-U2rS0_xgPXwk2BQj9M9cQuLdH-hsBJR0Gn-UM_8KD2wU-FuRLn9qo8I-W7ywxw3j_ULp3Mj17cSBKxVt_LhQO41mErmJzn",
    },
    {
      id: 3,
      name: "Taj Mahal",
      location: "Agra, India",
      description:
        "A UNESCO World Heritage site and one of the most beautiful examples of Mughal architecture.",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    },
  ]);

  // Example handler for future use
  

  const handleDelete = (id) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
  };

  return (
    <div className="destinations-page">
      <h1>Popular Destinations</h1>

     <div className="btn">
         <button className="adddestination-btn" onClick={() =>  navigate('/destination')}>
        <span className="material-symbols-outlined">add</span> Add Destination
      </button>
     </div>

      <div className="destination-list">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
