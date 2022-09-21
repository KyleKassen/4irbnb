import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import SpotCard from "../SpotCard";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  // const order = useSelector(state => state.spots.allSpots.order)
  const allSpots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    console.log("Get all spots running in SPOTS useEffect");
    dispatch(getAllSpots());
  }, [dispatch]);

  // console.log("allSpots.order is : ", allSpots.order);
  return (
    <div className="spots_container_flex_wrapper">
      <div className="spots_container">
        {allSpots.order.map((spotId) => {
          // console.log("allSpots[spotId] : ", allSpots[spotId]);
          return <SpotCard spot={allSpots[spotId]} />;
        })}
      </div>
    </div>
  );
}

export default Spots;
