import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import AddReviewForm from "./AddReviewForm";

function AddReviewModal({ spotId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const spot = useSelector((state) => state.spots.singleSpot);
  const ownerId = spot.Owner.id;

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button className="spot_reviews_addreview_button" onClick={() => handleClick()}>Add Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </div>
  );
}

export default AddReviewModal;
