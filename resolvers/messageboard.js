const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      async getMessages(parent, args, { db }) {

         // return db('message_board')
         //    .select('profile.avatar', 'users.username', 'message_board.content', 'profile.id as pid', 'message_board.id as mid')
         //    .join('users', 'message_board.user', 'users.id')
         //    .join('profile', 'profile.user', 'users.id')
         //    .orderBy('message_board.time_sent', 'desc')

         const res = await db.raw(`
            SELECT 
               p.avatar, u.username, m.content, p.id AS pid, m.id AS mid 
            FROM message_board m 
            LEFT JOIN users u ON m.user = u.id 
            LEFT JOIN profile p ON p.user = u.id
            ORDER BY m.time_sent DESC
            LIMIT ?
            OFFSET ?;
            `, [args.limit, args.offset])
            
         return res.rows
         
      }
   },

   Mutation: {
      async createMessage(parent, { content }, { req, db, io }) {
         const id = getUserId(req.req)
         const message = await db('message_board')
            .insert({ user: id, content })
            .returning('*')

         io.emit('message_update')
         return message[0]
      },

      async deleteMessage(parent, { id }, { req, db, io }) {
         const userId = getUserId(req.req)
         const msg = await db('message_board')
            .delete()
            .where({ id, user: userId })
            .returning('*')

         if (!msg.length) {
            throw new Error('Message not found')
         }
         
         io.emit('message_update')
         return msg[0]
      }
   }
}