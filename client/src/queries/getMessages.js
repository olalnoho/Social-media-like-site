import { gql } from 'apollo-boost'

const getMessages = gql`
   query {
      getMessages {
         content
         username
         avatar
         pid
         mid
      }
   }
`

export default getMessages