import { gql } from 'apollo-boost'

const getProfile = gql`
   query {
      getProfile {
         avatar,
         location,
         bio
      }
   }
`

export default getProfile