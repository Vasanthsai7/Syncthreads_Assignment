import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./Auth.css";

const Register = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await register(userData.username, userData.password);

      if (response.success) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login after successful registration
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError("Error registering user. Try again.");
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
