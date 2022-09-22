import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createReview} from "../../store/review";
import './SpotReviews.css';


function SpotReviews({spot}) {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const addReviewClick = () => {
        const previewImage = spot.SpotImages.filter(imgObj => imgObj.preview);
        const {id, ownerId, address, city, state, country, lat, lng, name, price} = spot;
        const User = {
            id: sessionUser.id,
            firstName: sessionUser.firstName,
            lastName: sessionUser.lastName
        };
        const Spot = {
            id,
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            previewImage
        }
        const dispatchReview = {
            review,
            stars
        }
        dispatch(createReview({
            review: dispatchReview,
            spot: Spot,
            user: User
        }))
    }

    return (
        <>
        <button onClick={() => addReviewClick()}>Add Review</button>
        </>
    );
}

export default SpotReviews;
