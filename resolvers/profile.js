const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      async getProfile(parent, args, { req, db }) {
         const userId = getUserId(req.req)
         const profile = await db('profiles').where({ user: userId })
         return profile[0]
      },

      async getProfileById(parent, { id }, { req, db }) {
         const profile = await db('profiles')
            .select('*')
            .join('users', 'users.id', 'profiles.user')
            .where({ "profiles.id": id })

         if (!profile.length) {
            throw new Error('No profile found')
         }

         return profile[0]
      },

      async getProfilePosts(parent, { id }, { req, db }) {
         const res = await db.raw(`
               SELECT
                  pm.id,
                  pm.content,
                  uaa.userId,
                  uaa.username,
                  uaa.avatar,
                  uaa.profileId,
                  pm.time_sent
               FROM profile_messages pm
               INNER JOIN (
                  SELECT
                     username,
                     avatar,
                     p.id as profileId,
                     u.id as userId
                  FROM users u 
                  INNER JOIN profiles p ON p.user = u.id
               ) as uaa ON uaa.userId = pm.from_user
               WHERE pm.profile = ?
               ORDER BY pm.time_sent DESC;
         `, id)

         return res.rows
      }
   },

   Mutation: {
      async createProfile(parent, { data }, { req, db }) {
         const userId = getUserId(req.req)

         const profile = await db('profiles')
            .insert({ user: userId, ...data })
            .returning('*')

         return profile[0]
      },

      async updateProfile(parent, { data }, { req, db }) {
         const userId = getUserId(req.req)
         const profile = await db('profiles')
            .where({ user: userId })
            .update(data)
            .returning('*')

         if (profile.lenght < 1) {
            throw new Error('Profile does not exists')
         }

         return profile[0]
      },

      async createProfilePost(parent, { id, content }, { req, db }) {
         const userId = getUserId(req.req)
         const res = await db('profile_messages').insert({
            from_user: userId,
            content,
            profile: id
         }).returning('*')

         return res[0]
      }
   }
}