const { gql } = require('apollo-server')

module.exports = gql`

   type Profile {
      id: ID!
      avatar: String!
      location: String
      bio: String
   }

   type ProfileWithUser {
      id: ID!
      avatar: String!
      location: String
      bio: String
      username: String!
      email: String!
      user: ID!
   }

   input createProfile {
      avatar: String
      location: String
      bio: String
   }
   
   extend type Query {
      getProfile: Profile
      getProfileById(id: ID!): ProfileWithUser!
   }

   extend type Mutation {
      createProfile(data: createProfile): Profile!
      updateProfile(data: createProfile): Profile!
   }

`