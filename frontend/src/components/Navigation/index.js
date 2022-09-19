import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  console.log("This is the sessionUser ", sessionUser);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  let navLinks = (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {console.log("isLoaded is = ", isLoaded)}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  return (
    <>
      <button onClick={openMenu} className="nav_dropdown">
        <i className="fa-solid fa-bars hamburger_icon"></i>
        <i className="fa-solid fa-user user_icon"></i>
      </button>
      {showMenu && navLinks}
    </>
  );
}

export default Navigation;
