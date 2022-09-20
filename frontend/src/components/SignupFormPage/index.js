import React from 'react';

function SignupFormModal({showSignupModal, setShowSignupModal}) {

  return (
    <>
      <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
    </>
  );
}

export default  SignupFormModal;
