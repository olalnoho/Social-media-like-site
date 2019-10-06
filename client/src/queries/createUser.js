import { gql } from 'apollo-boost'

const createUser = gql`
   mutation($username: String! $email: String! $password: String!) {
      createUser(data: {
         username: $username
         email: $email
         password: $password
      }) {
         token
         user {
            username,
            email
         }
      }
   }
`

export default createUser