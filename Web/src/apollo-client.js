import ApolloClient, {createNetworkInterface} from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
  opts: {
    credentials: 'include'
  }
});
debugger;
export const client = new ApolloClient({networkInterface});
