import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, handleLogout }) => {
  return (
    <div className="navbar">
      {username ? (
        <span>
          <span className="header">Hello, {username}!</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </span>
      ) : (
        <Link to="/">Login</Link>
      )}
      <Link to="/signup">Sign Up</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-doubt">Create Doubt</Link>
      <Link to="/doubt-history">Doubt History</Link>
    </div>
  );
};

export default Navbar;
