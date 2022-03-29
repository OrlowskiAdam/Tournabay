import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ACCESS_TOKEN, GRAPHQL_URL } from "../constants/constants";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    headers: { ...headers },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
