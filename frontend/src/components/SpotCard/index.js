import React from "react";
import './SpotCard.css';

function SpotCard({ spot }) {
  // console.log(props)
  // console.log('Spot card is running', props)
  return (
    <div className="spotcard_container">
      <div className="spotcard_image_container">
       <img src={spot.previewImage}/>
      </div>
      <p className="spotcard_name">{spot.name}</p>
      <p className="spotcard_address">{spot.address}</p>
      <p className="spotcard_price">{`$${spot.price} night`}</p>
    </div>
  );
}

export default SpotCard;
