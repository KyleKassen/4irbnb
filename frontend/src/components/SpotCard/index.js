import React from "react";

function SpotCard({ spot }) {
  // console.log(props)
  // console.log('Spot card is running', props)
  return (
    <>
      <img src={spot.previewImage}/>
      <p>{spot.name}</p>
      <p>{spot.address}</p>
      <p>{`$${spot.price} night`}</p>
    </>
  );
}

export default SpotCard;
