import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import SpotCard from "../SpotCard";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div className="spots_container_flex_wrapper">
      <div className="spots_container">
        {allSpots.order.map((spotId) => {
          return <SpotCard spot={allSpots[spotId]} />;
        })}
      </div>
    </div>
  );
}

export default Spots;
