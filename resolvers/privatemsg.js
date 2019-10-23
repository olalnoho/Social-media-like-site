const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      getPrivateMessages(parent, args, { db, req }) {
         const userId = getUserId(req.req)
         return db('private_messages').select('*').where({
            to_user: userId
         })
      }
   },

   Mutation: {
      async sendPrivateMessage(parent, { to, content }, { db, req }) {
         const userId = getUserId(req.req)
         if (userId == to) {
            throw new Error('Cannot send messages to yourself')
         }

         try {
            const res = await db('private_messages').insert({
               from_user: userId,
               to_user: to,
               content,
            }).returning('*')

            return res[0]

         } catch (err) {
            throw new Error('Message could not be sent')
         }

      }
   }
}