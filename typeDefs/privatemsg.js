const { gql } = require('apollo-server')

module.exports = gql`

   type UserWithAvatar {
      username: String!
      avatar: String!
   }

   type privateMessage2 {
      id: ID!
      time_sent: String!
      read: Boolean!
      username: String!
      avatar: String
      content: String!
   }

   type privateMessage {
      id: ID!
      from_user: UserWithAvatar!
      to_user: UserWithAvatar!
      content: String!
      time_sent: String
   }

   extend type Query {
      getPrivateMessages: [privateMessage!]!
      getPrivateMessagesWithUniqueUsers: [privateMessage2!]!
   }

   extend type Mutation {
      sendPrivateMessage(to: ID! content: String!): privateMessage!
   }

`