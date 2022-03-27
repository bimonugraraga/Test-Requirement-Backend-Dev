const { ApolloServer, gql } = require('apollo-server');
const userSchema = require('./schemas/userSchema')
const productSchema = require('./schemas/productSchema')
const server = new ApolloServer({ 
  typeDefs: [userSchema.typeDefs, productSchema.typeDefs], 
  resolvers: [userSchema.resolvers, productSchema.resolvers] });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});