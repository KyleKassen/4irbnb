import React from "react";
import { Link } from "react-router-dom";
import "./SpotCard.css";

function SpotCard({ spot }) {
  // console.log(props)
  let avgRating = "N/A"
  if (spot.avgRating) avgRating = spot.avgRating
  return (
    <div className="spotcard_container">
      <Link to={`/place/${spot.id}`}>
        <div className="spotcard_image_container">
          <img src={spot.previewImage} />
        </div>
        <div className="spotcard_location_rating_container">
        <p className="spotcard_location">
          {spot.city}, {spot.state}
        </p>
        <p><i class="fa-sharp fa-solid fa-star"></i> {avgRating}</p>
        </div>
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
