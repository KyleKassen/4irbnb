import React from "react";
import { Link } from "react-router-dom";
import "./SpotCard.css";

function SpotCard({ spot }) {
  // console.log(props)
  return (
    <div className="spotcard_container">
      <Link to={`/place/${spot.id}`}>
        <div className="spotcard_image_container">
          <img src={spot.previewImage} />
        </div>
        <p className="spotcard_location">
          {spot.city}, {spot.state}
        </p>
        <p className="spotcard_name">{spot.name}</p>
        <p className="spotcard_date">Date Coming Soon</p>
        <p className="spotcard_price">
          <span className="spotcard_price_bold">{`$${spot.price} `}</span>night
        </p>
      </Link>
    </div>
  );
}

export default SpotCard;
