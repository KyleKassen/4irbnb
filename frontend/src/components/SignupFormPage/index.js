import React from 'react';

function SignupFormModal({setShowSignupModal}) {
  console.log('test');
  return (
    <>
      <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
    </>
  );
}

export default  SignupFormModal;
