import React, { useState } from 'react';
import axios from 'axios';

const CreateDoubt = ({ userToken, studentId }) => {
  const [subjectType, setSubjectType] = useState('');

  const handleCreateDoubt = async () => {
    try {
        const response = await axios.post(
            'http://localhost:5000/doubt/create-doubt',
            {  subjectType },
            {
              headers: {
                Authorization: `Bearer ${userToken}`, 
              },
            }
          );
      alert('Doubt created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Doubt</h2>
      <input
        type="text"
        placeholder="Subject Type"
        value={subjectType}
        onChange={(e) => setSubjectType(e.target.value)}
        required
      />
      <button onClick={handleCreateDoubt}>Create Doubt</button>
    </div>
  );
};

export default CreateDoubt;
