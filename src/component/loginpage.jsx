import React, { useState } from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigate();
  const handleRegisterClick=()=>{
    navigation('/registerlink')
  }
  const handleHomeClik=()=>{
    navigation('/homeLink')
  }

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError("Invalid email");
      isValid = false;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError("Password must be at least 6 characters, include 1 uppercase letter and 1 number");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="heading">Log In</h1>

        <label className="login-label">
          Email or Employee ID
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="Enter your email or employee ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <span className="error-message">{emailError}</span>

        <label className="login-label">
          Password
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="error-message">{passwordError}</span>
        </label>

        <button type="submit" className="login-button"onClick={handleHomeClik}>Login</button>

        <div className="extra-links">
          <button type="button" className="link-button" >Forgot Password?</button>
          <button type="button" className="link-button" onClick={handleRegisterClick}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
