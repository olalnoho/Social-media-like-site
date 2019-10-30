const bcrypt = require('bcryptjs')
const getUserId = require('../utils/getUserId')
const generateToken = require('../utils/generateToken')

module.exports = {

   Query: {
      async me(parent, args, { req, db }) {
         const userId = getUserId(req.req)
         const user = await db('users').select('*').where({ id: userId })
         return user[0]
      },
   },

   Mutation: {
      async login(parent, { data }, { db, req }) {
         if (!data.identifier) {
            throw new Error('Invalid credentials')
         }
         const user = await db('users')
            .select('*')
            .where({ email: data.identifier })
            .orWhere({ username: data.identifier })

         if (!user.length) {
            throw new Error('Invalid credentials')
         }

         const isMatch = await bcrypt.compare(data.password, user[0].password)

         if (!isMatch) {
            throw new Error('Invalid credentials')
         }

         return {
            user: user[0],
            token: generateToken(user[0].id)
         }
      },

      async createUser(parent, { data }, { db }) {
         const password = await bcrypt.hash(data.password, 10)
         try {
            const user = await db('users').insert({
               ...data,
               password
            }).returning('*')

            return {
               token: generateToken(user[0].id),
               user: user[0]
            }
         } catch (err) {
            if (err.code == 23505) {
               const reason = err.detail.match(/\((.+)\)=/)
               throw new Error(reason[1] + ' taken')
            } else {
               throw new Error('Something unexpected went wrong.. Try again.')
            }
         }
      },

      async updateUser(parent, { data }, { req, db }) {
         const userId = getUserId(req.req)
         if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
         }

         const user = await db('users')
            .where({ id: userId })
            .update({
               ...data
            }).returning('*')

         return user[0]
      },
   }
}