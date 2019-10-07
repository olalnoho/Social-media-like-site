const { gql } = require('apollo-server')

module.exports = gql`

   type Message {
      content: String!
   }

   type FullPost {
      username: String!
      avatar: String!
      content: String
      pid: ID!
      mid: ID!
   }

   extend type Query {
      getMessages: [FullPost!]!
      getMessage: String!
   }

   extend type Mutation {
      createMessage(content: String!): Message!
      deleteMessage(id: ID!): Message!
   }
`