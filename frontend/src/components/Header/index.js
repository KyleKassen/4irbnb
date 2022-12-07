import React, { useState } from "react";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import CreateSpotModal from "../CreateSpotModal";
import "./Header.css";

function Header({ isLoaded }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="main_header_flex_wrapper">
      <div className="main_header">
        <Link to="/">
          <img className="logo" src="https://i.ibb.co/mB0RYJx/4irbnb-1.png" />
        </Link>
        <div className="header-search-container">
          <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Start your search"
          />
          <button><i></i></button>
          </div>
        </div>
        <div className="main_header_right_side">
          <CreateSpotModal
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
          <Navigation
            isLoaded={isLoaded}
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
