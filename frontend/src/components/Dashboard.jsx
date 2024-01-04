import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import '../App.css';
import io from 'socket.io-client';
import axios from 'axios';
import CreateDoubt from './CreateDoubt';
import CreateConversation from './CreateConversation';

import Navbar from './Navbar';
const socket = io('http://localhost:5000');

const Dashboard = () => {
  const[token,setToken] = useState('')
  const [doubts, setDoubts] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [ongoingSessions, setOngoingSessions] = useState([]);
  const [doubtHistory, setDoubtHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const navigation = useNavigate();
  const { userId } = useParams();

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
        console.log('Successfully logged out',token)
        navigation('/');
      } else {
        console.error('Logout failed');
      }
    }
  };

  useEffect(() => {
    socket.emit('getDoubtHistory');
    socket.on('getUsers', (users) => {
      setUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  



  return (
    <>
           <Navbar />
       <div className="container" >
      <h1>Welcome to Dashboard</h1>
      <h2>User ID: {userId}</h2>
      <button onClick={handleLogout}>Logout</button>
     
      <div className='grid'>
      
       <h3>Token:</h3>
       <p>{token}</p>
       <ul>
        {users.map((user) => (
          <li key={user.userId}>{user.userId}</li>
        ))}
      </ul>
      </div>
      
    </div>
    <CreateDoubt/>
    <CreateConversation/>
    </>
 
  );
};

export default Dashboard;

