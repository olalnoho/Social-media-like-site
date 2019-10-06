import { gql } from 'apollo-boost'

const createProfile = gql`
   mutation($avatar: String $bio: String $location: String) {
      updateProfile(data: {
         avatar: $avatar
         bio: $bio
         location: $location
      }) {
         avatar
         bio
         location
      }
   }
`

export default createProfile