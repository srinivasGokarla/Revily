import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigate();

  const handleLogout = async () => {
    if (localStorage.getItem('authToken') !== null) {
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.clear();
        console.log('Successfully logged out', token);
        navigation('/');
      } else {
        console.error('Logout failed');
      }
    }
  };

  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split('/');
      if (localStorage.getItem('authToken') === null && homeCheck[3] === 'dashboard') {
        navigation('/'); 
      } else if (localStorage.getItem('authToken')) {
        const decodedToken = jwtDecode(localStorage.getItem('authToken'));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(localStorage.getItem('authToken'));
        }
      }
    };

    checkToken();
  }, [navigation]);

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
      <Link to="/chat">Chat</Link>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Navbar;
