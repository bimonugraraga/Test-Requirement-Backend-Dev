import { gql } from "@apollo/client";

export const ADD_CART = gql`
  mutation($accessToken: String, $data: AddCart, $productId: String){
    AddToCart(access_token: $accessToken, data: $data, productId: $productId) {
      message
    }
  }
`

export const GET_CART = gql`
  query($accessToken: String){
    GetMyCart(access_token: $accessToken) {
      productName
      Owner {
        name
      }
      price
      imgUrl
      size
      gender
      message
    }
  }
`