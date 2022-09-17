import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spot/loadSpots";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

// Thunk Action Creator for Getting all Spots
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots;
  }
};

const initialState = { allSpots: { order: null }, singleSpot: null };

export const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const loadObj = { ...state };
      const spots = action.payload;

      loadObj.allSpots = { ...state.allSpots, spots };

      return loadObj;
    default:
      return state;
  }
};

// All Spots included data/format
// {
//     "id": 1,
//     "ownerId": 1,
//     "address": "123 Disney Lane",
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 37.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy",
//     "description": "Place where web developers are created",
//     "price": 123,
//     "createdAt": "2021-11-19 20:39:36",
//     "updatedAt": "2021-11-19 20:39:36",
//     "avgRating": 4.5,
//     "previewImage": "image url"
// }

// Single Spot included data/format
// {
//     "id": 1,
//     "ownerId": 1,
//     "address": "123 Disney Lane",
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 37.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy",
//     "description": "Place where web developers are created",
//     "price": 123,
//     "createdAt": "2021-11-19 20:39:36",
//     "updatedAt": "2021-11-19 20:39:36" ,
//     "numReviews": 5,
//     "avgStarRating": 4.5,
//     "SpotImages": [
//       {
//         "id": 1,
//         "url": "image url",
//         "preview": true
//       },
//       {
//         "id": 2,
//         "url": "image url",
//         "preview": false
//       }
//     ],
//     "Owner": {
//       "id": 1,
//       "firstName": "John",
//       "lastName": "Smith"
//     }
//   }
