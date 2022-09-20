import React from 'react';

function SignupFormModal({setShowSignupModal}) {

  return (
    <>
      <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
    </>
  );
}

export default  SignupFormModal;
