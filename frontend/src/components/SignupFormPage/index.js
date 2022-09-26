import React from 'react';
import {useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";

function SignupFormModal({setShowSignupModal}) {
  console.log('test');
  const dispatch = useDispatch();

  const logInDemo = () => {
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}));
  }

  return (
    <>
      <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
      <button onClick={() => logInDemo()}>Log In Demo User</button>
    </>
  );
}

export default  SignupFormModal;
