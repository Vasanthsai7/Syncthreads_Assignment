import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./Auth.css";

const Register = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await register(userData.username, userData.password);
        console.log(response);
      if (response.status === 201) {
        
        navigate("/login"); // Redirect to login after successful registration
      } else {
        alert(response.message || "Registration failed"); // Show error in an alert
      }
    } catch (err) {
      alert("Error registering user. Try again."); // Show error in an alert
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
