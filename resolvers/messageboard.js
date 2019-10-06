const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      getMessages(parent, args, { db }) {
         return db('message_board')
            .select('profile.avatar', 'users.username', 'message_board.content', 'profile.id as pid', 'message_board.id as mid')
            .join('users', 'message_board.user', 'users.id')
            .join('profile', 'profile.user', 'users.id')
            .orderBy('message_board.time_sent', 'desc')
      }
   },

   Mutation: {
      async createMessage(parent, { content }, { req, db }) {
         const id = getUserId(req.req)
         const message = await db('message_board')
            .insert({ user: id, content })
            .returning('*')
         return message[0]
      }
   }
}