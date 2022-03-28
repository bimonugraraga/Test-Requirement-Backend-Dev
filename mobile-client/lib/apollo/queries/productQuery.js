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
