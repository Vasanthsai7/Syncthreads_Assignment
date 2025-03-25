import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="header">
      <Link to="/dashboard">
        <div className="logo-container">
          <img
            className="logo"
            src="https://res.cloudinary.com/duajungih/image/upload/v1742876308/gps-icon-logo-design-map-pointer-icon-pin-location-symbol-vector_aucdfi.jpg"
            alt="Logo"
          />
          <h1>MapView</h1>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
