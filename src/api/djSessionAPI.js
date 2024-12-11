import { generateClient } from '@aws-amplify/api';
import { startDJSession, endDJSession } from '../graphql/mutations';
import io from 'socket.io-client';

// Initialize the AWS AppSync Client
const client = generateClient();

// Connect to WebRTC Signaling Server
const socket = io('http://localhost:3000');

/**
 * Start a DJ session using AWS AppSync and WebRTC
 */
export const startSession = async (djName, playlistID) => {
  try {
    console.log('Starting DJ session:', { djName, playlistID });

    // Correct GraphQL API Call
    const response = await client.graphql({
      query: startDJSession,
      variables: { djName, playlistID },
    });

    const session = response.data.startDJSession;

    // Notify WebRTC Signaling Server
    socket.emit('start-session', (data) => {
      console.log('WebRTC Session Started:', data.sessionId);
      session.sessionId = data.sessionId;
    });

    return session;
  } catch (error) {
    console.error('Error starting DJ session:', error);
    throw error;
  }
};

/**
 * End a DJ session
 */
export const stopSession = async (sessionId) => {
  try {
    console.log('Ending DJ session:', sessionId);

    const response = await client.graphql({
      query: endDJSession,
      variables: { id: sessionId },
    });

    console.log('Session Ended Response:', response);
    return response.data.endDJSession;
  } catch (error) {
    console.error('Error ending DJ session:', error);
    throw error;
  }
};
