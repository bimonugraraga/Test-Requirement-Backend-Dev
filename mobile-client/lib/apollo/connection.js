import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://branded-things-hobby-graphql.herokuapp.com',
  cache: new InMemoryCache()
})

export default client;