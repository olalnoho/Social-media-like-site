import { gql } from 'apollo-boost'

const getMessages = gql`
   query {
      getPrivateMessages {
         id
         content
         from_user {
            username
            avatar
         }
         time_sent
      }
   }
`

export default getMessages