import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: '/query',
  cache: new InMemoryCache(),
  credentials: 'include',
})
