import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  console.log("This is the sessionUser ", sessionUser);

  const [showModal, setShowModal] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        {/* <NavLink to="/login">Log In</NavLink> */}
        <LoginFormModal showModal={showModal} setShowModal={setShowModal} />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  let navLinks = (
    <ul>
      <li className="navlink_list">
        <NavLink exact to="/">
          Home
        </NavLink>
        {console.log("isLoaded is = ", isLoaded)}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );

  useEffect(() => {
    return;
  }, [showModal]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  return (
    <>
      <div className="dropdown_menu_wrapper">
        <button onClick={openMenu} className="nav_dropdown_button">
          <i className="fa-solid fa-bars hamburger_icon"></i>
          <i className="fa-solid fa-user user_icon"></i>
        </button>
        {showMenu && navLinks}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Navigation;
