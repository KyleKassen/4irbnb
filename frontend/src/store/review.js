import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "review/loadUserReviews";
const LOAD_SPOT_REVIEWS = "review/loadSpot/Reviews";
const UPDATE_REVIEW = "review/updateReview";
const ADD_REVIEW = "review/addReview";
const DELETE_REVIEW = "review/deleteReview";

export const loadUserReviews = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    payload: reviews,
  };
};

export const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    payload: reviews,
  };
};

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review
    }
}

export const addReview = (review_spot_user) => {
    return {
        type: ADD_REVIEW,
        payload: review_spot_user
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}


// Thunk Action Creator for Loading User Reviews
export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadUserReviews(reviews));
        return reviews;
    }
}

// Thunk Action Creator for Loading Spot Reviews
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`).catch(async res => {
        const error = await res.json();
        if (error.message === "Spot couldn't be found") {
            dispatch(loadSpotReviews({}));
            return {}
        }
    });

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews));
        return reviews;
    }
}

// Thunk Action Creator for Updating Review
export const updateSpotReview = ({reviewId, review, stars}) => async dispatch => {
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

// Thunk Action Creator for Adding Review
export const createReview = ({review, spot, user}) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const createdReview = await response.json();
        dispatch(addReview({createdReview, spot, user}));
        return createdReview;
    }
}

// Thunk Action Creator for Deleting Review
export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const resObj = response.json();
        dispatch(deleteReview(reviewId));
        return resObj;
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
        if (Object.values(action.payload).length === 0) return { spot: {}, user: {...state.user}}
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

    case ADD_REVIEW:
        const addReviewsObj = { spot: {...state.spot}, user: {...state.user}};
        const addReview = action.payload.createdReview;
        const addReviewSpot = action.payload.spot;
        const addReviewUser = action.payload.user;

        addReviewsObj.user[addReview.id] = {...addReview, User:addReviewUser, Spot:addReviewSpot, ReviewImages: []};
        addReviewsObj.spot[addReview.id] = {...addReview, User:addReviewUser, ReviewImages: []};

        return addReviewsObj;

    case DELETE_REVIEW:
        const deleteReviewObj = { spot: {...state.spot}, user: {...state.user}};
        delete deleteReviewObj.spot[action.payload];
        delete deleteReviewObj.user[action.payload];

        return deleteReviewObj;

    default:
        return state;
  }
};
