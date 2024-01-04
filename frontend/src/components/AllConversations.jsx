import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from './Navbar';
const socket = io('http://localhost:5000');

const AllConversations = ({ userId }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/conversations/${userId}`);
        setConversations(response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert('Failed to fetch conversations');
      }
    };

    fetchConversations();

    socket.on('newConversation', (newConversation) => {
      setConversations((prevConversations) => [...prevConversations, newConversation]);
    });

    return () => {
      socket.off('newConversation');
    };
  }, [userId]);

  return (
    <div>
        
      <h2>All Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.conversationId}>
            <p>Email: {conversation.user.email}</p>
            <p>Full Name: {conversation.user.fullName}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllConversations;
