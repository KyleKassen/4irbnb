import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "review/loadUserReviews";
const LOAD_SPOT_REVIEWS = "review/loadSpot/Reviews";
const UPDATE_REVIEW = "review/updateReview";
const ADD_REVIEW = "review/addReview";

export const loadUserReviews = (reviews) => {
  console.log("Loading User Reviews");
  return {
    type: LOAD_USER_REVIEWS,
    payload: reviews,
  };
};

export const loadSpotReviews = (reviews) => {
  console.log("Loading Spot Reviews");
  return {
    type: LOAD_SPOT_REVIEWS,
    payload: reviews,
  };
};

export const updateReview = (review) => {
    console.log("Updating Review");
    return {
        type: UPDATE_REVIEW,
        payload: review
    }
}


// Thunk Action Creator for Loading User Reviews
export const getUserReviews = () => async dispatch => {
    console.log("review.js: getUserReviews Running")
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const reviews = await response.json();
        console.log("review.js: getUserReviews reviewsObj: ", reviews);
        dispatch(loadUserReviews(reviews));
        return reviews;
    }
}

// Thunk Action Creator for Loading Spot Reviews
export const getSpotReviews = (spotId) => async dispatch => {
    console.log("review.js: getSpotReviews Running")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews));
        return reviews;
    }
}

// Thunk Action Creator for Updating Review
export const updateSpotReview = ({reviewId, review, stars}) => async dispatch => {
    console.log("review.js: updateSpotReview running");
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            review,
            stars
        })
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReview(updatedReview));
        return updatedReview;
    }
}

const initialState = { spot: {}, user: {} };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REVIEWS:
        const userReviewsObj = {}
        action.payload.Reviews.forEach(review => userReviewsObj[review.id] = review);
      return { spot: { ...state.spot }, user: userReviewsObj };

    case LOAD_SPOT_REVIEWS:
        const spotReviewsObj = {}
        action.payload.Reviews.forEach(review => spotReviewsObj[review.id] = review);
        return { spot: spotReviewsObj, user: {...state.user}};

    case UPDATE_REVIEW:
        const updateReviewsObj = { spot: {...state.spot}, user: {...state.user}};
        updateReviewsObj.spot[action.payload.id].review = action.payload.review;
        updateReviewsObj.spot[action.payload.id].stars = action.payload.stars;
        updateReviewsObj.user[action.payload.id].review = action.payload.review;
        updateReviewsObj.user[action.payload.id].stars = action.payload.stars;
        return updateReviewsObj;
    default:
        return state;
  }
};