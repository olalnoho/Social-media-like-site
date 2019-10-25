import { gql } from 'apollo-boost'

const getProfile = gql`
   query {
      getProfile {
         id
         avatar,
         location,
         bio
      }
   }
`

export default getProfile