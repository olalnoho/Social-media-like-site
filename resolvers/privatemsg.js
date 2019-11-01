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
         //@note
         // have another look at this query
         // const res = await db.raw(`
         // SELECT
         //    private_messages.id,
         //    time_sent,
         //    p1.avatar,
         //    u1.username,
         //    u1.id as userId,
         //    content,
         //    read
         // FROM private_messages
         // INNER JOIN users u1 ON u1.id = private_messages.from_user
         // LEFT JOIN profiles p1 ON p1.user = u1.id
         // WHERE to_user = ? AND time_sent IN (
         //    SELECT
         //       MAX(time_sent)
         //    FROM private_messages pm
         //    WHERE to_user = ?
         //    GROUP BY pm.from_user)
         //    ORDER BY time_sent DESC;
         //    `, [userId, userId])

         const res = await db.raw(`
         SELECT
            pm.id,
            time_sent,
            p.avatar,
            u.username,
            u.id as userId,
            content,
            read
         FROM private_messages pm
         INNER JOIN users u ON (
            pm.from_user = ? AND pm.to_user = u.id
            OR
            pm.to_user = ? AND pm.from_user = u.id
            ) 
         LEFT JOIN profiles p ON (
            pm.from_user = ? AND pm.to_user = p.user
            OR
            pm.to_user = ? AND pm.from_user = p.user
            ) 
         WHERE time_sent IN (
            SELECT
               MAX(time_sent)
            FROM private_messages
            WHERE to_user = ? OR from_user = ?
            GROUP BY least(from_user, to_user), greatest(to_user, from_user)
         );`, [userId, userId, userId, userId, userId, userId])

         return res.rows
      },

      async getWholeConversation(parent, { id }, { req, db }) {
         const userId = getUserId(req.req)
         const res = await db.raw(`
         SELECT
            pm.id,
            u.username,
            u.id AS UID,
            content
         FROM private_messages pm
         INNER JOIN users u ON u.id = pm.from_user
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