import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="logo">X</div>
          <div className="header-text">
            <h1>X-Shop</h1>
            <p>ONLINE SHOPING</p>
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
      </div>
    </div>
  );
};

export default Header;
