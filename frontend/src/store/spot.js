import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spot/loadSpots";
const ADD_SPOT = "spot/addSpot";
const UPDATE_SPOT = "spot/updateSpot";

export const loadSpots = (spots) => {
  console.log("Loading All Spots");
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

export const addSpot = (spot) => {
  console.log("addSpot Action Creator Invoked");
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

export const updateSpot = (spot) => {
  console.log("updateSpot Action Creator Invoked");
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

// Thunk Action Creator for Getting all Spots
export const getAllSpots = () => async (dispatch) => {
  console.log("GETTING ALL SPOTS FROM SERVER");
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    console.log("SERVER RESPONDED CORRECTLY, DISPATCHING TO loadSpots");
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots;
  }
};

// Thunk Action Creator for Adding a Spot
export const createSpot = (spot) => async (dispatch) => {
  console.log("POSTING/CREATING SPOT TO DATABASE");
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    console.log("RESPONSE FROM SERVER IS OK DURING SPOT CREATION");
    const returnedSpot = await response.json();
    dispatch(addSpot(returnedSpot));
    return returnedSpot;
  }

  // Test with the following fetch in browser
  // window.store.dispatch(
  //   window.spotActions.createSpot({
  //     address: "123 Disney Lane",
  //     city: "San Francisco",
  //     state: "California",
  //     country: "United States of America",
  //     lat: 37.7645358,
  //     lng: -122.4730327,
  //     name: "App Academy",
  //     description: "Place where web developers are created",
  //     price: 123,
  //   })
  // );
};

export const updateOneSpot = (spot) => async (dispatch) => {
  console.log("PUT/UPDATING SPOT IN DATABASE");
  const { address, city, state, country, lat, lng, name, description, price } =
    spot;
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });

  if (response.ok) {
    console.log("RESPONSE FROM SERVER IS OK WHEN UPDATING SPOT");
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  }
};

const initialState = { allSpots: { order: [] }, singleSpot: null };

export const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const loadObj = { ...state };
      const spotsArray = action.payload.Spots;
      const spots = {};

      // Normalize data and add to order array
      state.allSpots.order = [];
      spotsArray.forEach((spot) => {
        spots[spot.id] = spot;
        state.allSpots.order.push(spot.id);
      });
      loadObj.allSpots = { ...state.allSpots, ...spots };

      return loadObj;

    case ADD_SPOT:
      const addObj = { ...state };

      addObj.allSpots = { ...state.allSpots };
      addObj.order = [...state.allSpots.order];
      addObj.allSpots[action.payload.id] = action.payload;
      addObj.order.push(action.payload.id);

      return addObj;

    case UPDATE_SPOT:
      const updateObj = { ...state };

      updateObj.allSpots = { ...state.allSpots };
      updateObj.allSpots[action.payload.id] = action.payload;

      return updateObj;
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
