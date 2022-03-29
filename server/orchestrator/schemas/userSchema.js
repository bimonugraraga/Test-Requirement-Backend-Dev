const { gql } = require('apollo-server');
const axios = require('axios')
const typeDefs = gql`

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
  extend type Mutation {
    LoginUser(data: User): UserResponse
    RegisterUser(data: User): UserResponse
  }
`;

// https://branded-things-hobby.herokuapp.com
const resolvers = {

  Mutation:{
    LoginUser: async(_, args) => {

      let {email, password} = args.data

      try {
        let loggedUser = await axios.post('https://branded-things-hobby.herokuapp.com/users/login', {
          email: email,
          password: password
        })

        return loggedUser.data
      } catch (error) {
        return error.response.data
      }
    },

    RegisterUser: async(_, args) => {
      console.log(args)
      let {name, email, password, phoneNumber} = args.data

      try {
        let newUser = await axios.post('https://branded-things-hobby.herokuapp.com/users/register', {
          name, email, password, phoneNumber
        })

        return newUser.data
      } catch (error) {
        return error.response.data
      }
    }
  }
};

module.exports = {
  typeDefs, resolvers
}