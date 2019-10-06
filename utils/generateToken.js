const jwt = require('jsonwebtoken')

const generateToken = userId => jwt.sign({ userId }, process.env.JWT_SECRET, {
   expiresIn: 3600
})

module.exports = generateToken