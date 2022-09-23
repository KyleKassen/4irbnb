import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, removeReview } from "../../store/review";
import AddReviewModal from "../AddReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import "./SpotReviews.css";

function SpotReviews({ spot }) {
  const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  console.log(spotReviews);

  const handleDelete = (reviewId) => {
    dispatch(removeReview(reviewId));
  };

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
      {spotReviews.map((review) => {
        return (
          <div className="spot_reviews_review_container">
            <p>{review.review}</p>
            {sessionUser && review.userId === sessionUser.id && (
              <div className="spot_reviews_modify_buttons">
                <UpdateReviewModal reviewId={review.id} />
                <button onClick={() => handleDelete(review.id)}>
                  Delete Review
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default SpotReviews;
