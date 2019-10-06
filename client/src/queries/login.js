import { gql } from 'apollo-boost'

const login = gql`
   mutation($identifier: String! $password: String!) {
      login(data: {
         identifier: $identifier
         password: $password
      }){
         token,
         user {
            username,
            email
         }
      }
   }
`

export default login