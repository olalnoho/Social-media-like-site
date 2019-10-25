import { gql } from 'apollo-boost'

const getProfile = gql`
   mutation($id: ID! $content: String!){
     createProfilePost(id: $id, content: $content) {
       content
     }
   }
`

export default getProfile