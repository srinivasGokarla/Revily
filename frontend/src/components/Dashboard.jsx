import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

import Navbar from './Navbar';


const Dashboard = ({ userToken}) => {
  const[token,setToken] = useState('')
  const [username, setUsername] = useState('');
  const [doubts, setDoubts] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [ongoingSessions, setOngoingSessions] = useState([]);
  const [doubtHistory, setDoubtHistory] = useState([]);
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
        console.log('Successfully logged out',token)
        navigation('/');
      } else {
        console.error('Logout failed');
      }
    }
  };
  useEffect(() => {
    fetchOngoingSessions();
    fetchDoubtHistory();
  }, []);
  const fetchOngoingSessions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sessions/ongoing');
      setOngoingSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching ongoing sessions:', error.message);
    }
  };

  const fetchDoubtHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doubt/doubt-history');
      setDoubtHistory(response.data.doubtHistory);
    } catch (error) {
      console.error('Error fetching doubt history:', error.message);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split("/");
      if (localStorage.getItem('authToken') === null && homeCheck[3] === "dashboard") {
        navigation('/');
      } else if (localStorage.getItem("authToken")) {
        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        const expirationTime = decodedToken.exp * 1000; 
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(localStorage.getItem("authToken"));
        }
      }
    };

    checkToken();
  }, [navigation]);
  
  const handleCreateDoubt = async (subjectType) => {
    try {
      await axios.post('http://localhost:5000/create-doubt', { studentId, subjectType });
      alert('Doubt created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoubtHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doubt-history/${studentId}`);
      setDoubts(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
       <Navbar username={username} handleLogout={handleLogout} />
       <div className="container" >
      <h1>Welcome to HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
     
      <div className='grid'>
      
       <h3>Token:</h3>
       <p>{token}</p>
       <div>
      <h2>Student Dashboard</h2>

      <section>
        <h3>Ongoing Sessions</h3>
        {ongoingSessions.length === 0 ? (
          <p>No ongoing sessions</p>
        ) : (
          <ul>
            {ongoingSessions.map((session) => (
              <li key={session.id}>
                Session ID: {session.id}, Tutor: {session.tutorName}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Doubt History</h3>
        {doubtHistory.length === 0 ? (
          <p>No doubt history</p>
        ) : (
          <ul>
            {doubtHistory.map((doubt) => (
              <li key={doubt.id}>
                Doubt ID: {doubt.id}, Subject: {doubt.subject}, Status: {doubt.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
      </div>
      
    </div>
    </>
 
  );
};

export default Dashboard;

