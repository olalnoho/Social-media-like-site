const { Query: userQ, Mutation: userM } = require('./user')
const { Query: profileQ, Mutation: profileM } = require('./profile')
const { Query: mbQ, Mutation: mbM } = require('./messageboard')
const resolvers = {
   Query: {
      ...userQ,
      ...profileQ,
      ...mbQ
   },

   Mutation: {
      ...userM,
      ...profileM,
      ...mbM
   }
}

module.exports = resolvers