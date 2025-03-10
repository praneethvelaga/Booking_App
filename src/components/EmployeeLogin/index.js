import { useState } from "react";
import "./index.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EmployeeLogin = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // State to store login error
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!empId.trim()) {
      newErrors.empId = "Employee ID is required";
    } else if (!/^[A-Za-z0-9]+$/.test(empId)) {
      newErrors.empId = "Employee ID must contain only letters and numbers";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setLoginError(""); // Reset login error

    if (!validateForm()) {
      console.log("Logging Failed");
      return;
    }

    const empDetails = { empId, password };
    const url = "https://apsrtc-demo.onrender.com/employee-login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.jwtToken, data.id);
      } else {
        setLoginError(data.message || "Invalid Employee ID or Password"); // Set login error message
      }
    } catch (error) {
      setLoginError("Request failed. Please try again.");
    }
  };

  return (
    <div className="emp-login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
          {errors.empId && <p className="error-message">{errors.empId}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        {loginError && <p className="error-message">{loginError}</p>} {/* Display login error */}

        <button
          type="submit"
          className="login-button"
          disabled={Object.keys(errors).length > 0}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;

