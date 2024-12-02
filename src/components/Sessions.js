// src/components/Session.js
import React, { useState } from 'react';

const Session = () => {
  const [sessionName, setSessionName] = useState('DJ Session 1'); // Default session name
  const [status, setStatus] = useState(null); // For showing session status
  const [error, setError] = useState('');

  const handleStartSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/start-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionName, // Using the sessionName state
        }),
      });

      const result = await response.json();
      setStatus(`Session started: ${result.sessionName}`); // Display session name on success
      console.log('Session started:', result);
    } catch (error) {
      setError('Error starting session: ' + error.message);
      console.error('Error starting session:', error);
    }
  };

  return (
    <div>
      <h2>Start DJ Session</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Session Name: </label>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="Enter session name"
        />
      </div>

      <button onClick={handleStartSession}>Start Session</button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default Session;
