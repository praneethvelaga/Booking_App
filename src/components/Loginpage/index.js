import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/");
  };

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");

    // Username validation (at least 4 characters)
    if (username.trim().length < 4) {
      setUsernameError("Username must be at least 4 characters long");
      isValid = false;
    }

    // Password validation (1 uppercase letter, 1 number, min 6 chars)
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError(
        "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
      );
      isValid = false;
    }

    return isValid;
  };

  const onLoginSuccess = (jwtToken,id) => {
    console.log("JWT Token received:", jwtToken);
    if (!jwtToken) {
      console.error("No JWT token received, login failed.");
      return;
    }
    Cookies.set("jwt_token", jwtToken, { expires: 1 });
    Cookies.set("id", id, { expires: 1 });
    console.log("Navigating to /home...");
    navigate("/home");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    console.log("Form submitted");

    const userDetails = { username, password };
    const url = "https://apsrtc-demo.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log("Response:", response.status, data);

      if (response.ok) {
        console.log(data)
        onLoginSuccess(data.jwtToken,data.id)
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="heading">Log In</h1>

        <label className="login-label">
          Username
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <span className="error-message">{usernameError}</span>

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
        </label>
        <span className="error-message">{passwordError}</span>

        <button type="submit" className="login-button">
          Login
        </button>

        <div className="extra-links">
          <button type="button" className="link-button">
            Forgot Password?
          </button>
          <button
            type="button"
            className="link-button"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
