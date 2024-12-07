import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { startDJSession, endDJSession } from '../graphql/mutations';

// Start a DJ session
export const createDJSession = async (djName, playlistID) => {
  try {
    const response = await API.graphql(
      graphqlOperation(startDJSession, { input: { djName, playlistID } })
    );
    return response.data.startDJSession;
  } catch (error) {
    console.error('Error starting DJ session:', error);
    throw error;
  }
};

// End a DJ session
export const closeDJSession = async (id) => {
  try {
    const response = await API.graphql(
      graphqlOperation(endDJSession, { input: { id } })
    );
    return response.data.endDJSession;
  } catch (error) {
    console.error('Error ending DJ session:', error);
    throw error;
  }
};
