import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import CreateSpotForm from "./CreateSpotForm";


function CreateSpotModal({showLoginModal, setShowLoginModal}) {
    const sessionUser = useSelector((state) => state.session.user);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSpotModal, setShowSpotModal] = useState(false);

    const handleClick = () => {

        setShowSpotModal(true);
        setShowLoginModal(true);

        if (!sessionUser) {
            setLoggedIn(false)
        } else setLoggedIn(true)
    }

    return (
        <>
        <button onClick={() => handleClick()}>Become a Host</button>
        {loggedIn && showSpotModal && (
            <Modal onClose={() => setShowSpotModal(false)}>
                <CreateSpotForm showSpotModal={showSpotModal} setShowSpotModal={setShowSpotModal}/>
            </Modal>
        )}
        {!loggedIn && showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
                <LoginForm showModal={showLoginModal} setShowModal={setShowLoginModal}/>
            </Modal>
        )}
        </>
    )
};


export default CreateSpotModal;
