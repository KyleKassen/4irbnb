import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from "../../context/Modal";
import AddReviewForm from "./AddReviewForm";

function AddReviewModal({spotId}) {
    const sessionUser = useSelector((state) => state.session.user);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const ownerId = useSelector(state => state.spots.singleSpot.Owner.id);

    const handleClick = () => {
        setShowModal(true);
    }


    return (
        <>
        <button onClick={() => handleClick()}>UPDATE</button>
        {ownerId === sessionUser.id && showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <AddReviewForm setShowModal={setShowModal} spotId={spotId}/>
            </Modal>
        )}
        </>
    )
};


export default AddReviewModal;
