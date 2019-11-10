const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      async getMessages(parent, args, { db }) {
         const res = await db.raw(`
            SELECT 
               p.avatar, u.username, m.content, p.id AS pid, m.id AS mid 
            FROM message_board m 
            LEFT JOIN users u ON m.user = u.id 
            LEFT JOIN profiles p ON p.user = u.id
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

<<<<<<< HEAD
      async deleteMessage(parent, { id }, { req, db, io }) {
=======
      async deleteMessage(parent, { id }, { req, db }) {
>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4
         const userId = getUserId(req.req)
         const msg = await db('message_board')
            .delete()
            .where({ id, user: userId })
            .returning('*')

         if (!msg.length) {
            throw new Error('Message not found')
         }
<<<<<<< HEAD
         
         io.emit('message_update')
=======

>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4
         return msg[0]
      }
   }
}