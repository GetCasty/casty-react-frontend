import React, { useState } from 'react';
// Correct AWS Amplify Imports
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import '@aws-amplify/api-graphql';
import awsExports from '../../aws-exports';
import { startDJSession, endDJSession } from '../../graphql/mutations';

// Configure AWS Amplify
Amplify.configure(awsExports);

// Create a client for API requests
const client = generateClient();

const DJSessionPage = () => {
  const [djName, setDJName] = useState(''); 
  const [playlistID, setPlaylistID] = useState(''); 
  const [session, setSession] = useState(null); 

  // Start DJ Session
  const handleStartSession = async () => {
    try {
      console.log("Starting session with:", { djName, playlistID });

      const response = await client.graphql({
        query: startDJSession,
        variables: { djName, playlistID },
      });

      const newSession = response.data.startDJSession;
      console.log("Session started:", newSession);

      setSession(newSession); 
      alert('DJ session started!');
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Error starting session. Please check your inputs and try again.');
    }
  };

  // End DJ Session
  const handleEndSession = async () => {
    if (!session) {
      alert('No active session to end.');
      return;
    }

    try {
      await client.graphql({
        query: endDJSession,
        variables: { id: session.id },
      });

      setSession(null); 
      alert('DJ session ended.');
    } catch (error) {
      console.error('Error ending session:', error);
      alert('Error ending session. Please try again.');
    }
  };

  return (
    <div>
      <h1>DJ Session Management</h1>
      {!session ? (
        <div>
          <input
            type="text"
            placeholder="DJ Name"
            value={djName}
            onChange={(e) => setDJName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Playlist ID"
            value={playlistID}
            onChange={(e) => setPlaylistID(e.target.value)}
          />
          <button onClick={handleStartSession}>Start Session</button>
        </div>
      ) : (
        <div>
          <p>Session Active: {session.djName}</p>
          <p>Playlist ID: {session.playlistID}</p>
          <button onClick={handleEndSession}>End Session</button>
        </div>
      )}
    </div>
  );
};

export default DJSessionPage;
