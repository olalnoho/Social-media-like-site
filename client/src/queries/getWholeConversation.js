import { gql } from 'apollo-boost'

const query = gql`
   query($id: ID!) {
      getWholeConversation(id: $id) {
         username
         content
         uid
         id
      }
   }
`

export default query