import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spot";
import "./CreateSpotModal.css";

function CreateSpotForm({ setShowSpotModal }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  console.log("CreateSpotForm.js is running");
//   console.log("CreateSpotForm.js: errors.length is", errors.length);

  const handleSubmit = async (e) => {
    console.log("CreateSpotForm.js: HandleSubmit");
    e.preventDefault();

    // setErrors([]);
    let newLat = !lat ? 31.7683 : lat;
    let newLng = !lng ? 35.2137 : lng;
    const res = await dispatch(
      createSpot({
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        lat: newLat,
        lng: newLng,
        imgurl: previewImg,
      })
    ).catch(async (res) => {
      const data = await res.json();
      console.log("CreateSpotForm.js: errors caught");
      console.log("CreateSpotForm.js: data.errors, ", data.errors);
      if (data.errors) {
        setErrors(Object.values(data.errors));
    }
    });

    if (res) {
        history.push(`/place/${res.id}`);
        setShowSpotModal(false);
        console.log('Data is :', res)
    }
  };

  return (
    <div className="createspot_form_outer_wrapper">
      <p className="createspot_form_createspot_text">Become a Host</p>
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
            placeholder="Address"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude: Not Required"
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude: Not Required"
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            className="createspot_form_middle_input"
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            placeholder="Preview Image Url"
          />
          <input
            className="createspot_form_last_input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night"
            required
          />
          <button type="submit" id="createspot_form_button">
            Add your place
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSpotForm;
