// src/components/Follow.js
import React, { useState } from 'react';

const Follow = () => {
  const [djId, setDjId] = useState('12345'); // Example DJ ID (could be dynamic)
  const [status, setStatus] = useState(null); // For displaying follow status
  const [error, setError] = useState('');

  const handleFollowDJ = async () => {
    try {
      const response = await fetch('http://localhost:3000/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          djId, // Use state for DJ ID
        }),
      });

      const result = await response.json();
      setStatus(`Followed DJ with ID: ${result.djId}`);
      console.log('Followed DJ:', result);
    } catch (error) {
      setError('Error following DJ: ' + error.message);
      console.error('Error following DJ:', error);
    }
  };

  return (
    <div>
      <h2>Follow DJ</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>DJ ID: </label>
        <input
          type="text"
          value={djId}
          onChange={(e) => setDjId(e.target.value)}
          placeholder="Enter DJ ID"
        />
      </div>

      <button onClick={handleFollowDJ}>Follow DJ</button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default Follow;
