import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar"

const CreateDoubt = () => {
  const [studentId, setStudentId] = useState(''); 
  const [doubtSubject, setDoubtSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [language, setLanguage] = useState('');
 

  const handleCreateDoubt = async () => {
    try {
      const response = await axios.post('http://localhost:5000/chat/doubt', {
        studentId,
        doubtSubject,
        classGrade,
        language,
      });

      console.log(response.data);
      alert('Doubt request created successfully');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Failed to create doubt request');
    }
  };


  return (
    <div>
    
      <div>
      <h2>Create Doubt</h2>
      <label>
        Doubt Subject:
        <input
          type="text"
          value={doubtSubject}
          onChange={(e) => setDoubtSubject(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Class Grade:
        <input
          type="text"
          value={classGrade}
          onChange={(e) => setClassGrade(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Language:
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
      </label>
      <br />
      <button onClick={handleCreateDoubt}>Create Doubt</button>
    </div>
    </div>
  );
};

export default CreateDoubt;
