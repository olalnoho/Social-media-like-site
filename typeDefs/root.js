const { gql } = require('apollo-server')

module.exports = gql`
   type Query {
      _: Int
      test: String!
   }

   type Mutation {
      asd: Int
   }
`