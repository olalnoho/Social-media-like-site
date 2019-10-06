const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      async getProfile(parent, args, { req, db }) {
         const userId = getUserId(req.req)
         const profile = await db('profile').where({ user: userId })
         return profile[0]
      },

      async getProfileById(parent, { id }, { req, db }) {
         const profile = await db('profile')
            .select('*')
            .join('users', 'users.id', 'profile.user')
            .where({ "profile.id": id })

         if (!profile.length) {
            throw new Error('No profile found')
         }

         return profile[0]
      }
   },

   Mutation: {
      async createProfile(parent, { data }, { req, db }) {
         const userId = getUserId(req.req)

         const profile = await db('profile')
            .insert({ user: userId, ...data })
            .returning('*')

         return profile[0]
      },

      async updateProfile(parent, { data }, { req, db }) {
         const userId = getUserId(req.req)
         const profile = await db('profile')
            .where({ user: userId })
            .update(data)
            .returning('*')

         if (profile.lenght < 1) {
            throw new Error('Profile does not exists')
         }

         return profile[0]
      },
   }
}