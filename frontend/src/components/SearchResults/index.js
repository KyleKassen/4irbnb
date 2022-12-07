import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
                        <div className="spotcard_image_container">
                          <img src={spot.previewImage} />
                        </div>
                        <div className="spotcard_location_rating_container">
                          <p className="spotcard_location">
                            {spot.city}, {spot.state}
                          </p>
                          <p>
                            <i class="fa-sharp fa-solid fa-star"></i>{" "}
                            {avgRating}
                          </p>
                        </div>
                        <p className="spotcard_name">{spot.name}</p>
                        <p className="spotcard_date">Date Coming Soon</p>
                        <p className="spotcard_price">
                          <span className="spotcard_price_bold">{`$${spot.price} `}</span>
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
