export const onDJSessionLive = /* GraphQL */ `
  subscription OnDJSessionLive($id: ID!) {
    onDJSessionLive(id: $id) {
      id
      djName
      playlistID
      isLive
      startTime
    }
  }
`;
