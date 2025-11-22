import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import styles to use the .navbar class

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/teams">Teams</Link>
        <Link to="/employees">Employees</Link>
      </div>
      <button
        onClick={handleLogout}
        style={{ background: "transparent", color: "red", border: "none" }}
      >
        Logout
      </button>
    </nav>
  );
}
