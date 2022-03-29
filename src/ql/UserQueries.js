import { gql } from "@apollo/client";

export const userDataQuery = gql`
  query UserDataQuery {
    me {
      id
      osuId
      avatarUrl
      provider
      roles {
        id
        name
      }
      username
    }
  }
`;
