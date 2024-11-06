// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/register">Register Business</Link></li>
        <li className="nav-item"><Link to="/login">Business Login</Link></li>
        <li className="nav-item"><Link to="/feedback">Submit Feedback</Link></li>
        <li className="nav-item"><Link to="/support">Support</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
