import React, { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Assuming user is stored as a JSON string
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null); // Clear user state
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="logo">X</div>
          <div className="header-text">
            <h1>X-Shop</h1>
            <p>ONLINE SHOPPING</p>
          </div>
        </div>
        <ul className="navbar">
          <li className="nav-item">Home</li>
          <li className="nav-item">Men</li>
          <li className="nav-item">Women</li>
          <li className="nav-item">Unisex</li>
          <li className="nav-item">About</li>
          <li className="nav-item">Contact</li>
        </ul>
        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.fullname}</span> {/* Display user name */}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <a href="/login" className="auth-link">Login</a>
              <a href="/register" className="auth-link">Signup</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
