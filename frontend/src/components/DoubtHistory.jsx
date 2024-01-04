
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from './Navbar';

const socket = io('http://localhost:5000');

const DoubtHistory = () => {
  const { userId } = useParams();
  const [doubtHistory, setDoubtHistory] = useState([]);
  useEffect(() => {
    socket.on('receiveDoubtHistory', (history) => {
      setDoubtHistory(history);
    });

    socket.emit('getDoubtHistory');

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
    
      <h2>Doubt History</h2>
      <h2>User ID: {userId}</h2>
      <ul>
        {doubtHistory.map((entry, index) => (
          <li key={index}>
            {entry.timestamp}: {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoubtHistory;