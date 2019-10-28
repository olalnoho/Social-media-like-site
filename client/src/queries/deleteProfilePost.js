import { gql } from 'apollo-boost'

const getProfile = gql`
   mutation($id: ID!) {
      removeProfilePost(id: $id)
   }
`

export default getProfile