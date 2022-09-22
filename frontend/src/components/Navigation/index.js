import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from '../SignupFormPage';
import "./Navigation.css";

import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormPage/SignupForm";

function Navigation({ isLoaded, showModal, setShowModal }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  console.log("This is the sessionUser ", sessionUser);

  // const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal setShowModal={setShowModal} />
        <SignupFormModal setShowSignupModal={setShowSignupModal} />
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
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupForm setShowSignupModal={setShowSignupModal}/>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Navigation;
