import { gql } from 'apollo-boost'

const getMessages = gql`
   query {
      getPrivateMessagesWithUniqueUsers {
         id
         content         
         username
         avatar
         time_sent
         read
         userid
      }
   }
`

export default getMessages