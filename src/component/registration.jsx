import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [employeeIDError, setEmployeeIDError] = useState("");
  const navigation = useNavigate();
  const handleLoginClick =()=>{
    navigation('/loginlink')
  }

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setDobError("");
    setPhoneError("");
    setGenderError("");
    setEmployeeIDError("");

    const namePattern = /^[a-zA-Z]+$/;
    if (!firstName.match(namePattern)) {
      setFirstNameError("Invalid first name");
      isValid = false;
    }

    if (!lastName.match(namePattern)) {
      setLastNameError("Invalid last name");
      isValid = false;
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!dob) {
      setDobError("Invalid date of birth");
      isValid = false;
    }

    if (gender === "") {
      setGenderError("Select gender");
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) {
      setPhoneError("Invalid phone number");
      isValid = false;
    }

    if (!employeeID) {
        setEmployeeIDError("Invalid employee ID");
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
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 className="heading">Register</h1>

        <div className="name-container">
          <label className="signin-label name">
            First Name
            <input
              type="text"
              name="firstName"
              className="signin-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
            <span className="error-message">{firstNameError}</span>
          </label>

          <label className="signin-label name">
            Last Name
            <input
              type="text"
              name="lastName"
              className="signin-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
            <span className="error-message">{lastNameError}</span>
          </label>
        </div>

        <div className="dob-gender-container">
          <label className="signin-label name">
            Date of Birth
            <input
              type="date"
              name="dob"
              className="signin-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <span className="error-message">{dobError}</span>
          </label>

          <label className="signin-label name">
            Gender
            <select
              name="gender"
              className="signin-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span className="error-message">{genderError}</span>
          </label>
        </div>

        <div className="phone-email-container">
            <label className="signin-label name">
            Email
            <input
                type="email"
                name="email"
                className="signin-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <span className="error-message">{emailError}</span>
            </label>

            <label className="signin-label name">
            Phone Number
            <input
                type="tel"
                name="phone"
                className="signin-input"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <span className="error-message">{phoneError}</span>
            </label>
        </div>
        <label className="signin-label">
            Employee ID
            <input
                type="text"
                name="employeeID"
                className="signin-input"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                placeholder="Enter your employee ID"
                required
            />
        </label>
        <span className="error-message">{employeeIDError}</span>
        <label className="signin-label">
          Password
          <input
            type="password"
            name="password"
            className="signin-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="error-message">{passwordError}</span>
        </label>

        <label className="signin-label">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            className="signin-input"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span className="error-message">{confirmPasswordError}</span>
        </label>

        <button type="submit" className="signin-button" onClick={handleLoginClick}>Register</button>

        <div className="extra-links">
          <button type="button" className="link-button" onClick={handleLoginClick}>Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
