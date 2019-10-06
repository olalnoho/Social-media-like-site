import { gql } from 'apollo-boost'

const getProfileById = gql`
   query($id: ID!) {
      getProfileById(id: $id) {
         avatar,
         location,
         bio,
         username
      }
   }
`

export default getProfileById