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
            u1.id as userId,
            content,
            read
         FROM private_messages
         INNER JOIN users u1 ON u1.id = private_messages.from_user
         LEFT JOIN profiles p1 ON p1.user = u1.id
         WHERE to_user = ? AND time_sent IN (
            SELECT
               MAX(time_sent)
            FROM private_messages pm
            GROUP BY pm.from_user)
            ORDER BY time_sent DESC;
            `, userId)

         return res.rows
      },

      async getWholeConversation(parent, { id }, { req, db }) {
         const userId = getUserId(req.req)
         const res = await db.raw(`
         SELECT
            pm.id,
            u.username,
            u.id AS userid,
            p.avatar,
            content
         FROM private_messages pm
         INNER JOIN users u ON u.id = pm.from_user
         LEFT JOIN profiles p ON p.user = pm.from_user
         WHERE (to_user = ? AND from_user = ?)
         OR (from_user = ? AND to_user = ?)
         ORDER BY time_sent ASC;
         `, [userId, id, userId, id])
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