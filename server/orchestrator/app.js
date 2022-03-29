const { ApolloServer, gql } = require('apollo-server');
const userSchema = require('./schemas/userSchema')
const productSchema = require('./schemas/productSchema')
const cartSchema = require('./schemas/cartSchema')
const server = new ApolloServer({ 
  typeDefs: [userSchema.typeDefs, productSchema.typeDefs, cartSchema.typeDefs], 
  resolvers: [userSchema.resolvers, productSchema.resolvers, cartSchema.resolvers] });

// The `listen` method launches a web server.
server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});