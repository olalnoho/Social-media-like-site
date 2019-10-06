const { gql } = require('apollo-server')

module.exports = gql`

   type Message {
      content: String!
      user: User!
   }

   extend type Query {
      getMessages: [Message!]!
      getMessage: String!
   }

   extend type Mutation {
      createMessage(content: String!): Message!
   }
`