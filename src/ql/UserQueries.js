import { gql } from '@apollo/client';

export const userDataQuery = gql`
  query UserDataQuery {
    me {
      id
      osuId
      provider
      roles {
        id
        name
      }
      username
    }
  }
`;
