import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from './Navbar';
import axios from 'axios';
import AllConversations from './AllConversations';

const Chat = ({ conversationId, senderId }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const initializeSocket = () => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    return newSocket;
  };

  useEffect(() => {
    const newSocket = initializeSocket();

    newSocket.emit('joinRoom', conversationId);

    newSocket.on('newMessage', ({ senderId, message }) => {
      setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
    });

    return () => {
      newSocket.emit('leaveRoom', conversationId);
      newSocket.off('newMessage');
    };
  }, [conversationId]);

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/chat/message', {
        conversationId,
        senderId,
        message,
      });
      setMessage('');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Chat</h2>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.senderId === senderId ? 'You: ' : 'Other User: '}
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
      <AllConversations />
    </div>
  );
};

export default Chat;
