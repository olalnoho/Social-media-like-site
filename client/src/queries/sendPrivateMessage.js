import { gql } from 'apollo-boost'

const query = gql`
   mutation($to: ID! $content: String!) {
      sendPrivateMessage(to: $to content: $content) {
         id
      }
   }
`

export default query