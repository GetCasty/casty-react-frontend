export const startDJSession = /* GraphQL */ `
  mutation StartDJSession($djName: String!, $playlistID: String!) {
    startDJSession(djName: $djName, playlistID: $playlistID) {
      id
      djName
      playlistID
    }
  }
`;

export const endDJSession = /* GraphQL */ `
  mutation EndDJSession($id: ID!) {
    endDJSession(id: $id) {
      id
      djName
      playlistID
    }
  }
`;
