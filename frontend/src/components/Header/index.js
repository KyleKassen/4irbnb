import React, {useState} from "react";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import CreateSpotModal from "../CreateSpotModal";
import "./Header.css";

function Header({ isLoaded }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="main_header_flex_wrapper">
      <div className="main_header">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
          />
        </Link>
        <div className="main_header_right_side">
          <CreateSpotModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
          <Navigation isLoaded={isLoaded} showModal={showLoginModal} setShowModal={setShowLoginModal}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
