import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spot";
import "./SearchResults.css";

function SearchResults() {
  const spots = useSelector((state) => state.spots.allSpots);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
      let url = new URL(window.location.href);
      const searchParams = url.searchParams;
      (async () => {
          const input = searchParams.get("input")
          const response = await dispatch(getAllSpots(input));
      })();

  }, [location])

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
    } else avgRating = "N/A";
  };
  return (
    <>
      <div className="search-page-outer-container">
        <div className="search-page-container">
          <div className="search-page-spots-container">
            <div className="search-page-spots-header">
                <p>{spots.order.length} homes</p>
            </div>
            {spots.order.length > 0 &&
              spots.order.map((spotId, idx) => {
                {
                  spot = spots[spotId];
                }
                {
                  calcRating(spot);
                }
                return (
                  <div key={idx} className="search-spot-outer-container">
                    <div className="search-spot-container">
                      <Link to={`/place/${spot.id}`}>
                        <div className="search-spot-image-container">
                          <img src={spot.previewImage} />
                        </div>
                        <div className="search-spot-location-rating-container">
                          <p className="search-spot-location">
                            {spot.city}, {spot.state}
                          </p>
                          <p className="search-spot-rating-info">
                            {/* <i class="fa-sharp fa-solid fa-star"></i>{" "} */}
                            <svg className="search-spot-star" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path></svg>
                            {avgRating} ({spot.reviewCount})
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
            <div id="map"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
