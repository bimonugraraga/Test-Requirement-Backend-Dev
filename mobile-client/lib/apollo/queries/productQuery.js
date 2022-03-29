import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query($accessToken: String, $similar: String){
    GetAllProduct(access_token: $accessToken, similar: $similar) {
      _id
      Owner {
        name
      }
      productName
      imgUrl
      message
      price
    }
  }
`;

export const GET_PRODUCT = gql`
  query($productId: String, $accessToken: String){
    GetOneProduct(productId: $productId, access_token: $accessToken) {
      productName,
      Owner {
        name
      }
      imgUrl
      message
      price
    }
  }
`