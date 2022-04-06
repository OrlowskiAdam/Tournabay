import { gql } from "@apollo/client";

export const createTournamentMutation = gql`
  mutation CreateTournamentMutation($input: TournamentInput!) {
    createTournament(tournamentInput: $input) {
      id
      name
      startDate
      endDate
      gameMode
      scoreType
      teamFormat
      owner {
        id
        username
        avatarUrl
        roles {
          id
          name
        }
        provider
        osuId
      }
    }
  }
`;
