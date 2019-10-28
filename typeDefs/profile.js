const { gql } = require('apollo-server')

module.exports = gql`

   type Profile {
      id: ID!
      avatar: String!
      location: String
      bio: String
   }

   type ProfilePost {
      id: ID!
      content: String!
      username: String!
      avatar: String!
      profileid: ID!
   }

   type ProfileWithUser {
      id: ID!
      avatar: String!
      location: String
      bio: String
      username: String!
      email: String!
      user: ID!
      posts: [ProfilePost!]
   }

   input createProfile {
      avatar: String
      location: String
      bio: String
   }
   
   extend type Query {
      getProfile: Profile
      getProfileById(id: ID!): ProfileWithUser!
      getProfilePosts(id: ID!): [ProfilePost!]!
   }

   extend type Mutation {
      createProfile(data: createProfile): Profile!
      updateProfile(data: createProfile): Profile!
      createProfilePost(id: ID! content: String!): ProfilePost!
      removeProfilePost(id: ID!): ID!
   }

`