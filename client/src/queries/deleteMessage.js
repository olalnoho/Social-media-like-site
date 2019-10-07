import { gql } from 'apollo-boost'

const deleteMessage = gql`
   mutation($id: ID!) {
      deleteMessage(id: $id) {
         content
      }
   }
`

export default deleteMessage