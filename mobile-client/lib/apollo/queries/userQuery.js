import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation($data: User){
    LoginUser(data: $data) {
      message
      access_token
    }
  }
`;

export const USER_REGISTER = gql`
  mutation($data: User){
    RegisterUser(data: $data) {
      message
    }
  }
`