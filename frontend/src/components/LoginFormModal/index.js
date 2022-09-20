import React, { useState } from 'react';

function LoginFormModal({showModal, setShowModal}) {


  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
    </>
  );
}

export default LoginFormModal;
