import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import DoubtHistory from './DoubtHistory';

import Navbar from './Navbar';
const socket = io('http://localhost:5000');
const Home = () => {
  const [userId, setUserId] = useState('');
  const navigation = useNavigate();

  const handleLogin = () => {
    socket.emit('addUser', userId);
    navigation(`/dashboard/${userId}`);
  };

  return (
    <div>
       <Navbar />
      <h1>DoubtShare</h1>
      <label>
        Enter User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
      <DoubtHistory/>
    </div>
  );
};

export default Home;