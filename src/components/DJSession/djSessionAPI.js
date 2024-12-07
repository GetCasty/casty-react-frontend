import { API, graphqlOperation } from 'aws-amplify';
import { startDJSession } from '../graphql/mutations'; // Ensure this path matches your project

export const startSession = async (djName, playlistID) => {
  try {
    const response = await API.graphql(
      graphqlOperation(startDJSession, { input: { djName, playlistID } })
    );
    return response.data.startDJSession;
  } catch (error) {
    console.error("Error starting DJ session:", error);
    throw error;
  }
};
