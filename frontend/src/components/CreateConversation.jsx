
import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from './Navbar';
const socket = io('http://localhost:5000'); 

const CreateConversation = ({ senderId }) => {
  const [receiverId, setReceiverId] = useState('');

  const handleCreateConversation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/conversation', {
        senderId,
        receiverId,
      });

      console.log(response.data);
      alert('Conversation created successfully');
      socket.emit('createConversation', { senderId, receiverId });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Failed to create conversation');
    }
  };

  return (
    <div>
       
      <h2>Create Conversation</h2>
      <label>
        Receiver ID:
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
        />
      </label>
      <br />
      <button onClick={handleCreateConversation}>Create Conversation</button>
    </div>
  );
};

export default CreateConversation;
