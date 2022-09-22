import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "review/loadUserReviews";
const LOAD_SPOT_REVIEWS = "review/loadSpot/Reviews";
const ADD_REVIEW = "review/addReview";
const UPDATE_REVIEW = "review/updateReview";

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


// Thunk Action Creator for Loading User Reviews
export const getUserReviews = () => async dispatch => {
    console.log("review.js: getUserReviews Running")
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadUserReviews(reviews));
        return reviews;
    }
}

export const getSpotReviews = (spotId) => async dispatch => {
    console.log("review.js: getSpotReviews Running")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews));
        return reviews;
    }
}

const initialState = { spot: {}, user: {} };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REVIEWS:
      return { spot: { ...state.spot }, user: action.payload };

    case LOAD_SPOT_REVIEWS:
        return { spot: action.payload, user: {...state.user}}
    default:
        return state;
  }
};
