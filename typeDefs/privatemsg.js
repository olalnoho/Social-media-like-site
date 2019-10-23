const { gql } = require('apollo-server')

module.exports = gql`

   type UserWithAvatar {
      username: String!
      avatar: String!
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
   }

   extend type Mutation {
      sendPrivateMessage(to: ID content: String!): privateMessage!
   }

`