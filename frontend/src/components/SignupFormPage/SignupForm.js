import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm({ setShowSignupModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      setHasSubmitted(true);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        setHasSubmitted(false);

        if (data && data.errors) setErrors(Object.values(data.errors));
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  useEffect(() => {
    console.log("LoginForm.js: USEEFFECT RUNNING");
    if (sessionUser) {
      setShowSignupModal(false);
    }
  }, [sessionUser, hasSubmitted]);

  return (
    <div className="signup_form_outer_wrapper">
      <p className="signup_form_signup_text">Sign Up</p>
      <div className="signup_form_wrapper">
        <p className="signup_form_welcome_text">Welcome to 4irbnb</p>
        <form onSubmit={handleSubmit} className="signup_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
           className="signup_form_first_input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
          className="signup_form_middle_input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
          className="signup_form_middle_input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
          className="signup_form_middle_input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="signup_form_middle_input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className="signup_form_last_input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit" id="signup_form_button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
