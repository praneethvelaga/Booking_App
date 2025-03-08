import React, { useState } from "react"; 
import "./index.css";
import { useNavigate,Link } from "react-router-dom";

function Registration() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!mobileNumber.match(/^[0-9]{10}$/)) newErrors.mobileNumber = "Invalid Mobile Number";
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = "Invalid Email Address";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.match(/^(?=.*[A-Z])(?=.*\d).{6,}$/))
      newErrors.password = "Password must be 6+ chars with 1 uppercase & 1 number";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!pincode.match(/^[0-9]{6}$/)) newErrors.pincode = "Invalid Pincode";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) isValid = false;
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.log("Form validation failed");
      return; // Stop execution if form is invalid
    }
  
    console.log("Form Submitted Successfully");
  
    const url = "https://apsrtc-demo.onrender.com/register";
    const dataDetails = { fullName, mobileNumber, email, username, password, address, pincode };
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataDetails),
    };
  
    try {
      const response = await fetch(url, options);
      const data=await response.json()
      if (response.ok) {
        console.log(data)
        navigate('/login')
      }
      
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };
  

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 className="heading">Register</h1>

        <label className="signin-label">
          Full Name
          <input
            type="text"
            className="signin-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            required
          />
          <span className="error-message">{errors.fullName}</span>
        </label>

        <label className="signin-label">
          Mobile
          <input
            type="tel"
            className="signin-input"
            value={mobileNumber}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
          />
          <span className="error-message">{errors.mobileNumber}</span>
        </label>

        <label className="signin-label">
          Email
          <input
            type="email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <span className="error-message">{errors.email}</span>
        </label>

        <label className="signin-label">
          Username
          <input
            type="text"
            className="signin-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <span className="error-message">{errors.username}</span>
        </label>

        <label className="signin-label">
          Password
          <input
            type="password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <span className="error-message">{errors.password}</span>
        </label>

        <label className="signin-label">
          Confirm Password
          <input
            type="password"
            className="signin-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
          <span className="error-message">{errors.confirmPassword}</span>
        </label>

        <label className="signin-label">
          Address
          <input
            type="text"
            className="signin-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
          <span className="error-message">{errors.address}</span>
        </label>

        <label className="signin-label">
          Pincode
          <input
            type="text"
            className="signin-input"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            required
          />
          <span className="error-message">{errors.pincode}</span>
        </label>

        <button type="submit" className="signin-button">Register</button>

        <p>if you an APSRTC Employee<Link to='/employee-login'>Login here</Link></p>
        <div className="extra-links">
          <button type="button" className="link-button" onClick={() => navigate('/login')}>Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;