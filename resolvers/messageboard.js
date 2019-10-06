const getUserId = require('../utils/getUserId')

module.exports = {
   Query: {
      getMessage() {
         return 'lol'
      }
   },

   Mutation: {
      createMessage(parent, { content }, { req, db }) {
         const id = getUserId(req.req)
      }
   }
}