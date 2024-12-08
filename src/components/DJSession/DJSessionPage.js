import React, { useState } from 'react';
// Correct the imports to use the proper packages from aws-amplify
//import { Amplify } from 'aws-amplify';
//import { API } from 'aws-amplify';
import { API } from '@aws-amplify/api'; // Import API from the correct package
import { graphqlOperation } from '@aws-amplify/api-graphql'; // Import graphqlOperation from the correct package

// Ensure your paths to the mutations and queries are correct
import { startDJSession, endDJSession } from '../../graphql/mutations';
//import { getDJSession } from '../../graphql/queries';

const DJSessionPage = () => {
  const [djName, setDJName] = useState(''); // State for DJ name
  const [playlistID, setPlaylistID] = useState(''); // State for Playlist ID
  const [session, setSession] = useState(null); // State for active session

  const handleStartSession = async () => {
    try {
      const newSession = await API.graphql(
        graphqlOperation(startDJSession, { djName, playlistID })
      );
      setSession(newSession.data.startDJSession); // Set the session data
      alert('DJ session started!');
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Error starting session. Please check your inputs and try again.');
    }
  };

  const handleEndSession = async () => {
    if (!session) {
      alert('No active session to end.');
      return;
    }
    try {
      await API.graphql(graphqlOperation(endDJSession, { id: session.id }));
      setSession(null); // Clear session after ending
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
