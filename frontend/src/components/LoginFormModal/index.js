import React from 'react';

function LoginFormModal({setShowModal}) {

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
    </>
  );
}

export default LoginFormModal;
