import { gql } from 'apollo-boost'

const getProfileById = gql`
   query($id: ID!) {
      getProfilePosts(id: $id) {
        id
        content
        username
        avatar
      }
    }
`

export default getProfileById