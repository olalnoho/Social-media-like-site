import { gql } from 'apollo-boost'

const query = gql`
   mutation($id: ID!) {
      markAsRead(id: $id)
   }
`

export default query