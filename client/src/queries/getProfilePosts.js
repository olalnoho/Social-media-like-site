import { gql } from 'apollo-boost'

const getProfileById = gql`
   query($id: ID!) {
      getProfilePosts(id: $id) {
        id
        content
        username
        avatar
        profileid
      }
    }
`

export default getProfileById