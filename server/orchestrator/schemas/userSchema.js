const { gql } = require('apollo-server');
const axios = require('axios')
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type UserResponse {
    access_token: String
    message: String
  }

  input User {
    name: String
    email: String
    password: String
    phoneNumber: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    LoginUser(data: User): UserResponse
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation:{
    LoginUser: async(_, args) => {

      let {email, password} = args.data

      try {
        let loggedUser = await axios.post('http://localhost:3000/users/login', {
          email: email,
          password: password
        })

        return loggedUser.data
      } catch (error) {
        return error.response.data
      }
    }
  }
};

module.exports = {
  typeDefs, resolvers
}