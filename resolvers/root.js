const { Query: userQ, Mutation: userM } = require('./user')
const { Query: profileQ, Mutation: profileM } = require('./profile')
const { Query: mbQ, Mutation: mbM } = require('./messageboard')
const { Query: pmQ, Mutation: pmM } = require('./privatemsg')
const resolvers = {
   Query: {
      ...userQ,
      ...profileQ,
      ...mbQ,
      ...pmQ
   },

   Mutation: {
      ...userM,
      ...profileM,
      ...mbM,
      ...pmM
   },

   privateMessage: {
      async to_user(parent, args, { db }) {
         const res = await db('users').select('*').where({
            id: parent.to_user
         })

         return res[0]
      },
      
      async from_user(parent, args, { db }) {
         const res = await db('users')
            .join('profile', 'users.id', 'profile.user')
            .select('*')
            .where({
               "users.id": parent.from_user
            })

         return res[0]
      }
   }
}

module.exports = resolvers