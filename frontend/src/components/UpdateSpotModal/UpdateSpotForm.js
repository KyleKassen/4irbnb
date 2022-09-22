import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateOneSpot } from "../../store/spot";
import "../CreateSpotModal/CreateSpotForm.css";

function UpdateSpotForm({setShowModal, spotId}) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spots.singleSpot);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log("UpdateSpotForm.js: HandleSubmit");
    e.preventDefault();
    // setErrors([]);
    // let newLat = !lat ? 31.7683 : lat;
    // let newLng = !lng ? 35.2137 : lng;
    console.log(`address is: ${address} and spot.address is ${spot.address}`)
    console.log(!address, "!address")
    const res = await dispatch(
      updateOneSpot({
        address: !address ? spot.address : address,
        city: !city ? spot.city : city,
        state: !state ? spot.state : state,
        country: !country ? spot.country : country,
        name: !name ? spot.name : name,
        description: !description ? spot.description : description,
        price: !price ? spot.price : price,
        lat: !lat ? spot.lat : lat,
        lng: !lng ? spot.lng : lng,
        // imgurl: !imgurl ? spot.imgurl : imgurl,
        // prevImgId
        id: spot.id
      })
    ).catch(async (res) => {
      const data = await res.json();
      console.log("UpdateSpotForm.js: errors caught");
      console.log("UpdateSpotForm.js: data.errors ", data.errors);
      if (data.errors) {
        setErrors(Object.values(data.errors));
    }
    });

    if (res) {
        // history.push(`/place/${res.id}`);
        setShowModal(false);
        console.log('Data is :', res)
    }
  };
  return (
    <div className="createspot_form_outer_wrapper">
      <p className="createspot_form_createspot_text">Update Listing</p>
      <div className="createspot_form_wrapper">
        <p className="createspot_form_welcome_text">
          We Need Some Info About Your Place
        </p>
        <form onSubmit={handleSubmit} className="createspot_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            className="createspot_form_first_input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={`Address: ${spot.address}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={`City: ${spot.city}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={`State: ${spot.state}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={`Country: ${spot.country}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Name: ${spot.name}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder={`Latitude: ${spot.lat}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder={`Longitude: ${spot.lng}`}
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Description: ${spot.description}`}
          />
          {/* <input
            className="createspot_form_middle_input"
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            placeholder={`Image Url: ${spot.imgurl}`}
          /> */}
          <input
            className="createspot_form_last_input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={`Price per night: ${spot.price}`}
          />
          <button type="submit" id="createspot_form_button">
            Update Your Place
          </button>
        </form>
      </div>
    </div>)
}

export default UpdateSpotForm;
