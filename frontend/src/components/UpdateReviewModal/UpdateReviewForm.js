import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../store/review";
import { updateSpotReview } from "../../store/review";
import { Redirect } from "react-router-dom";
import "../AddReviewModal/AddReviewForm.css";

function UpdateReviewForm({ setShowModal, reviewId }) {
  console.log("AddReviewForm running");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  //   const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      updateSpotReview({
        reviewId,
        review,
        stars: parseInt(stars),
      })
    ).catch(async (res) => {
      const data = await res.json();
      console.log("UpdateSpotForm.js: errors caught");
      console.log("UpdateSpotForm.js: data.errors, ", data);
      if (data.errors) {
        setErrors(Object.values(data.errors));
      }
    });

    if (res) {
      setShowModal(false);
    }
  };

  return (
    <div className="addreview_form_outer_wrapper">
      <p className="addreview_form_login_text">Update Review</p>
      <div className="addreview_form_wrapper">
        {/* <p className="addreview_form_welcome_text">Welcome to 4irbnb</p> */}
        <form onSubmit={handleSubmit} className="addreview_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          {/* Username or Email */}
          <div className="addreview_form_input_div">
            <input
              className="addreview_form_first_input"
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Review"
              required
            />
            {/* Password */}
            <input
              className="addreview_form_last_input"
              type="text"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              placeholder="Stars: 1-5"
              required
            />
          </div>
          <button id="addreview_form_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateReviewForm;
