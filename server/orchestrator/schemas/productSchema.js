const { gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql`
  type Product {
    _id: ID
    productName: String
    price: Float
    imgUrl: String
    UserId: String
    Owner:  Owner
    message: String
  }
  type Owner {
    _id: ID
    name: String
    email: String
    phoneNumber: String
  }

  input NewProduct {
    productName: String
    price: Float
    imgUrl: String
  }

  type Query {
    GetAllProduct(similar: String, access_token: String): [Product]
    GetOneProduct(productId: String, access_token: String): Product
  }

  type Mutation{
    AddNewProduct(data: NewProduct, access_token: String): Product
  }

`;

const resolvers = {
  Query: {
    GetAllProduct: async(_, args) => {
      // console.log(args)
      let {similar, access_token} = args
      // console.log(access_token, similar)
      if (!similar){
        similar = ''
      }
      try {
        let allProducts = await axios.get(`http://localhost:3000/products?productName=${similar}`, {
          headers: 
          {
            access_token: !access_token ? null: access_token
          }
        })

        // console.log(allProducts)
        return allProducts.data
        
      } catch (error) {
        console.log(error.response.data)
        return [error.response.data]
      }

    },

    GetOneProduct: async(_, args) => {
      let {productId, access_token} = args

      try {
        let oneProduct = await axios.get(`http://localhost:3000/products/${productId}`, {
          headers: {
            access_token: access_token
          }
        })
        return oneProduct.data
      } catch (error) {
        return error.response.data
      }
    }
  },

  Mutation: {
    AddNewProduct: async(_, args) => {
      let {productName, price, imgUrl} = args.data
      let {access_token} = args

      try {
        let newProduct = await axios.post('http://localhost:3000/products', {
          productName,
          price,
          imgUrl
        }, {
          headers: {
            access_token: access_token
          }
        })

        return newProduct.data
      } catch (error) {
        console.log(error)
        return error.response.data
      }
    }
  }
  
};

module.exports = {
  typeDefs, resolvers
}