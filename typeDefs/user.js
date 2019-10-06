const { gql } = require('apollo-server')

module.exports = gql`
   type User {
      id: ID!
      username: String
      email: String
   }
   
   type TokenAndUser {
      token: String!
      user: User!
   }

   input user_identifier {
      email: String
      username: String
   }

   input createUser {
      username: String!
      email: String!
      password: String!
   }

   input login {
      identifier: String!
      password: String!
   }

   input updateUser {
      username: String
      email: String
      password: String
   }

   extend type Query {
      me: User!
   }

   extend type Mutation {
      login(data: login): TokenAndUser
      createUser(data: createUser): TokenAndUser!
      updateUser(data: updateUser): User!
   }
`