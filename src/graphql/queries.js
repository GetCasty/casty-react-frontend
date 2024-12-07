export const getDJSession = /* GraphQL */ `
  query GetDJSession($id: ID!) {
    getDJSession(id: $id) {
      id
      djName
      playlistID
      isLive
      startTime
    }
  }
`;

// Add other queries you need based on your schema
// Example of another query:
export const listDJSessions = /* GraphQL */ `
  query ListDJSessions {
    listDJSessions {
      items {
        id
        djName
        playlistID
        isLive
        startTime
      }
    }
  }
`;
