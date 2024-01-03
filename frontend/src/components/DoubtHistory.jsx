import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoubtHistory = ({ userToken}) => {
  const [doubtHistory, setDoubtHistory] = useState([]);

  useEffect(() => {
    const fetchDoubtHistory = async () => {
      try {
        const studentId = localStorage.getItem('userId');
        const response = await axios.get('http://localhost:5000/doubt/doubt-history', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          }
        });
        setDoubtHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoubtHistory();
  }, [userToken]);

  return (
    <div>
      <h2>Doubt History</h2>
      <section>

        <h3>All Doubts</h3>
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
  );
};

export default DoubtHistory;
