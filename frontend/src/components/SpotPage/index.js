import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spot";
import "./SpotPage.css";

function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch]);

  return (
    <div>
      {spot && (
        <div className="spot_page_wrapper">
          <p>{spot.description}</p>
          <p><i class="fa-sharp fa-solid fa-star"></i>{spot.avgRating} · {spot.numReviews} reviews · Superhost · {spot.city}, {spot.state}, {spot.country}</p>
          <div className="spot_image_gallery_wrapper">

          </div>
        </div>
      )}
    </div>
  );
}

export default SpotPage;
