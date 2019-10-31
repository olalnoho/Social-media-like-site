const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      getPrivateMessages(parent, args, { db, req }) {
         const userId = getUserId(req.req)
         return db('private_messages').select('*').where({
            to_user: userId
         })
      },

      async getPrivateMessagesWithUniqueUsers(parent, args, { db, req }) {
         const userId = getUserId(req.req)
         
         const res = await db.raw(`
         SELECT
            private_messages.id,
            time_sent,
            p1.avatar,
            u1.username,
            content,
            read
         FROM private_messages
         INNER JOIN users u1 ON u1.id = private_messages.from_user
         INNER JOIN users u2 ON u2.id = private_messages.to_user
         LEFT JOIN profiles p1 ON p1.user = u1.id
         LEFT JOIN profiles p2 ON p2.user = u2.id
         WHERE to_user = ? AND time_sent IN (
            SELECT
               MAX(time_sent)
            FROM private_messages pm
            GROUP BY pm.from_user
         );`, userId)

         return res.rows
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