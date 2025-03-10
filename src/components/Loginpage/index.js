import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // State for invalid credentials
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/");
  };

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");
    setLoginError(""); // Reset login error on new submit

    if (username.trim().length < 4) {
      setUsernameError("Username must be at least 4 characters long");
      isValid = false;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError(
        "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
      );
      isValid = false;
    }

    return isValid;
  };

  const onLoginSuccess = (jwtToken, id) => {
    if (!jwtToken) {
      console.error("No JWT token received, login failed.");
      return;
    }
    Cookies.set("jwt_token", jwtToken, { expires: 1 });
    Cookies.set("id", id, { expires: 1 });
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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

      if (response.ok) {
        onLoginSuccess(data.jwtToken, data.id);
      } else {
        setLoginError("Invalid username or password"); // Set error message on failure
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="heading">Log In</h1>

        {loginError && <p className="error-message">{loginError}</p>} {/* Display login error only once */}

        <label className="login-label">
          Username
          <input
            type="text"
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
          <button type="button" className="link-button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;


