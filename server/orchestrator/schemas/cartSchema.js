const { gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql`
  type Cart {
    _id: ID
    productName: String
    price: Float
    imgUrl: String
    size: String
    gender: String
    UserId: String
    Owner: Owner
    likedId: String
    likedBy: likedBy
    message: String
  }

  type Owner {
    _id: ID
    name: String
    email: String
    phoneNumber: String
  }

  type likedBy{
    _id: ID
    name: String
    email: String
    phoneNumber: String
  }

  input AddCart {
    size: String
    gender: String
  }

  extend type Query {
    GetMyCart(access_token: String): [Cart]
    
  }

  extend type Mutation {
    AddToCart(access_token: String, data: AddCart, productId: String): Cart
  }


`

const resolvers = {
  Query : {
    GetMyCart: async(_, args) => {
      // console.log(args)
      let {access_token} = args

      try {
        let myCartList = await axios.get('http://localhost:3000/carts', {
          headers: {
            access_token:access_token
          }
        })

        console.log(myCartList, "<>")
        return myCartList.data
      } catch (error) {
        console.log(error)
        return [error.response.data]
      }
    }
  },

  Mutation : {
    AddToCart: async(_, args) => {
      console.log(args)
      let {access_token, productId} = args
      let {size, gender} = args.data

      try {
        let addedToMyCart = await axios.post(`http://localhost:3000/carts/${productId}`, {
          size,
          gender
        },{
          headers: {
            access_token: access_token
          }
        })

        console.log(addedToMyCart.data)
        return addedToMyCart.data
      } catch (error) {
        return error.response.data
      }
    }
  }
}

module.exports = {
  typeDefs, resolvers
}