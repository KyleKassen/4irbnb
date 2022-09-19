import React from "react";
import './SpotCard.css';

function SpotCard({ spot }) {
  // console.log(props)
  // console.log('Spot card is running', props)
  return (
    <div className="spotcard_container">
      <img src={spot.previewImage}/>
      <p>{spot.name}</p>
      <p>{spot.address}</p>
      <p>{`$${spot.price} night`}</p>
    </div>
  );
}

export default SpotCard;
