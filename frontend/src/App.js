import './App.css';
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import DoubtHistory from './components/DoubtHistory';
import CreateDoubt from './components/CreateDoubt'
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';



function App() {
  const [doubts, setDoubts] = useState([]);
  const [username, setUsername] = useState('');
  const [studentId, setStudentId] = useState('');

  const authToken = !!localStorage.getItem('authToken');


  

  return (
    <div className="App">
  
     <BrowserRouter>
  
        <Routes>
         
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-doubt" element={<CreateDoubt />} />
          <Route path="/doubt-history" element={<DoubtHistory  />} />
          <Route
            path="/*"
            element={
              <Navigate
                to={username ? '/dashboard' : '/'}
                />
            }
          />
              
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
