import React, { useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteOneSpot } from "../../store/spot";
import UpdateSpotModal from "../UpdateSpotModal";
import { getUserReviews, getSpotReviews } from "../../store/review";
import SpotReviews from "../SpotReviews";
import "./SpotPage.css";

function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spots.singleSpot);
  const ownerId = spot ? spot.Owner.id : null;
  const blankImg = [];
  if (spot) {
    if (spot.SpotImages.length < 5) {
      const numImg = spot.SpotImages.length;
      for (let i = 0; i < 5 - numImg; i++) {
        blankImg.push(
          <img
            className="spot_page_gallery_image"
            src="https://archive.org/download/no-photo-available/no-photo-available.png"
          />
        );
      }
    }
  }

  const deleteSpotClick = () => {
    dispatch(deleteOneSpot(spot.id));
    history.replace("/");
  };

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getSpotReviews(id));
  }, [dispatch]);

  return (
    <div>
      {spot && (
        <div className="spot_page_flex_container">
          <div className="spot_page_container">
            <p className="spot_page_description">{spot.description}</p>
            <p className="spot_page_under_desc">
              <i className="fa-sharp fa-solid fa-star"></i>
              {spot.avgRating} · {spot.numReviews} reviews · Superhost ·{" "}
              {spot.city}, {spot.state}, {spot.country}
            </p>
            <div className="spot_image_gallery_wrapper">
              {spot.SpotImages.map((spotObj) => {
                if (spotObj.preview) {
                  return (
                    <img
                      className="spot_page_gallery_preview_image"
                      src={spotObj.url}
                    />
                  );
                }
                return (
                  <img className="spot_page_gallery_image" src={spotObj.url} />
                );
              })}
              {blankImg.length > 0 && blankImg.map((img) => img)}
            </div>
            <div className="spot_page_info_reserve_container">
              <div className="spot_page_info_container">
                <div className="spot_page_info_name_host_container">
                  <p>
                    {spot.name} hosted by {spot.Owner.firstName}
                  </p>
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
                </div>
              </div>
              <div className="spot_page_reserve_container">
                <div className="spot_page_reserve_price_reviews">
                  <p>
                    <span className="spot_page_price">{`$${spot.price}`}</span> night
                  </p>
                  <p>
                    <i className="fa-sharp fa-solid fa-star"></i>{" "}
                    {spot.avgRating}
                    <span>{` · ${spot.numReviews} reviews`}</span>
                  </p>
                </div>
                {sessionUser && sessionUser.id === ownerId && (
                  <div className="spot_page_updel_button_container">
                    <UpdateSpotModal spotId={id} />
                    <button className="spot_page_delete_button" onClick={() => deleteSpotClick()}>DELETE</button>
                  </div>
                )}
                <div className="spot_page_charges_container">
                  <div className="spot_page_xprice"><p></p><p></p></div>
                  <div className="spot_page_discount"><p></p><p></p></div>
                  <div className="spot_page_cleaning"><p></p><p></p></div>
                  <div className="spot_page_service"><p></p><p></p></div>
                  <div className="spot_page_total"><p></p><p></p></div>
                </div>
              </div>
            </div>
            <div className="spot_page_reviews_container">
              <SpotReviews spot={spot} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotPage;
