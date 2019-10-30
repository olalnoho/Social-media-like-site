import { gql } from 'apollo-boost'

const getProfileById = gql`
   query($id: ID! $limit: Int! $offset: Int!) {
      getProfilePosts(id: $id limit: $limit offset: $offset) {
        id
        content
        username
        avatar
        profileid
      }
    }
`

export default getProfileById