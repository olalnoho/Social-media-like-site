import { gql } from 'apollo-boost'

const query = gql`
   query {
      me {
         username,
         email
      }
   }
`

export default query