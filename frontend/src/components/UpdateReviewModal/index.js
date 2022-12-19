import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import UpdateReviewForm from "./UpdateReviewForm";

function UpdateReviewModal({ reviewId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const review = useSelector((state) => state.reviews.spot[reviewId]);
  const ownerId = review.userId;

  const handleClick = () => {
    setShowModal(true);
  };
  const showIt = showModal && (ownerId === sessionUser.id);

  return (
    <>
      <button onClick={() => handleClick()}>Modify</button>
      {showIt &&  (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm setShowModal={setShowModal} reviewId={reviewId} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
