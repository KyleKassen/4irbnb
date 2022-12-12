import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import UpdateSpotForm from "./UpdateSpotForm";

function UpdateSpotModal({ spotId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const ownerId = useSelector((state) => state.spots.singleSpot.Owner.id);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleHover = () => {
    
  }

  return (
    <>
      {sessionUser && ownerId === sessionUser.id && (
        <>
          <button className="spot_page_update_button" onClick={() => handleClick()} onHover={() => handleHover()}><span>UPDATE</span></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UpdateSpotForm setShowModal={setShowModal} spotId={spotId} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default UpdateSpotModal;
