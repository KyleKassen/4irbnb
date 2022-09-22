import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createReview} from "../../store/review";
import AddReviewModal from "../AddReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './SpotReviews.css';


function SpotReviews({spot}) {
    const spotReviews = useSelector(state => Object.values(state.reviews.spot));

    console.log(spotReviews)

    return (
        <>
        <AddReviewModal />
        {spotReviews.map(review => {
            return (
                <div className="spot_reviews_review_container">
                    <p>{review.review}</p>
                    <UpdateReviewModal reviewId={review.id} />
                </div>
            )
        })}
        </>
    );
}

export default SpotReviews;
