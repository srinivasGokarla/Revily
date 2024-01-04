import './App.css';
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import DoubtHistory from './components/DoubtHistory';
import CreateDoubt from './components/CreateDoubt'
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import AllConversations from './components/AllConversations';
import CreateConversation from './components/CreateConversation';



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
          <Route path="/home" element={<Home />} />
          <Route path="/doubt-history/:userId" element={<DoubtHistory  />} />
          <Route path="/doubt" element={<CreateDoubt  />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/conversation" element={<CreateConversation />} />
          <Route path="/all-coversation" element={<AllConversations />} />
          <Route
            path="/*"
            element={
              <Navigate
              to="/"
                />
            }
          />
              
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
