import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
  console.log("LoginForm running");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setHasSubmitted(true);
    console.log("LoginForm.js: handleSubmit RUNNING");
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        setHasSubmitted(false);
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  useEffect(() => {
    console.log("LoginForm.js: USEEFFECT RUNNING");
    if (sessionUser) {
      setShowModal(false);
    }
  }, [sessionUser, hasSubmitted]);

  return (
    <div className="login_form_outer_wrapper">
      <p className="login_form_login_text">Log In</p>
      <div className="login_form_wrapper">
      <p className="login_form_welcome_text">Welcome to 4irbnb</p>
        <form onSubmit={handleSubmit} className="login_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
            {/* Username or Email */}
            <div className="login_form_input_div">
            <input
              className="login_form_first_input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Username or Email"
              required
            />
            {/* Password */}
            <input
             className="login_form_last_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            </div>
          <button id="login_form_button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
