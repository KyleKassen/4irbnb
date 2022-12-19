import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, removeReview } from "../../store/review";
import { getOneSpot } from "../../store/spot";
import AddReviewModal from "../AddReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import "./SpotReviews.css";

function SpotReviews({ spot }) {
  const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();


  const handleDelete = async (reviewId) => {
    await dispatch(removeReview(reviewId));
    dispatch(getOneSpot(spot.id));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="spot_reviews_total_add_container">
        {/* <div className="spot_reviews_star_reviews_container">

        </div> */}
        <p>
          <i className="fa-sharp fa-solid fa-star"></i> {spot.avgRating}
          <span>{` · ${spot.numReviews} reviews`}</span>
        </p>
        <AddReviewModal />
      </div>
      <div className="spot_reviews_all_reviews_container">
        {spotReviews.map((review) => {
          return (
            <div className="spot_reviews_review_container">
              <div className="spot_reviews_review_data_container">
                <div className="spot_reviews_ru_modify_container">
                  <div className="spot_reviews_review_user">
                    <img src="https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240" />
                    <div className="spot_reviews_review_user_time">
                      <p className="spot_reviews_review_data_name">
                        {review.User.firstName}
                      </p>
                      <p className="spot_reviews_review_data_date">
                        {months[parseInt(review.updatedAt.substr(5, 2))]}{" "}
                        {review.updatedAt.substr(0, 4)}
                      </p>
                    </div>
                  </div>
                    {sessionUser && review.userId === sessionUser.id && (
                      <div className="spot_reviews_modify_buttons">
                        <UpdateReviewModal reviewId={review.id} />
                        <button onClick={() => handleDelete(review.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                </div>
                <p className="spot_reviews_review_data_review">
                  {review.review}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SpotReviews;
