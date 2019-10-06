const jwt = require('jsonwebtoken')

const getUserId = ({ headers: { authorization: token } }, requireAuth = true) => {
   if (!requireAuth && !token) {
      return false
   }

   if (!token) {
      throw new Error('Not Authorized')
   }

   const { userId } = jwt.verify(token, process.env.JWT_SECRET)
   return userId
}

module.exports = getUserId