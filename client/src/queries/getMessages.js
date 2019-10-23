import { gql } from 'apollo-boost'

const getMessages = gql`
   query($offset: Int $limit: Int) {
      getMessages(offset: $offset limit: $limit) {
         content
         username
         avatar
         pid
         mid
      }
   }
`

export default getMessages