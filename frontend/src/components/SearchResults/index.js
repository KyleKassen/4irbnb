import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './SearchResults.css';

function SearchResults() {
  const spots = useSelector((state) => state.spots.allSpots);

  let avgRating = "N/A";
  let spot;

  const calcRating = (spot) => {
    if (spot.avgRating) {
      avgRating = spot.avgRating;
      avgRating = String(avgRating);
      if (avgRating.includes(".")) {
        let length = avgRating.split(".")[1].length;
        if (length > 2) avgRating = parseFloat(avgRating).toFixed(2);
      }
    }
  };
  return (
    <>
      <div className="search-page-outer-container">
        <div className="search-page-container">
          <div className="search-page-spots-container">
            {spots.order.length > 0 &&
              spots.order.map((spotId) => {
                {
                  spot = spots[spotId];
                }
                {
                  calcRating(spot);
                }
                return (
                  <div className="search-spot-outer-container">
                    <div className="search-spot-container">
                      <Link to={`/place/${spot.id}`}>
                        <div className="search-spot-image-container">
                          <img src={spot.previewImage} />
                        </div>
                        <div className="search-spot-location-rating-container">
                          <p className="search-spot-location">
                            {spot.city}, {spot.state}
                          </p>
                          <p>
                            <i class="fa-sharp fa-solid fa-star"></i>{" "}
                            {avgRating}
                          </p>
                        </div>
                        <p className="search-spot-name">{spot.name}</p>
                        <p className="search-spot-date">Date Coming Soon</p>
                        <p className="search-spot-price">
                          <span className="search-spot-price-bold">{`$${spot.price} `}</span>
                          night
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="search-page-maps-container">
            <p>hello</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
