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

  return (
    <>
      <button onClick={() => handleClick()}>Update Review</button>
      {showModal && ownerId === sessionUser.id  (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm setShowModal={setShowModal} reviewId={reviewId} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
