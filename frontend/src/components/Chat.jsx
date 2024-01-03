import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ userToken }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socketInstance = io('http://localhost:5000'); 

    setSocket(socketInstance);
    socketInstance.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('chat-message', { token: userToken, message: newMessage });
      setMessages((prevMessages) => [...prevMessages, { token: userToken, message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg.token}: {msg.message}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
