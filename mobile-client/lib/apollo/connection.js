import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://e1a4-202-80-213-186.ngrok.io',
  cache: new InMemoryCache()
})

export default client;