import { gql } from 'apollo-boost'

const createMessage = gql`
   mutation($content: String!) {
      createMessage(content: $content) {
         content
      }
   }
`

export default createMessage