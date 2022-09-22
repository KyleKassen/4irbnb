import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createReview, removeReview} from "../../store/review";
import AddReviewModal from "../AddReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './SpotReviews.css';


function SpotReviews({spot}) {
    const spotReviews = useSelector(state => Object.values(state.reviews.spot));

    const dispatch = useDispatch();

    console.log(spotReviews)

    const handleDelete = (reviewId) => {
        dispatch()
    }

    return (
        <>
        <AddReviewModal />
        {spotReviews.map(review => {
            return (
                <div className="spot_reviews_review_container">
                    <p>{review.review}</p>
                    <UpdateReviewModal reviewId={review.id} />
                    <button onClick={() => handleDelete(review.id)}>Delete Review</button>
                </div>
            )
        })}
        </>
    );
}

export default SpotReviews;
