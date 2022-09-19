import React from "react";
import Navigation from "../Navigation";
import "./Header.css";

function Header({ isLoaded }) {
  return (
    <div className="main_header_flex_wrapper">
      <div className="main_header">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
        />
        <Navigation isLoaded={isLoaded} />
      </div>
    </div>
  );
}

export default Header;
